// Nutrition using API Ninjas
const NAPI_KEY = "Vt27eIMxXBsVkdEFBa7X3g==vlrqKGEc7Pvj6vch";

export async function searchNutrition(query) {
  const url = `https://api.api-ninjas.com/v1/nutrition?query=${encodeURIComponent(query)}`;
  try {
    const res = await fetch(url, { headers: { "X-Api-Key": NAPI_KEY } });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    // API Ninjas returns an array of items with many attributes:
    // name, calories, fat_total_g, protein_g, carbohydrates_total_g, fiber_g, sugar_g, serving_size_g
    return data;
  } catch (err) {
    console.error("Nutrition API error:", err);
    return [];
  }
}
