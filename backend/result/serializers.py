from result.models import *
from rest_framework import serializers

from .dl.utils import f


class ResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = Result
        fields = '__all__'

    def create(self, validated_data):
        instance = super().create(validated_data)
        instance.caption = f(instance.image)
        instance.active = True
        instance.save()
        print(instance.caption)
        return instance
