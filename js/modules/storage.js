// save/load generic data
export function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadData(key) {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : null;
}

// favorites helpers
export function addFavorite(item) {
  const key = "smartfit:favorites";
  const favs = loadData(key) || [];
  // avoid duplicates by id / name
  const exists = favs.find(f => (f.id && f.id === item.id) || (f.name && f.name === item.name));
  if (!exists) {
    favs.push(item);
    saveData(key, favs);
  }
}

export function getFavorites() {
  return loadData("smartfit:favorites") || [];
}
