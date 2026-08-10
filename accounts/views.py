from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer, UserSerializer
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from django.views.decorators.http import require_GET


class RegisterAPIView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(
            data = request.data
        )
        
        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "message": "User registered successfully"
                },
                status = status.HTTP_201_CREATED
            )
            
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
        
        
class CurrentUserAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


@require_GET
def health_check(request):
    return JsonResponse({
        "status": "ok"
    })