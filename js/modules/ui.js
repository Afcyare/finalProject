import { addFavorite, getFavorites, removeFavorite } from "./storage.js";

// small util
function createEl(tag, props = {}, children = []) {
  const el = document.createElement(tag);
  Object.entries(props).forEach(([k, v]) => { if (k === "class") el.className = v; else el.setAttribute(k, v); });
  children.forEach(c => el.appendChild(c));
  return el;
}

export function renderNutritionResults(container, data) {
  container.innerHTML = "";
  if (!data || data.length === 0) {
    container.innerHTML = "<p class='small'>No results found.</p>";
    return;
  }
  data.forEach(item => {
    const card = createEl("div", { class: "card" });
    const title = createEl("h3", {}, [ document.createTextNode(item.name || item.food_name || "Food") ]);
    const img = createEl("img", { src: "assets/food-placeholder.png", alt: item.name || "food" });
    const lines = [
      `<strong>Calories:</strong> ${item.calories ?? "N/A"}`,
      `<strong>Protein:</strong> ${item.protein_g ?? item.protein ?? "N/A"} g`,
      `<strong>Carbs:</strong> ${item.carbohydrates_total_g ?? item.carbs ?? "N/A"} g`,
      `<strong>Fat:</strong> ${item.fat_total_g ?? item.fat ?? "N/A"} g`
    ];
    card.appendChild(img);
    card.appendChild(title);
    lines.forEach(l => {
      const p = createEl("p", { class: "small" });
      p.innerHTML = l;
      card.appendChild(p);
    });
    // actions
    const actions = createEl("div", { class: "card-actions" });
    const favBtn = createEl("button", { class: "btn-ghost", type: "button" });
    favBtn.textContent = "Add to Favorites";
    favBtn.addEventListener("click", () => {
      addFavorite({ type: "food", name: item.name || item.food_name, calories: item.calories, details: item });
      favBtn.textContent = "Saved ✓";
      favBtn.disabled = true;
    });
    actions.appendChild(favBtn);
    card.appendChild(actions);
    container.appendChild(card);
  });
}

export function renderExerciseResults(container, data) {
  container.innerHTML = "";
  if (!data || data.length === 0) {
    container.innerHTML = "<p class='small'>No exercises found.</p>";
    return;
  }
  data.forEach(ex => {
    const card = createEl("div", { class: "card" });
    const title = createEl("h3", {}, [ document.createTextNode(ex.name || "Exercise") ]);
    const img = createEl("img", { src: ex.image || ex.gif || "assets/exercise-placeholder.png", alt: ex.name || "exercise" });
    card.appendChild(img);
    card.appendChild(title);
    const lines = [
      `<strong>Muscle:</strong> ${ex.muscle ?? ex.target ?? "N/A"}`,
      `<strong>Equipment:</strong> ${ex.equipment ?? "N/A"}`,
      `<strong>Type:</strong> ${ex.type ?? ex.difficulty ?? "N/A"}`,
      `<strong>Instructions:</strong> ${ex.instructions ? ex.instructions.substring(0,130) + (ex.instructions.length>130? "…":"") : "N/A"}`
    ];
    lines.forEach(l => {
      const p = createEl("p", { class: "small" });
      p.innerHTML = l;
      card.appendChild(p);
    });
    const actions = createEl("div", { class: "card-actions" });
    const favBtn = createEl("button", { class: "btn-ghost", type: "button" });
    favBtn.textContent = "Save";
    favBtn.addEventListener("click", () => {
      addFavorite({ type: "exercise", id: ex.id ?? ex.name, name: ex.name, bodyPart: ex.bodyPart ?? ex.muscle });
      favBtn.textContent = "Saved ✓";
      favBtn.disabled = true;
    });
    actions.appendChild(favBtn);
    card.appendChild(actions);
    container.appendChild(card);
  });
}

export function renderFavorites() {
  const container = document.querySelector("#favoritesList");
  if (!container) return;
  container.innerHTML = "";
  const favs = getFavorites();
  if (!favs.length) {
    container.innerHTML = "<p class='small'>No favorites yet.</p>";
    return;
  }
  favs.forEach(item => {
    const card = createEl("div", { class: "card" });
    const title = createEl("h3");
    title.textContent = item.name;
    const p = createEl("p", { class: "small" });
    p.textContent = item.type === "food" ? `Calories: ${item.calories ?? "N/A"}` : `Body Part: ${item.bodyPart ?? ""}`;
    const removeBtn = createEl("button", { class: "btn-ghost" });
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => {
      removeFavorite(item.id ?? item.name);
      renderFavorites(); // re-render list
    });
    card.appendChild(title);
    card.appendChild(p);
    card.appendChild(removeBtn);
    container.appendChild(card);
  });
}
