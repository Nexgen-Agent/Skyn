# ——— Lonz Flawls Aura™ | Futuristic Skin Tone KNN Classifier ———
"""
Aura KNN Skin Tone Classification
---------------------------------
Assigns an input skin color (mean RGB values) to one of 6 inclusive skin tone types
using a K-Nearest Neighbors model. Built for clarity, inclusivity, and future-proof beauty tech.
"""

import pandas as pd
from sklearn.neighbors import KNeighborsClassifier

def aura_skin_tone_knn(mean_rgb):
    """
    Classify a skin sample's mean RGB values into a skin tone label via KNN.

    Args:
        mean_rgb (list or np.ndarray): [R, G, B] mean values of the skin region.

    Returns:
        int or str: Aura skin tone type label.
    """
    # Load inclusive skin tone dataset
    df = pd.read_csv("public/skin_tone_dataset.csv")

    # Prepare features and labels
    X = df.iloc[:, [1, 2, 3]].values  # RGB columns
    y = df.iloc[:, 0].values          # Tone type/label

    # KNN classifier (6 neighbors for 6 tones, Euclidean distance)
    classifier = KNeighborsClassifier(n_neighbors=6, metric='minkowski', p=2)
    classifier.fit(X, y)

    # Predict the nearest skin tone
    y_pred = classifier.predict([mean_rgb])
    return y_pred[0]