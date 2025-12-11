export function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
export function loadData(key) {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : null;
}

// Favorites helpers
const FAV_KEY = "smartfit:favorites";
const MEAL_KEY = "smartfit:mealPlans";
const SEARCH_KEY = "smartfit:recentSearches";
const SET_KEY = "smartfit:userSettings";
const VIEW_KEY = "smartfit:lastViewed";

export function addFavorite(item) {
  const favs = loadData(FAV_KEY) || [];
  const exists = favs.find(f => (f.id && f.id === item.id) || f.name === item.name);
  if (!exists) {
    favs.push(item);
    saveData(FAV_KEY, favs);
  }
}
export function removeFavorite(nameOrId) {
  let favs = loadData(FAV_KEY) || [];
  favs = favs.filter(f => !(f.id === nameOrId || f.name === nameOrId));
  saveData(FAV_KEY, favs);
}
export function getFavorites() {
  return loadData(FAV_KEY) || [];
}

// Meal planner (simple structure: { day: { breakfast: [], lunch: [], dinner: [] } })
export function saveMealPlan(plan) {
  saveData(MEAL_KEY, plan);
}
export function loadMealPlan() {
  return loadData(MEAL_KEY) || {}; 
}

// Recent searches
export function addRecentSearch(query) {
  const list = loadData(SEARCH_KEY) || [];
  if (!list.includes(query)) {
    list.unshift(query);
    if (list.length > 10) list.pop();
    saveData(SEARCH_KEY, list);
  }
}
export function getRecentSearches() {
  return loadData(SEARCH_KEY) || [];
}

// Settings and last viewed
export function saveSettings(settings) {
  saveData(SET_KEY, settings);
}
export function loadSettings() {
  return loadData(SET_KEY) || {};
}
export function setLastViewed(item) {
  saveData(VIEW_KEY, item);
}
export function getLastViewed() {
  return loadData(VIEW_KEY);
}
