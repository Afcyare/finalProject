const API_KEY = "Vt27eIMxXBsVkdEFBa7X3g==vlrqKGEc7Pvj6vch";

export async function searchExercises(query) {
  const url = `https://api.api-ninjas.com/v1/exercises?name=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url, {
      headers: { 'X-Api-Key': API_KEY }
    });

    if (!response.ok) throw new Error(`Status ${response.status}`);

    const data = await response.json();
    return data; // array of exercises

  } catch (error) {
    console.error("Exercise API Error:", error);
    return [];
  }
}
