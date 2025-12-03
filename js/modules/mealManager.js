import { searchNutrition } from "../api/nutritionAPI.js";
import { renderNutritionResults } from "./ui.js";

export function initMealManager() {
  const btn = document.querySelector("#mealSearchBtn");
  const queryEl = document.querySelector("#mealQuery");
  const results = document.querySelector("#mealResults");
  const status = document.querySelector("#mealStatus");

  if (!btn || !queryEl || !results) return;

  btn.addEventListener("click", async () => {
    const q = queryEl.value.trim();
    if (!q) {
      status.textContent = "Please enter a food name.";
      return;
    }
    status.textContent = "Searching...";
    results.innerHTML = "";
    const data = await searchNutrition(q);
    status.textContent = "";
    renderNutritionResults(results, data);
  });
}
