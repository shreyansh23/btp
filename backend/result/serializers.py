from result.models import *
from rest_framework import serializers

from dl.utils import final_prediction

model_info = {
    "VGG16": {
        "Model": "VGG16",
        "Size": "528 MB",
        "Top-1 Accuracy": 0.713,
        "Top-5 Accuracy": 0.901,
        "Parameters": "138,357,544",
        "Depth": "23",
        "Release year": 2014
    },
    "VGG19": {
        "Model": "VGG19",
        "Size": "549 MB",
        "Top-1 Accuracy": 0.713,
        "Top-5 Accuracy": 0.9,
        "Parameters": "143,667,240",
        "Depth": "26",
        "Release year": 2014
    },
    "Xception": {
        "Model": "Xception",
        "Size": "88 MB",
        "Top-1 Accuracy": 0.79,
        "Top-5 Accuracy": 0.945,
        "Parameters": "22,910,480",
        "Depth": "126",
        "Release year": 2015
    },
    "ResNet50": {
        "Model": "ResNet50",
        "Size": "98 MB",
        "Top-1 Accuracy": 0.749,
        "Top-5 Accuracy": 0.921,
        "Parameters": "25,636,712",
        "Depth": "-",
        "Release year": 2015
    },
    "ResNet101": {
        "Model": "ResNet101",
        "Size": "171 MB",
        "Top-1 Accuracy": 0.764,
        "Top-5 Accuracy": 0.928,
        "Parameters": "44,707,176",
        "Depth": "-",
        "Release year": 2015
    },
    "InceptionV3": {
        "Model": "InceptionV3",
        "Size": "92 MB",
        "Top-1 Accuracy": 0.779,
        "Top-5 Accuracy": 0.937,
        "Parameters": "23,851,784",
        "Depth": "159",
        "Release year": 2015
    },
    "DenseNet121": {
        "Model": "DenseNet121",
        "Size": "33 MB",
        "Top-1 Accuracy": 0.75,
        "Top-5 Accuracy": 0.923,
        "Parameters": "8,062,504",
        "Depth": "121",
        "Release year": 2016
    },
    "MobileNet": {
        "Model": "MobileNet",
        "Size": "16 MB",
        "Top-1 Accuracy": 0.704,
        "Top-5 Accuracy": 0.895,
        "Parameters": "4,253,864",
        "Depth": "88",
        "Release year": 2017
    },
    "NASNetMobile": {
        "Model": "NASNetMobile",
        "Size": "23 MB",
        "Top-1 Accuracy": 0.744,
        "Top-5 Accuracy": 0.919,
        "Parameters": "5,326,716",
        "Depth": "-",
        "Release year": 2017
    }
}


class ResultSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Result
        fields = '__all__'

    def create(self, validated_data):
        print(validated_data)
        if validated_data.get("model_name") == "":
            validated_data['model_name'] = "Xception"

        instance = super().create(validated_data)
        instance.caption = final_prediction(
            instance.image.name, instance.model_name)
        instance.active = True
        instance.save()
        return instance
