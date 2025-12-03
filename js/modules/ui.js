import { addFavorite, getFavorites } from "./storage.js";

function makeCardNode({ img, title, lines = [], actions = [] }) {
  const card = document.createElement("div");
  card.className = "card";

  if (img) {
    const i = document.createElement("img");
    i.src = img;
    i.alt = title || "image";
    card.appendChild(i);
  }

  if (title) {
    const h = document.createElement("h3");
    h.textContent = title;
    card.appendChild(h);
  }

  lines.forEach(l => {
    const p = document.createElement("p");
    p.className = "small";
    p.innerHTML = l;
    card.appendChild(p);
  });

  const actionsWrap = document.createElement("div");
  actionsWrap.className = "card-actions";

  actions.forEach(a => {
    const btn = document.createElement("button");
    btn.textContent = a.label;
    btn.className = a.class || "btn-ghost";
    btn.addEventListener("click", a.onClick);
    actionsWrap.appendChild(btn);
  });

  card.appendChild(actionsWrap);
  return card;
}

export function renderNutritionResults(container, data) {
  container.innerHTML = "";
  if (!data || data.length === 0) {
    container.innerHTML = "<p class='small'>No results found.</p>";
    return;
  }

  data.forEach(item => {
    const lines = [
      `<strong>Calories:</strong> ${item.calories ?? "N/A"}`,
      `<strong>Protein:</strong> ${item.protein_g ?? item.protein ?? "N/A"} g`,
      `<strong>Carbs:</strong> ${item.carbohydrates_total_g ?? item.carbs ?? "N/A"} g`
    ];

    const card = makeCardNode({
      title: item.name || item.food_name || "Food item",
      lines,
      actions: [
        {
          label: "Add to Favorites",
          onClick: () => {
            addFavorite({
              type: "food",
              name: item.name || item.food_name,
              calories: item.calories
            });
            alert("Saved to favorites");
          }
        }
      ]
    });

    container.appendChild(card);
  });
}

export function renderExerciseResults(container, data) {
  container.innerHTML = "";
  if (!data || data.length === 0) {
    container.innerHTML = "<p class='small'>No exercises found.</p>";
    return;
  }

  data.forEach(item => {
    const img = item.gifUrl || item.gifUrl2 || "";
    const title = item.name || item.exerciseName || "Exercise";
    const lines = [
      `<strong>Body Part:</strong> ${item.bodyPart || item.body_part || "N/A"}`,
      `<strong>Target:</strong> ${item.target || item.target_muscle || "N/A"}`,
      `<strong>Equipment:</strong> ${item.equipment || item.equip || "N/A"}`
    ];

    const card = makeCardNode({
      img,
      title,
      lines,
      actions: [
        {
          label: "Add to Favorites",
          onClick: () => {
            addFavorite({
              type: "exercise",
              id: item.id,
              name: title,
              bodyPart: item.bodyPart
            });
            alert("Saved to favorites");
          }
        }
      ]
    });

    container.appendChild(card);
  });
}

export function renderFavorites() {
  const container = document.querySelector("#favoritesList");
  if (!container) return;
  container.innerHTML = "";

  const favs = getFavorites();
  if (!favs.length) {
    container.innerHTML = "<p class='small'>No favorites yet. Add some from Meals or Workouts.</p>";
    return;
  }

  favs.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${item.name}</h3>
      <p class="small">${item.type === "food" ? `Calories: ${item.calories ?? "N/A"}` : `Body Part: ${item.bodyPart ?? ""}`}</p>
    `;
    container.appendChild(card);
  });
}
