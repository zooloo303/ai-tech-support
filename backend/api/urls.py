from django.urls import path, include
from . import views

urlpatterns = [
    path('notes/', views.NoteListCreate.as_view(), name='note-list'),
    path('notes/delete/<int:pk>/', views.NoteDelete.as_view(), name='delete-note'),
    path('chats/', views.ChatViewSet.as_view({'get': 'list', 'post': 'create'}), name='chat-list'),
    path('chats/<int:pk>/', views.ChatViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='chat-detail'),
]