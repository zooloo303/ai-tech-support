from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Profile, Note, Chat, Clicks

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}


    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    class Meta:
        model = Profile
        fields = ['id', 'bio', 'avatar', 'created_at', 'user']
        extra_kwargs = {'user': {'read_only': True}}

class NoteSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    class Meta:
        model = Note
        fields = ['id', 'title', 'content', 'created_at', 'author']
        extra_kwargs = {'author': {'read_only': True}}

class ChatSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    class Meta:
        model = Chat
        fields = ['id', 'prompt', 'response', 'created_at', 'author']
        extra_kwargs = {
            'author': {'read_only': True},
            'response': {'required': False, 'allow_null': True, 'allow_blank': True}
        }
class ClicksSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    class Meta:
        model = Clicks
        fields = ['id', 'count', 'created_at', 'author']
        extra_kwargs = {'author': {'read_only': True}}