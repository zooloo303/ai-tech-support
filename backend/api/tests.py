import os
from dotenv import load_dotenv

load_dotenv()

user=os.getenv('TEST_USER')
password=os.getenv('TEST_PASSWORD')

from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework.test import APIClient
from .models import Chat


class ChatViewSetTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username=user, password=password)
        self.chat = Chat.objects.create(content='Hello, world!', author=self.user)

    def test_list_chats(self):
        response = self.client.get('/chats/')
        self.assertEqual(response.status_code, 200)

    def test_retrieve_chat(self):
        response = self.client.get(f'/chats/{self.chat.id}/')
        self.assertEqual(response.status_code, 200)