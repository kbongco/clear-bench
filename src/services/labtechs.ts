export async function getLabTechs() {
  const response = await fetch('http://localhost:8000/lab-techs');
  if (!response.ok) {
    throw new Error('Umable to fetch lab techs');
  }
  const data = await response.json();
  return data;
}