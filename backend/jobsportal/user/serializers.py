from django.contrib.auth import get_user_model, hashers
from rest_framework import serializers
from .models import UserResume


class UserResumeSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserResume
        fields = ['id', 'resume']
        read_only = ['id']


class UserSerializer(serializers.ModelSerializer):

    userresume = UserResumeSerializer(many=False, read_only=True)

    class Meta:
        model = get_user_model()
        fields = ['id', 'first_name', 'last_name', 'email', 'password', 'username', 'userresume']
        read_only_fields = ['id', 'username']
        extra_kwargs = {
            'first_name': { 'allow_blank': False, 'required': True },
            'last_name': { 'allow_blank': False, 'required': True },
            'email': { 'allow_blank': False, 'required': True },
            'password': { 'allow_blank': False, 'required': True,
                         'min_length': 6, 'write_only': True }
         }

    def create(self, validated_data):
        validated_data['username'] = validated_data.get('email')
        validated_data['password'] = hashers.make_password(validated_data.get('password'))
        return get_user_model().objects.create(**validated_data)

