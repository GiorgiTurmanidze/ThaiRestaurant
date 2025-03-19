from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'username', 'password']
        extra_kwargs = {
            'username': {'required': True},
            'email': {'required': True},
            'password': {'required': True},
        }

    def create(self, validated_data):
        # print("Before hashing password:", validated_data['password'])
        validated_data['password'] = make_password(validated_data['password'])
        # print("After hashing password:", validated_data['password'])
        return super(UserSerializer, self).create(validated_data)
        

        
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(username=data['username'], password=data['password'])

        if user is None:
            raise serializers.ValidationError('Invalid username or password.')
        
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        return {'user': user}