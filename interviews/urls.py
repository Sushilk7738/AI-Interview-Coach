from django.urls import path
from .views import RoleListAPIView, QuestionListAPIView, InterviewCreateAPIView, AnswerCreateAPIView, InterviewDetailAPIView


urlpatterns = [
    path('roles/', RoleListAPIView.as_view(), name='roles'),
    path('questions/', QuestionListAPIView.as_view(), name='questions'),
    path('interviews/', InterviewCreateAPIView.as_view(), name='interviews'),

    path('answers/submit/', AnswerCreateAPIView.as_view(), name='answers'),
    
    path('interviews/<int:pk>/', InterviewDetailAPIView.as_view()),
]
