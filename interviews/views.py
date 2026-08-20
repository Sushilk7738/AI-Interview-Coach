from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Role, Question, Interview, Evaluation, Answer
from .serializers import RoleSerializer, QuestionSerializer, InterviewSerializer, InterviewDetailSerializer, EvaluationSerializer, InterviewSubmissionSerializer
from django.db import transaction
from rest_framework.permissions import IsAuthenticated


from rest_framework import status
from .ai_service import evaluate_interview


class RoleListAPIView(APIView):
    permission_classes = [IsAuthenticated]
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



class InterviewAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        interviews = Interview.objects.filter(user = request.user).select_related("role", "evaluation").prefetch_related("answers")
        serializer = InterviewSerializer(interviews, many=True)

        return Response(serializer.data)

    
    def post(self, request):
        serializer = InterviewSerializer(data = request.data)

        if serializer.is_valid():
            serializer.save(user = request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class InterviewDetailAPIView(APIView):

    permission_classes = [IsAuthenticated]
    def get(self, request, pk):
        interview = get_object_or_404(
            Interview.objects.select_related("role"),
            id = pk,
            user = request.user
        )
        serializer = InterviewDetailSerializer(interview)

        return Response(serializer.data)




class SubmitInterviewAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request, pk):
        interview = get_object_or_404(
            Interview.objects.select_related("role"),
            id = pk,
            user = request.user
        )
        serializer = InterviewSubmissionSerializer(
            data = request.data,
            context = {
                "interview": interview
            }
        )
        serializer.is_valid(raise_exception=True)

        answers = serializer.validated_data["answers"]

        if interview.answers.exists():
            return Response(
                {
                    "error": "Interview has already been submitted."
                },
                status=status.HTTP_409_CONFLICT,
            )

        
        with transaction.atomic():
            for answer in answers:
                Answer.objects.create(
                    interview = interview,
                    question=answer["question"],
                    answer_text = answer["answer_text"],
                )

        return Response(
            {
                "message": "Interview submitted successfully."
            },
            status=status.HTTP_201_CREATED,
        )

class EvaluateInterviewAPIView(APIView):

    permission_classes = [IsAuthenticated]
    
    def post(self, request, pk):
        interview = get_object_or_404(
            Interview.objects.select_related("role").prefetch_related("answers__question"),
            id = pk,
            user = request.user
        )

        if not interview.answers.exists():
            return Response(
                {
                    "error": "Interview must have answers before evaluation."
                },
                status= status.HTTP_400_BAD_REQUEST
            )
        
        
        if Evaluation.objects.filter(interview=interview).exists():
            return Response(
                {
                    "message": "This interview has already been evaluated."
                },
                status=status.HTTP_409_CONFLICT,
            )
        
        
        try:
            result = evaluate_interview(interview)

        except Exception as e:
            return Response(
                {
                    "error": str(e)
                },
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        evaluation = Evaluation.objects.create(
            interview = interview,
            score = result['score'],
            strengths = result['strengths'],
            weaknesses = result['weaknesses'],
            feedback = result['feedback'],
            recommendation = result['recommendation'],
        )

        serializer = EvaluationSerializer(evaluation)

        return Response(
            {
                "message": "Interview evaluated successfully.",
                "evaluation": serializer.data,
            },
            status=status.HTTP_201_CREATED
        )

class InterviewEvaluationAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, pk):
        interview = get_object_or_404(
            Interview.objects.select_related("role"),
            id = pk,
            user = request.user
        )

        evaluation = get_object_or_404(
            Evaluation.objects.select_related("interview"),
            interview = interview
        )

        serializer = EvaluationSerializer(evaluation)

        return Response(serializer.data)


