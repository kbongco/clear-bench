export async function getSamples(id:string) {
  const response = await fetch(`http://localhost:8000/scientists/${id}/samples`);
  if (!response.ok) {
    throw new Error('Unable to fetch samples');
  }
  const data = await response.json();
  console.log(data, 'json');
  return data;
}