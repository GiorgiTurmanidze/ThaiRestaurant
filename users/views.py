from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer, LoginSerializer
from django.contrib.auth.models import User

# Create your views here.

# ✅ REGISTER API (Signup)
class SignUpView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        errors = serializer.errors

        if "username" in errors and any("A user with that username already exists." in str(err) for err in errors["username"]):
            return Response({"error": "Username already exists."}, status=status.HTTP_409_CONFLICT)
        if "email" in errors and any("A user with that email already exists." in str(err) for err in errors["email"]):
            return Response({"error": "Email already exists."}, status=status.HTTP_409_CONFLICT)
        

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ✅ LOGIN API (JWT Token Login)
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']

            refresh = RefreshToken.for_user(user)

            return Response({
                'message': 'login successful.',
                "refresh": str(refresh),
                "access": str(refresh.access_token) 
                }, status=status.HTTP_200_OK)
            # return Response({'message': 'login failed.'}, status=status.HTTP_401_UNAUTHORIZED)
        errors = serializer.errors
        if "Invalid username or password." in str(serializer.errors.get('non_field_errors', [])):
            return Response({"error": "Invalid username or password."}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# ✅ PROTECTED VIEW (Requires JWT) 
class SignInView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({'message': 'You are authenticated!'})



# ✅ Register Page Render
def registerPage(request):
    return render(request, "register.html")

def loginPage(request):
    return render(request, "login.html")

def mainPage(request):
    return render(request, "main.html")

def menuPage(request):
    return render(request, "menu.html")

def basketPage(request):
    return render(request, "basket.html")