// Nutrition API using API Ninjas (free tier)
export async function searchNutrition(query) {
  // Replace query param with user input
  const apiKey = "Vt27eIMxXBsVkdEFBa7X3g==vlrqKGEc7Pvj6vch";
  const url = `https://api.api-ninjas.com/v1/nutrition?query=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url, {
      headers: { "X-Api-Key": apiKey }
    });
    if (!response.ok) throw new Error(`Status ${response.status}`);
    const data = await response.json();
    // data is an array of foods with calories, carbs, protein, etc.
    return data;
  } catch (err) {
    console.error("Nutrition API error:", err);
    return [];
  }
}
