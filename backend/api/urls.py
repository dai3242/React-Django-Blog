from django.urls import path
from . import views

urlpatterns = [
    path('notes/', views.NoteListCreate.as_view(), name='note_list'),
    path('notes/<int:id>/', views.NoteDelete.as_view(), name='note_delete')
]
