import { searchExercises } from "../api/exerciseAPI.js";
import { renderExerciseResults } from "./ui.js";

export function initWorkoutManager() {
  const btn = document.querySelector("#workSearchBtn");
  const queryEl = document.querySelector("#workQuery");
  const results = document.querySelector("#workResults");
  const status = document.querySelector("#workStatus");

  btn.addEventListener("click", async () => {
    const q = queryEl.value.trim();
    if (!q) {
      status.textContent = "Please enter a search term.";
      return;
    }

    status.textContent = "Searching...";
    results.innerHTML = "";

    const data = await searchExercises(q);

    status.textContent = "";
    renderExerciseResults(results, data);
  });
}
