from django.contrib import admin
from .models import *

# Register your models here.
# đăng ký các model của ứng dụng Django vào trang quản trị (admin site)
# quản lý dữ liệu của các model đó thông qua Django Admin Interface
admin.site.register(Product)
admin.site.register(Review)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)
