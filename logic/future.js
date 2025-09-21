//logic/future.js
export async function sendImageBase64(base64Img) {
  showLoader("Detecting objects...");
  try {
    const response = await fetch("https://ayatlens-backend.onrender.com/analyze-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image_base64: base64Img })
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.error("Error:", err);
    showError("Image Detection Failed, Try Again");
  } finally {
    hideLoader();
  }
}
console.log("✅ future.js loaded");
