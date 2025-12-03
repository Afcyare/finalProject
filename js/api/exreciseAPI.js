// Public ExerciseDB mirror (no key required)
export async function getAllExercises() {
  const url = "https://exercisedb-api.vercel.app/api/exercises";
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json(); // big array
    return data;
  } catch (err) {
    console.error("Exercise API error:", err);
    return [];
  }
}
