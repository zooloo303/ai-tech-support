from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note, Chat

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}


    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
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
