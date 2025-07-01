# ——— Lonz Flawls Aura™ | Futuristic Skin Tone Analysis Launcher ———
# This module orchestrates Aura-grade skin detection and tone classification, 
# ensuring inclusivity, clarity, and maintainability for next-gen beauty tech.

from skin_detection import skin_detection
from skin_tone import skin_tone
from skin_tone_knn import skin_tone_knn
import numpy as np

# — Aura Input Configuration —
AURA_IMAGE_PATH = "public\\test images\\brendon_urie_3.jpeg"

# — Aura Skin Detection: Extract mean skin color values (RGB) —
aura_mean_rgb = skin_detection(AURA_IMAGE_PATH)

# ---[ Legacy experimental block preserved for reference ]---
# B, G, R = img_final.reshape([-1, 3])[:, 0], img_final.reshape([-1, 3])[:, 1], img_final.reshape([-1, 3])[:, 2]
# aura_mean_rgb = [
#     np.bincount(R[R != 0]).argmax(),
#     np.bincount(G[G != 0]).argmax(),
#     np.bincount(B[B != 0]).argmax()
# ]
# print(R[R != 0])
# print(aura_mean_rgb)
# ----------------------------------------------------------

# — Aura ML Classification —
aura_skin_tone_label = skin_tone(aura_mean_rgb)
aura_skin_tone_knn = skin_tone_knn(aura_mean_rgb)

# — Aura Output —
print("Aura Skin Tone (ML):", aura_skin_tone_label)
print("Aura Skin Tone (KNN):", aura_skin_tone_knn)
