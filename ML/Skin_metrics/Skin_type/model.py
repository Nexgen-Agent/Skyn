import tensorflow as tf
from typing import List

print('Loading model ...')
try:
    model = tf.keras.models.load_model('saved_model')
except Exception as e:
    print(f"Error loading model: {e}")
    raise

class_names: List[str] = ['Dry_skin', 'Normal_skin', 'Oil_skin']

def load_and_prep_image(filename: str, img_shape: int = 224) -> tf.Tensor:
    """
    Loads an image from a file, decodes, resizes, and normalizes it for model prediction.

    Args:
        filename (str): Path to the image file.
        img_shape (int, optional): Target width and height for the image. Defaults to 224.

    Returns:
        tf.Tensor: Preprocessed image tensor ready for model prediction.
    """
    try:
        img = tf.io.read_file(filename)
    except tf.errors.NotFoundError:
        print(f"File not found: {filename}")
        raise
    img = tf.image.decode_jpeg(img, channels=3)  # Ensure 3 channels (RGB)
    img = tf.image.resize(img, [img_shape, img_shape])
    img = img / 255.0  # Normalize to [0, 1]
    return img

def predict_class(filename: str) -> str:
    """
    Loads an image, preprocesses it, predicts its skin type, and prints detailed information.

    Args:
        filename (str): Path to the image file.

    Returns:
        str: Predicted skin type class name.
    """
    print('Loading image ...')
    img = load_and_prep_image(filename)
    
    print('Predicting class of image ...')
    input_tensor = tf.expand_dims(img, axis=0)
    print(f"Input tensor shape: {input_tensor.shape}")

    pred = model.predict(input_tensor)
    print(f"Raw prediction output: {pred}")

    if len(pred[0]) > 1:
        pred_index = tf.argmax(pred[0]).numpy()
        pred_class = class_names[pred_index]
        print(f"Predicted class index (multi-class): {pred_index}")
    else:
        pred_index = int(tf.round(pred[0][0]).numpy())
        pred_class = class_names[pred_index]
        print(f"Predicted class index (binary/one-hot): {pred_index}")
    print('Predicted class:', pred_class)
    return pred_class

if __name__ == "__main__":
    test_image_path = 'test_image.jpg'
    try:
        predict_class(test_image_path)
    except Exception as err:
        print(f"Prediction failed: {err}")