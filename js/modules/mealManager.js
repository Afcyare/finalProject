import { searchNutrition } from "../api/nutritionAPI.js";
import { renderNutritionResults } from "./ui.js";
import { addRecentSearch, addFavorite } from "./storage.js"; // we export addRecentSearch in storage.js earlier

export function initMealManager() {
  const btn = document.querySelector("#mealSearchBtn");
  const queryEl = document.querySelector("#mealQuery");
  const results = document.querySelector("#mealResults");
  const status = document.querySelector("#mealStatus");

  if (!btn || !queryEl || !results) return;

  // Enter key search
  queryEl.addEventListener("keyup", (e) => {
    if (e.key === "Enter") btn.click();
  });

  btn.addEventListener("click", async () => {
    const q = queryEl.value.trim();
    if (!q) {
      status.textContent = "Please enter a food name.";
      return;
    }
    status.textContent = "Searching...";
    results.innerHTML = '<div class="spinner" aria-hidden="true"></div>';
    const data = await searchNutrition(q);
    status.textContent = "";
    // save recent search
    addRecentSearch(q);
    renderNutritionResults(results, data);
  });
}
