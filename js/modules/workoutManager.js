import { getAllExercises } from "../api/exerciseAPI.js";
import { renderExerciseResults } from "./ui.js";

export function initWorkoutManager() {
  const btn = document.querySelector("#workSearchBtn");
  const queryEl = document.querySelector("#workQuery");
  const results = document.querySelector("#workResults");
  const status = document.querySelector("#workStatus");

  // cache all exercises once for quick search
  let cached = null;
  async function ensureCache() {
    if (cached) return cached;
    status.textContent = "Loading exercise data...";
    cached = await getAllExercises();
    status.textContent = "";
    return cached;
  }

  btn.addEventListener("click", async () => {
    const q = queryEl.value.trim().toLowerCase();
    if (!q) {
      status.textContent = "Please enter a search term.";
      return;
    }
    results.innerHTML = "";
    await ensureCache();
    const filtered = cached.filter(ex =>
      (ex.name && ex.name.toLowerCase().includes(q)) ||
      (ex.bodyPart && ex.bodyPart.toLowerCase().includes(q)) ||
      (ex.target && ex.target.toLowerCase().includes(q))
    ).slice(0, 80); // limit to 80 results to avoid huge render
    renderExerciseResults(results, filtered);
  });
}
