//logic/camera.js

const cameraIcon = document.getElementById("cameraIcon");
const cameraPage = document.getElementById("cameraPage");
const snapButton = document.getElementById("snapButton");
const imgOnHomeScreen = document.getElementById("imgConatiner");
const get_query = document.getElementById("get_query");

let videoStream;
let videoElement;
let canvas;
let capturedImage;
import { showLoader, hideLoader, showError, displayPage } from "./helper.js";

import { analyzeCapturedImage, get_data } from "./service.js";

cameraIcon.addEventListener("click", async () => {
  showLoader("Starting Camera..");
  cameraPage.style.display = "flex";
  
  videoElement = document.createElement("video");
  videoElement.autoplay = true;
  videoElement.playsInline = true;
  
  cameraPage.insertBefore(videoElement, snapButton);
  
  try {
    videoStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { exact: "environment" } },
      audio: false
    });
    videoElement.srcObject = videoStream;
  } catch (err) {
    showError("Camera access denied or not available");
  } finally {
    hideLoader();
  }
  
  if (!canvas) {
    canvas = document.createElement("canvas");
    capturedImage = document.createElement("img");
    capturedImage.id = "capturedImage";
    imgOnHomeScreen.appendChild(capturedImage);
    imgOnHomeScreen.style.display = "block";
  }
});

snapButton.addEventListener("click", async () => {
  if (!videoElement) return;
  
  canvas.width = videoElement.videoWidth;
  canvas.height = videoElement.videoHeight;
  
  const ctx = canvas.getContext("2d");
  ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
  
  const dataURL = canvas.toDataURL("image/png");
  capturedImage.src = dataURL;
  
  let datas = await analyzeCapturedImage(dataURL);
  
  if (datas) {
    let predictionsArray = datas.predictions || [];
    if (predictionsArray.length > 0) {
      for (let i = 0; i < predictionsArray.length; i++) {
        await get_data(predictionsArray[i].tag);
      }
    } else {
      showError("No Data Found!");
    }
  }
  
  displayPage("capturedImage", "display", "block");
  displayPage("cameraPage", "display", "none");
  displayPage("obj_result", "visibility", "visible")
  
  if (videoElement) {
    videoElement.remove();
  }
});

console.log("✅ camera.js loaded");