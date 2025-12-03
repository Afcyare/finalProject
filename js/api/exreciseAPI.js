export async function testExerciseAPI() {
  const url = "https://exercisedb-api.vercel.app/api/v2";

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("ExerciseDB API Working:", data.slice(0, 5)); // show first 5
  } catch (error) {
    console.error("Exercise API Error:", error);
  }
}

console.log("hello");
