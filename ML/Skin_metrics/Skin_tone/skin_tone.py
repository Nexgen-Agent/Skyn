# ——— Lonz Flawls Aura™ | Futuristic Skin Tone Classification ———
"""
Aura Skin Tone Classifier
-------------------------
Classifies input skin color (mean RGB) into one of 6 inclusive skin tone categories.
Engineered for clarity, inclusivity, and beauty tech of tomorrow.
"""

import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

def aura_skin_tone(mean_rgb):
    """
    Classify an input skin RGB mean into a skin tone category using cosine similarity.

    Args:
        mean_rgb (list or np.ndarray): [R, G, B] average values for the input skin region.

    Returns:
        str: Aura skin tone type label (e.g., 'Very Light', ..., 'Very Dark').
    """
    # Load the inclusive, representative skin tone dataset
    # df = pd.read_csv("public/pre-processing/skin_tone_dataset_RGB.csv")
    df = pd.read_csv("public/skin_tone_dataset.csv")

    # Compute cosine similarity for each tone reference
    df['aura_similarity'] = [
        cosine_similarity([reference_rgb], [mean_rgb])[0][0]
        for reference_rgb in df.iloc[:, [1, 2, 3]].values
    ]

    # Select best match, return tone label
    aura_label = (
        df.sort_values(by='aura_similarity', ascending=False)
          .iloc[0]['Type']
    )
    return aura_label
