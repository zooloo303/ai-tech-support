from django.urls import path, include
from . import views

urlpatterns = [
    path('current_user/', views.CurrentUserView.as_view()),
    path('notes/', views.NoteListCreate.as_view(), name='note-list'),
    path('notes/delete/<int:pk>/', views.NoteDelete.as_view(), name='delete-note'),
    path('chats/', views.ChatViewSet.as_view({'get': 'list', 'post': 'create'}), name='chat-list'),
    path('chats/<int:pk>/', views.ChatViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='chat-detail'),
    path('profile/', views.ProfileViewSet.as_view(), name='profile'),
    path('clicks/', views.ClicksViewSet.as_view({'get': 'list', 'post': 'create'}), name='clicks-list'),
    path('timeline/', views.TimelineList.as_view(), name='timeline-list'),
]