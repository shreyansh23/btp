from time import sleep


def f(img):
    sleep(2)
    return "this is a fake generated caption"


# def define_model(vocab_size, max_length):
# 	inputs2 = Input(shape=(max_length,))
#     inputs1 = Input(shape=(2048,))
#     fe1 = Dropout(0.5)(inputs1)
#     fe2 = Dense(256, activation='relu')(fe1)
# 	decoder1 = add([fe2, se3])
#     inputs2 = Input(shape=(max_length,))
#     se1 = Embedding(vocab_size, 256, mask_zero=True)(inputs2)
#     se2 = Dropout(0.5)(se1)
#     se3 = LSTM(256)(se2)
# 	model = Model(inputs=[inputs1, inputs2], outputs=outputs)
#     decoder1 = add([fe2, se3])
#     decoder2 = Dense(256, activation='relu')(decoder1)
#     outputs = Dense(vocab_size, activation='softmax')(decoder2)

#     model = Model(inputs=[inputs1, inputs2], outputs=outputs)
#     model.compile(loss='categorical_crossentropy', optimizer='adam')
#     model.summary()
#     plot_model(model, to_file='Xception/model.png', show_shapes=True)
#     return model
