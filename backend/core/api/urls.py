from rest_framework.routers import DefaultRouter
from main.api.urls import main_router
from django.urls import path, include

router = DefaultRouter()
router.registry.extend(main_router.registry)

urlpatterns = [
    path('', include(router.urls))
]
