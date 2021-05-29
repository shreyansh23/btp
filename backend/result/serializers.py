from result.models import *
from rest_framework import serializers

from dl.utils import final_prediction


class ResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = Result
        fields = '__all__'

    def create(self, validated_data):
        instance = super().create(validated_data)
        instance.caption = final_prediction(instance.image.name)
        instance.active = True
        instance.save()
        print(instance.caption)
        return instance
