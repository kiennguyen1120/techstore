from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from base.serializers import  UserSerializer, UserSerializerWithToken
from django.contrib.auth.models import User

from base.models import Product
# Create your views here.
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password
from rest_framework import status


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # thực hiện xác thực và tạo token. Kết quả trả về là một dictionary chứa các thông tin như access token và refresh token.
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        # serialize thông tin người dùng hiện tại (người dùng đã đăng nhập) cùng với token

        for k, v in serializer.items():
            # Lặp qua từng cặp key-value trong serializer và thêm chúng vào data
            data[k] = v

        return data # dictionary chứa token và thông tin người dùng, trả về cho client khi đăng nhập thành công

class MyTokenObtainPairView(TokenObtainPairView):
    #  kế thừa từ TokenObtainPairView, cung cấp một endpoint để người dùng thực hiện yêu cầu đăng nhập.
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
# decorator từ Django REST Framework (DRF) cho phép xác định rằng view này chỉ xử lý các yêu cầu POST
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name = data['name'],
            username = data['email'],
            email = data['email'],
            password = make_password(data['password'])
        )
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'User with this email already exists'}
        return Response(message, status = status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    # Chứa thông tin người dùng đã xác thực (đã đăng nhập) đang thực hiện yêu cầu. Nếu không có người dùng nào đăng nhập, nó sẽ là một instance của AnonymousUser.
    serializers = UserSerializer(user,many=False)
    return Response(serializers.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializers = UserSerializer(users,many=True)
    return Response(serializers.data)