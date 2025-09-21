//logic/service.js
const BASE_URL = "https://ayatlens-backend.onrender.com/analyze-image";

import {showLoader,hideLoader,hideError,showError} from './helper.js';
import {createContainer,addContainerData,displayPage} from './helper.js'
import {display} from './ui.js'

// -----|| ANALYSE IMG ||------ //
export async function analyzeCapturedImage(base64Data) {
  showLoader("Analyzing image...");
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image_base64: base64Data })
    });
    
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error sending image:", err);
    showError("Image Detection Failed, Try Again");
  } finally {
    hideLoader();
  }
}

// -----|| Search Logic ||----- //

export async function search_page() {
  const input_query = document.getElementById("get_query").value.trim();
  showLoader("Finding...");
  if (!input_query) return;
  
  displayPage("search_result", "visibility", "visible");
  document.getElementById("hdhd").innerHTML =
    `Search Results related to <i>${input_query}</i>`;
  
  try {
    const res = await fetch(
      `https://ayatlens-backend.onrender.com/search?query=${input_query}`
    );
    const data = await res.json();
    
    // ✅ clear only previous results (not your back button)
    const searchContainer = document.getElementById("search_result");
    searchContainer.querySelectorAll(".resultGroup").forEach(el => el.remove());
    
    // ✅ now append fresh results
    display(data, "search_result", "ayahContainer");
    
  } catch (err) {
    console.error("Error fetching search data:", err);
    showError("Something Went Wrong");
  } finally {
    hideLoader();
  }
}
// ----|| Get Random Ayat ||---- //
export async function getRandomAyat() {
  showLoader("Loading...");
  try {
    const res = await fetch("https://ayatlens-backend.onrender.com/random-ayat");
    const data = await res.json();
    
    if (!data.ayahs || !Array.isArray(data.ayahs)) {
      console.error("Invalid ayahs data", data);
      return;
    }
    
    let n = data.ayahs.length;
    let randomNum = Math.floor(Math.random() * n);
    
    createContainer("random_surah_cont", "random_conatiner");
    addContainerData("random_ayah", data.ayahs[randomNum].text);
    addContainerData("random_ayah_versekey", `${data.surah_number}:${randomNum}`);
  } catch (err) {
    console.error("Error fetching random ayat:", err);
    showError("Network Error, Try Again");
  } finally {
    hideLoader();
  }
}



// -----|| Get Data ||-----//
export async function get_data(query) {
  showLoader("Searching...");
  try {
    const res = await fetch(`https://ayatlens-backend.onrender.com/search?query=${query}`);
    const data = await res.json();
    display(data, "mainSurahContainer", "ayahContainer");
    return data;
  } catch (err) {
    console.error("Error:", err);
    showError("Something Went Wrong");
    return null;
  } finally {
    hideLoader();
  }
}
console.log("✅ service.js loaded");

