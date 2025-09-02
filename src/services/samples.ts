export async function getSamples(id:string) {
  const response = await fetch(`http://localhost:8000/scientists/${id}/samples`);
  if (!response.ok) {
    throw new Error('Unable to fetch samples');
  }
  const data = await response.json();
  console.log(data, 'json');
  return data;
}

export async function getSampleResults(id: number) {
  const response = await fetch(`http://localhost:8000/samples/results/${id}`);
  if (!response.ok) {
    throw new Error('Unable to fetch sample results');
  }
  const data = await response.json();
  console.log(data, 'json');
  return data;
}

export async function createSample(sampleData: any) {
  try {
    const response = await fetch("http://localhost:8000/samples", {
      method: "POST",
    headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sampleData),
    });

    if (!response.ok) {
      throw new Error("Failed to create sample");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}