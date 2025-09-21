//logic/ui.js

export function display(data, cont, contClass) {
  if (!data || !Array.isArray(data.results)) {
    console.warn("display: invalid data", data);
    return;
  }
  
  const wrapper = document.createElement("div");
  wrapper.classList.add("resultGroup");
  
  const queryBox = document.createElement("h1");
  queryBox.classList.add("queryTitle");
  queryBox.innerText = `Query: ${data.search_keyword || ""}`;
  wrapper.appendChild(queryBox);
  
  const totalBox = document.createElement("h4");
  totalBox.classList.add("totalVerse");
  totalBox.innerText = `Total Verse: ${data.results.length}`;
  wrapper.appendChild(totalBox);
  
  for (let i = 0; i < data.results.length; i++) {
    const ayahContainer = document.createElement("div");
    ayahContainer.classList.add(contClass);
    
    const verseKey = document.createElement("div");
    verseKey.classList.add("verseKey");
    verseKey.innerText = data.results[i].verse_key;
    
    const surah = document.createElement("div");
    surah.classList.add("surah");
    surah.innerText = data.results[i].text;
    
    const saveBtn = document.createElement("button");
    saveBtn.classList.add("save_button");
    saveBtn.innerText = "Save";
    
    (function(item) {
      saveBtn.addEventListener("click", () => {
        const savedBox = document.createElement("div");
        savedBox.classList.add("ayahContainer");
        
        const savedKey = document.createElement("div");
        savedKey.classList.add("verseKey");
        savedKey.innerText = item.verse_key;
        
        const savedSurah = document.createElement("div");
        savedSurah.classList.add("surah");
        savedSurah.innerText = item.text;
        
        savedBox.appendChild(savedKey);
        savedBox.appendChild(savedSurah);
        
        document.getElementById("save_ayat_container").appendChild(savedBox);
        
        saveAyat(item.verse_key, item.text);
      });
    })(data.results[i]);
    
    ayahContainer.appendChild(verseKey);
    ayahContainer.appendChild(surah);
    ayahContainer.appendChild(saveBtn);
    
    wrapper.appendChild(ayahContainer);
  }
  
  const mainContainer = document.getElementById(cont);
  mainContainer.appendChild(wrapper);
}
console.log("✅ ui.js loaded");
