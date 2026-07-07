from rest_framework import serializers
from .models import Role, Question, Interview, Answer, Evaluation


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = "__all__"



class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = "__all__"


class InterviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interview
        fields = ["id", "role", "created_at",]


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = "__all__"


class SubmitAnswerSerializer(serializers.Serializer):
    question = serializers.PrimaryKeyRelatedField(
        queryset=Question.objects.all()
    )
    answer_text = serializers.CharField()



class InterviewSubmissionSerializer(serializers.Serializer):
    answers = SubmitAnswerSerializer(many = True)

    def validate_answers(self, answers):
        
        interview = self.context["interview"]

        if not answers:
            raise serializers.ValidationError(
                "At least one answer is required"
            )
            
        question_ids = []

        for answer in answers:
            question = answer["question"]

            if question.role != interview.role:
                raise serializers.ValidationError(
                    "Question does not belong to this interview role."
                )

            
            if question.id in question_ids:
                raise serializers.ValidationError(
                    "Duplicate questions are not allowed."
                )
            question_ids.append(question.id)

            if not answer["answer_text"].strip():
                raise serializers.ValidationError(
                    "Answer cannot be empty."
                )

        return answers

class InterviewDetailSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True, read_only=True)
    class Meta:
        model = Interview
        fields = "__all__"


class EvaluationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evaluation
        fields = "__all__"