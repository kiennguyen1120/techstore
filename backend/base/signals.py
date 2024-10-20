from django.db.models.signals import pre_save
from django.contrib.auth.models import User

def updateUser(sender, instance, **kwargs):
    # print('Signal called')
    # Signal trong Django, 
    # cụ thể là signal pre_save, 
    # có tác dụng thay đổi thuộc tính của một đối tượng trước khi đối tượng đó được lưu vào cơ sở dữ liệu
    user = instance
    if user.email != "":
        user.username = user.email


pre_save.connect(updateUser, sender=User)