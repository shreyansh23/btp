import string
import os
import datetime
from numpy import array, argmax
from os import listdir
from pickle import dump, load
import matplotlib.pyplot as plt

import keras
from keras.models import Model
from keras.layers import Input
from keras.layers import Dense
from keras.layers import LSTM
from keras.layers import Embedding
from keras.layers import Dropout
from keras.layers.merge import add
from keras.callbacks import ModelCheckpoint, TensorBoard
from keras.preprocessing.image import load_img
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.image import img_to_array
from keras.preprocessing.sequence import pad_sequences
from keras.applications import *
from keras.models import Model, load_model
from keras.applications.xception import Xception
from keras.applications import xception

tokenizer = load(open('dl/tokenizer.pkl', 'rb'))
filename = "dl/model_2.h5"  # Model filename

img_filename = "dl/images/vaibhav.jpg"  # image filename
model = load_model(filename)
max_length = 34


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
    model = Xception()
    model = Model(inputs=model.inputs, outputs=model.layers[-2].output)
    image = load_img(filename, target_size=(299, 299))
    plt.imshow(image)
    # plt.close()
    image = img_to_array(image)
    image = image.reshape((1, image.shape[0], image.shape[1], image.shape[2]))
    image = xception.preprocess_input(image)
    feature = model.predict(image, verbose=0)
    return feature


def final_prediction():
    photo = extract_features(img_filename)
    caption = generate_desc(model, tokenizer, photo, max_length)
    return caption


# final_prediction(img_filename)
