import cv2
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans

# ——— Lonz Flawls Aura™ | Futuristic Skin Detection Module ———
# This module delivers precision, inclusivity, and clear pipelines for diverse skin tone segmentation.

pd.options.mode.chained_assignment = None  # Silence pandas SettingWithCopyWarning

# ——— Main Pipeline ———

def skin_detection(img_path):
    """
    Futuristic skin detection pipeline.
    Args:
        img_path (str): Path to input image.
    Returns:
        np.ndarray: Refined skin cluster row, ready for further analysis.
    """
    original = read_image(img_path)
    images = image_conversions(original)
    height, width = skin_predict(images)
    dframe, dframe_removed = dataframe(images)
    skin_cluster_row, skin_cluster_label = skin_cluster(dframe)
    cluster_label_mat = cluster_matrix(
        dframe, dframe_removed, skin_cluster_label, height, width)
    final_segment(images, cluster_label_mat)
    display_all_images(images)
    # write_all_images(images)
    skin_cluster_row = np.delete(skin_cluster_row, [1, 2, -1])
    return skin_cluster_row
    # return images["final_segment"]

# ——— Visualization Utilities ———

def plot_histogram(histogram, bin_edges, Totsu, Tmax, Tfinal):
    """Visualizes pixel intensity histogram with thresholds for analysis."""
    plt.figure(figsize=(8, 4))
    plt.title("Image Histogram: Futuristic Thresholds")
    plt.xlabel("Pixel Value")
    plt.ylabel("Frequency")
    plt.xlim([0, 256])
    plt.plot(bin_edges[0:-1], histogram, label="Histogram")
    plt.axvline(x=Tmax, label="Tmax", color='red', linestyle="--")
    plt.axvline(x=Totsu, label="Totsu", color='green', linestyle="--")
    plt.axvline(x=Tfinal, label="Tfinal", color='yellow', linestyle="-")
    plt.legend()
    plt.grid(alpha=0.15)
    plt.tight_layout()
    plt.show()

def display_image(image, name):
    """Display a single image in a window."""
    cv2.namedWindow(name, cv2.WINDOW_NORMAL)
    cv2.imshow(name, image)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

def display_all_images(images):
    """Display all images stored in the images dictionary."""
    for key, value in images.items():
        display_image(value, key)

def write_all_images(images):
    """Write all images to files named by their keys."""
    for key, value in images.items():
        cv2.imwrite(f"{key}.jpg", value)

# ——— Image Preprocessing ———

def read_image(path):
    """Read and resize image to max dims for consistent processing."""
    maxwidth, maxheight = 400, 500
    img_BGR = cv2.imread(path, cv2.IMREAD_COLOR)
    f1 = maxwidth / img_BGR.shape[1]
    f2 = maxheight / img_BGR.shape[0]
    f = min(f1, f2)  # resizing factor
    dim = (int(img_BGR.shape[1] * f), int(img_BGR.shape[0] * f))
    img_BGR = cv2.resize(img_BGR, dim)
    return img_BGR

def thresholding(images):
    """Apply Otsu's binarization and custom thresholding for mask generation."""
    histogram, bin_edges = np.histogram(images["grayscale"].ravel(), 256, [0, 256])
    Totsu, threshold_image_otsu = cv2.threshold(
        images["grayscale"], 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
    Tmax = np.argmax(histogram)
    Tfinal = round((Tmax + Totsu) / 2) if Tmax > 10 else round((Tmax + Totsu) / 4)

    plot_histogram(histogram, bin_edges, Totsu, Tmax, Tfinal)

    threshold_type = cv2.THRESH_BINARY if Tmax < 220 else cv2.THRESH_BINARY_INV
    _, threshold_image = cv2.threshold(images["grayscale"], Tfinal, 255, threshold_type)
    masked_img = cv2.bitwise_and(images["BGR"], images["BGR"], mask=threshold_image)
    return masked_img

def image_conversions(img_BGR):
    """Convert image to multiple color spaces and segment with thresholding."""
    images = {
        "BGR": img_BGR,
        "grayscale": cv2.cvtColor(img_BGR, cv2.COLOR_BGR2GRAY)
    }
    images["thresholded"] = thresholding(images)
    images["HSV"] = cv2.cvtColor(images["thresholded"], cv2.COLOR_BGR2HSV)
    images["YCrCb"] = cv2.cvtColor(images["thresholded"], cv2.COLOR_BGR2YCrCb)
    # display_all_images(images)
    return images

# ——— Skin Pixel Prediction ———

def skin_predict(images):
    """
    Predict likely skin pixels using HSV and YCrCb thresholds.
    Returns:
        (height, width): Image dimensions.
    """
    height, width = images["grayscale"].shape
    images["skin_predict"] = np.copy(images["grayscale"])

    for i in range(height):
        for j in range(width):
            hsv = images["HSV"][i, j]
            ycrcb = images["YCrCb"][i, j]
            if (hsv[0] <= 170) and (140 <= ycrcb[1] <= 170) and (90 <= ycrcb[2] <= 120):
                images["skin_predict"][i, j] = 255
            else:
                images["skin_predict"][i, j] = 0
    return height, width

# ——— Dataframe Construction for Clustering ———

def dataframe(images):
    """
    Build DataFrame for KMeans clustering with pixel features.
    """
    dframe = pd.DataFrame()
    dframe['H'] = images["HSV"].reshape([-1, 3])[:, 0]

    # y-x coordinates
    gray = cv2.cvtColor(images["thresholded"], cv2.COLOR_BGR2GRAY)
    yx_coords = np.column_stack(np.where(gray >= 0))
    dframe['Y'] = yx_coords[:, 0]
    dframe['X'] = yx_coords[:, 1]
    dframe['Cr'] = images["YCrCb"].reshape([-1, 3])[:, 1]
    dframe['Cb'] = images["YCrCb"].reshape([-1, 3])[:, 2]
    dframe['I'] = images["skin_predict"].reshape(-1)

    # Remove Black pixels - already segmented
    dframe_removed = dframe[dframe['H'] == 0].copy()
    dframe = dframe[dframe['H'] != 0]
    return dframe, dframe_removed

# ——— KMeans Clustering for Skin Regions ———

def skin_cluster(dframe):
    """
    Cluster skin pixels using KMeans, identify the most 'skin-like' cluster.
    Returns:
        skin_cluster_row: The cluster center with max intensity.
        skin_cluster_label: Its cluster label.
    """
    kmeans = KMeans(
        init="random",
        n_clusters=3,
        n_init=5,
        max_iter=100,
        random_state=42
    )
    kmeans.fit(dframe)
    km_cc = kmeans.cluster_centers_
    skin_cluster_row = km_cc[km_cc[:, -1] == max(km_cc[:, -1])][0]
    skin_cluster_label = np.argmax([np.allclose(row, skin_cluster_row) for row in km_cc])

    dframe['cluster'] = kmeans.labels_
    return skin_cluster_row, skin_cluster_label

# ——— Cluster Matrix Construction ———

def cluster_matrix(dframe, dframe_removed, skin_cluster_label, height, width):
    """
    Build a matrix labeling each pixel as skin or not-skin (for segmentation mask).
    """
    dframe_removed['cluster'] = -1
    dframe_full = pd.concat([dframe, dframe_removed]).sort_index()
    dframe_full['cluster'] = (dframe_full['cluster'] == skin_cluster_label).astype(np.uint8) * 255
    cluster_label_mat = dframe_full['cluster'].values.reshape(height, width)
    return cluster_label_mat.astype(np.uint8)

# ——— Final Segmentation ———

def final_segment(images, cluster_label_mat):
    """
    Apply skin mask to original image for final segmentation.
    """
    final_segment_img = cv2.bitwise_and(images["BGR"], images["BGR"], mask=cluster_label_mat)
    images["final_segment"] = final_segment_img
    # display_image(final_segment_img, "Final Segmentation")

# ——— End of Futuristic Module ———
# Example usage:
# skin_detection("path/to/your/image.jpg")
