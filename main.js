//console.log("Bismillah")
//30/8/25:7:16pm after magrib Namaz

import { showLoader } from "./logic/helper.js";


// ----|| Get Random Ayat ----|| //
import { getRandomAyat,search_page} from "./logic/service.js";
getRandomAyat();

// ---- || Search || ---- //
const search = document.getElementById("search_butn");
search.addEventListener("click" ,() =>{
  search_page()
})
// main.js
import { displayPage } from "./logic/helper.js";

// expose globally
window.displayPage = displayPage;