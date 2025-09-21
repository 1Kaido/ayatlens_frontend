//logic/helper.js


let raw;
let raw_save_button;
export function createContainer(main, container_class) {
  const mainContainer = document.getElementById(main);
  if (!mainContainer) {
    console.warn("createContainer: parent not found:", main);
    return null;
  }
  const container = document.createElement("div");
  container.classList.add(container_class);
  mainContainer.appendChild(container);
  raw = container;
  return container;
}

export function addContainerData(className, text) {
  const box = document.createElement("div");
  box.classList.add(className);
  box.innerText = text;
  if (!raw) {
    console.warn("addContainerData: raw is not set. Call createContainer first.");
    return box;
  }
  raw.appendChild(box);
  if (className === "save_button") raw_save_button = box;
  return box;
}

// ----|| Create Page ||---- //
export function displayPage(id, type, style) {
  const page = document.getElementById(id);
  if (!page) return;
  if (type === "visibility") {
    page.style.visibility = style;
  } else {
    page.style.display = style;
  }
}

// ----|| Show Loader ||---- //
export function showLoader(text) {
  const loader = document.getElementById("app-loader");
  if (!loader) return;
  if (text) loader.querySelector(".loader-text").innerText = text;
  loader.classList.add("active");
  loader.setAttribute("aria-hidden", "false");
}

// ----|| Hide Loader ||---- //
export function hideLoader() {
  const loader = document.getElementById("app-loader");
  if (!loader) return;
  loader.classList.remove("active");
  loader.setAttribute("aria-hidden", "true");
}

export function reloadIfTooSlow(ms = 15000) { // default 15 seconds
  return setTimeout(() => {
   // alert("Taking too long... reloading.");
    location.reload();
  }, ms);
}
// ----|| Show Error ||---- //
export function showError(message) {
  const box = document.getElementById("errorBox");
  const msg = document.getElementById("errorMsg");
  
  msg.textContent = message;
  box.style.display = "flex";
  
  // Auto-hide after 5 seconds
  setTimeout(() => {
    hideError();
  }, 5000);
}

// ----|| Hide Loader ||---- //
export function hideError() {
  document.getElementById("errorBox").style.display = "none";
}

console.log("✅ helper.js loaded");