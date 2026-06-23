from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Role, Question, Interview
from .serializers import RoleSerializer, QuestionSerializer, InterviewSerializer, AnswerSerializer, InterviewDetailSerializer

from rest_framework import status


class RoleListAPIView(APIView):
    def get(self, request):
        roles = Role.objects.all()
        serializer = RoleSerializer(roles, many=True)

        return Response(serializer.data)


class QuestionListAPIView(APIView):
    def get(self, request):
        role_id = request.query_params.get('role_id')

        if role_id:
            questions = Question.objects.filter(role_id = role_id)

        else:
            questions = Question.objects.all()
            
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data)



class InterviewCreateAPIView(APIView):
    def post(self, request):
        serializer = InterviewSerializer(data = request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class AnswerCreateAPIView(APIView):
    
    def post(self, request):
        serializer = AnswerSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class InterviewDetailAPIView(APIView):
    
    def get(self, request, pk):
        interview = get_object_or_404(Interview, id=pk)
        serializer = InterviewDetailSerializer(interview)

        return Response(serializer.data)





