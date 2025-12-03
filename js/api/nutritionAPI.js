export async function testNutritionAPI() {
  const apiKey = "Vt27eIMxXBsVkdEFBa7X3g==vlrqKGEc7Pvj6vch";
  const url = "https://api.api-ninjas.com/v1/nutrition?query=apple";

  try {
    const response = await fetch(url, {
      headers: { "X-Api-Key": apiKey }
    });

    const data = await response.json();
    console.log("Nutrition API Ninjas Result:", data);
  } catch (error) {
    console.error("Ninja API Error:", error);
  }
}
