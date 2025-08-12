export async function getScientists() {
  const response = await fetch('http://localhost:8000/scientists');
  if (!response.ok) {
    throw new Error('Unable to fetch scientists ');
  }
  return response.json();
}