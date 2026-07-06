from django.urls import path
from .views import RoleListAPIView, QuestionListAPIView, InterviewAPIView, InterviewDetailAPIView, EvaluateInterviewAPIView, SubmitInterviewAPIView, InterviewEvaluationAPIView

urlpatterns = [
    path('roles/', RoleListAPIView.as_view(), name='roles'),
    path('questions/', QuestionListAPIView.as_view(), name='questions'),
    path('interviews/', InterviewAPIView.as_view(), name='interviews'),
    
    path('interviews/<int:pk>/', InterviewDetailAPIView.as_view()),

    path('interviews/<int:pk>/evaluate/', EvaluateInterviewAPIView.as_view(), name='evaluate-interview'),


    path("interviews/<int:pk>/submit/", SubmitInterviewAPIView.as_view(), name='submit-interview'),

    path('interview/<int:pk>/evaluation/', InterviewEvaluationAPIView.as_view(), name='evaluations'),

]
