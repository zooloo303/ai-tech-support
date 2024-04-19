from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from rest_framework import generics, viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.generics import RetrieveUpdateAPIView
from .serializers import ProfileSerializer, UserSerializer, NoteSerializer, ChatSerializer, ClicksSerializer
from .models import Profile, Note, Chat, Clicks
from django.http import JsonResponse
import anthropic
import os
from dotenv import load_dotenv
load_dotenv()

# Create User
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

from rest_framework.views import APIView
from rest_framework.response import Response

class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

# Profiles
class ProfileViewSet(RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]


    def get_object(self):
        return self.request.user.profile

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)

# Notes
class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

class NoteListCreateView(generics.ListCreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]


    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

# Clicks
class ClicksViewSet(viewsets.ModelViewSet):
    queryset = Clicks.objects.all()
    serializer_class = ClicksSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

# Chats
class ChatViewSet(viewsets.ModelViewSet):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated]


    def perform_create(self, serializer):
        # Save the user's message to the database
        user_message = serializer.save(author=self.request.user)

        # Create the Anthropic client
        client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

        # Fetch the chat history of the user
        chat_history = Chat.objects.filter(author=self.request.user).order_by('created_at')

        # Prepare the messages list with the chat history and the new message
        messages = []
        last_role = None
        for chat in chat_history:
            if chat.prompt and (last_role != "user" or last_role is None):
                messages.append({"role": "user", "content": chat.prompt})
                last_role = "user"
            if chat.response:
                messages.append({"role": "assistant", "content": chat.response})
                last_role = "assistant"

        # Only append the new user message if the last message was from the assistant
        if last_role == "assistant":
            messages.append({"role": "user", "content": user_message.prompt})

        print(messages)

        # Send the user's message and chat history to the Anthropic API and get the response
        api_response  = client.messages.create(
            model="claude-3-opus-20240229",
            max_tokens=1000,
            temperature=0.0,
            system="Respond only in Yoda-speak.",
            messages=messages
        )

        # Extract the actual response text from the API response
        response_text = None
        if api_response.content and isinstance(api_response.content, list):
            # Assuming the first TextBlock contains the desired text
            first_text_block = api_response.content[0]
            response_text = first_text_block.text if first_text_block.type == 'text' else None

        # Update the Chat model instance with the response
        if response_text is not None:
            user_message.response = response_text
            user_message.save()
        else:
            print("No response received from the API.")

User = get_user_model()
# Timeline
class TimelineList(generics.ListAPIView):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Fetch data from each model
        profiles = Profile.objects.all()
        notes = Note.objects.all()
        chats = Chat.objects.all()
        clicks = Clicks.objects.all()

        # Combine all data into a single list
        data = []

        for profile in profiles:
            data.append({
                'user': profile.user.username,
                'time': profile.created_at,
                'event': 'Updated their bio'
            })

        for note in notes:
            data.append({
                'user': note.author.username,
                'time': note.created_at,
                'event': 'Created a note'
            })

        for chat in chats:
            data.append({
                'user': chat.author.username,
                'time': chat.created_at,
                'event': 'Had a Chat with the bot'
            })

        for click in clicks:
            data.append({
                'user': click.author.username,
                'time': click.created_at,
                'event': 'Clicked the clicker'
            })

        # Sort the data by the 'time' field
        data.sort(key=lambda x: x['time'], reverse=True)

        return data

    def list(self, request):
        queryset = self.get_queryset()
        return JsonResponse(queryset, safe=False)
