from django.contrib import admin

from .models import Basket, BasketItem, Dish, Order, OrderItem

# Register your models here.

class BasketItemInline(admin.TabularInline):
    model = BasketItem
    extra = 1

class BasketAdmin(admin.ModelAdmin):
    list_display = ('user', 'created_at')
    inlines = [BasketItemInline]


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0

class OrderAdmin(admin.ModelAdmin):
    list_display = ('user', 'created_at')
    inlines = [OrderItemInline]


admin.site.register(Dish)
admin.site.register(Basket, BasketAdmin)
admin.site.register(Order, OrderAdmin)

