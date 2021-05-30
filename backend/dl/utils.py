import string
import os
import datetime
from numpy import array, argmax
from os import listdir
from pickle import load

from keras.preprocessing.image import load_img
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.image import img_to_array
from keras.preprocessing.sequence import pad_sequences
from keras.models import Model, load_model
from tensorflow.keras.applications import InceptionV3

from keras.applications.inception_v3 import *
from keras.applications import *
from keras.applications.vgg16 import *
from keras.applications.vgg19 import VGG19
from keras.applications.resnet50 import ResNet50
from keras.applications.mobilenet import MobileNet
from keras.applications.resnet import ResNet101
from keras.applications.xception import Xception
from keras.applications.densenet import *
from keras.applications.nasnet import *

tokenizer = load(open('dl/tokenizer.pkl', 'rb'))
filename = "dl/model_2.h5"  # Model filename

# img_filename = "dl/images/vaibhav.jpg"  # image filename
max_length = 34
UserModel = None
userModel = None
size = None

assigner = {
    'Xception': [Xception, xception, 299],
    'InceptionV3': [InceptionV3, inception_v3, 299],
    'ResNet50': [ResNet50, resnet50, 224],
    'MobileNet': [MobileNet, mobilenet, 224],
    'VGG16': [VGG16, vgg16, 224],
    'ResNet101': [ResNet101, resnet, 224],
    'VGG19': [VGG19, vgg19, 224],
    'DenseNet121': [DenseNet121, densenet, 224],
    'NASNetMobile': [NASNetMobile, nasnet, 224],
}


def word_for_id(integer, tokenizer):
    if integer in tokenizer.index_word.keys():
        return tokenizer.index_word[integer]
    return None


def generate_desc(model, tokenizer, photo, max_length):
    in_text = 'startseq'
    for i in range(max_length):
        sequence = tokenizer.texts_to_sequences([in_text])[0]
        sequence = pad_sequences([sequence], maxlen=max_length)
        yhat = model.predict([photo, sequence], verbose=0)
        yhat = argmax(yhat)
        word = word_for_id(yhat, tokenizer)
        if word is None:
            break
        in_text += ' ' + word
        if word == 'endseq':
            break
    return in_text


def extract_features(filename):
    model = UserModel()
    model = Model(inputs=model.inputs, outputs=model.layers[-2].output)
    image = load_img(filename, target_size=(size, size))
    image = img_to_array(image)
    image = image.reshape((1, image.shape[0], image.shape[1], image.shape[2]))
    image = userModel.preprocess_input(image)
    feature = model.predict(image, verbose=0)
    return feature


def final_prediction(img_filename, model_name="Xception"):
    global UserModel, userModel, size
    UserModel = assigner[model_name][0]
    userModel = assigner[model_name][1]
    size = assigner[model_name][2]
    photo = extract_features(img_filename)
    filename = f"dl/final_models/{model_name}.h5"  # Model filename
    model = load_model(filename)
    caption = generate_desc(model, tokenizer, photo, max_length)
    return caption
