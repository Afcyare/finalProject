import { searchExercises } from "../api/exerciseAPI.js";
import { renderExerciseResults } from "./ui.js";
import { addRecentSearch } from "./storage.js"; // addRecentSearch exported earlier

export function initWorkoutManager() {
  const btn = document.querySelector("#workSearchBtn");
  const queryEl = document.querySelector("#workQuery");
  const results = document.querySelector("#workResults");
  const status = document.querySelector("#workStatus");
  if (!btn || !queryEl || !results) return;

  queryEl.addEventListener("keyup", (e) => {
    if (e.key === "Enter") btn.click();
  });

  btn.addEventListener("click", async () => {
    const q = queryEl.value.trim();
    if (!q) {
      status.textContent = "Please enter a search term.";
      return;
    }
    status.textContent = "Searching...";
    results.innerHTML = '<div class="spinner" aria-hidden="true"></div>';
    const data = await searchExercises(q);
    status.textContent = "";
    addRecentSearch(q);
    renderExerciseResults(results, data);
  });
}
