// Lonz Flawls Aura - Elegant API Controllers

/**
 * Uploads an image and navigates to the form page on success.
 * @param {File|Blob} imageSrc 
 * @param {Function} navigate
 */
export const UploadImage = (imageSrc, navigate) => {
    const data = new FormData();
    data.append("file", imageSrc);

    // Aura: Subtle, informative log
    console.info("[Aura] Uploading image...");

    fetch("upload", {
        method: "PUT",
        body: data
    })
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            // Aura: Elegant error message
            console.warn("[Aura] Please add a valid photograph to proceed.");
        } else {
            console.info("[Aura] Image uploaded, navigating to form.");
            navigate("/form", { state: { data } });
        }
    })
    .catch(err => {
        // Aura: Refined error log
        console.error(`[Aura] Upload failed: ${err.message}`);
    });
};

/**
 * Submits form data for recommendations and navigates to results.
 * @param {Object} features 
 * @param {string} currType 
 * @param {number} currTone 
 * @param {Function} navigate 
 */
export const putForm = (features, currType, currTone, navigate) => {
    // Aura: Brief, informative submission log
    console.info("[Aura] Submitting form data for recommendations...", { features, currType, currTone });

    fetch("/recommend", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ features, type: currType, tone: currTone })
    })
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            // Aura: Gentle error feedback
            console.warn("[Aura] There was an error processing your request.");
        } else {
            console.info("[Aura] Recommendations ready, navigating to results.");
            navigate("/recs", { state: { data } });
        }
    })
    .catch(err => {
        // Aura: Distinct error output
        console.error(`[Aura] Recommendation request failed: ${err}`);
    });
};