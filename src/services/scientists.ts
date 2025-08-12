export async function getScientists() {
  const response = await fetch('http://localhost:8000/scientists');
  if (!response.ok) {
    throw new Error('Unable to fetch scientists ');
  }
  const data = await response.json();
  console.log(data, 'json');
  return data;
}