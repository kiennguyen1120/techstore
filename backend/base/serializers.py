from rest_framework import serializers
from .models import Product
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

#turn model => json format, custom dữ liệu response gửi cho client thông qua API
class UserSerializer(serializers.ModelSerializer):
    # Khi khai báo một trường là SerializerMethodField trong Django REST Framework, 
    # theo cú pháp mặc định của Python, phương thức dùng để tính giá trị cho trường đó sẽ phải bắt đầu với tiền tố "get_", 
    # theo sau là tên của trường.
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta: 
        model = User #model mà serializer này ánh xạ tới
        fields =['id','_id', 'username', 'email', 'name','isAdmin'] # JSON trả về sẽ bao gồm các key tương ứng với những trường này

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff


    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email
        return name

class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields =['id','_id', 'username', 'email', 'name','isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'