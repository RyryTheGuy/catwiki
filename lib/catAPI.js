const catApiURI = 'https://api.thecatapi.com';

export async function getAllBreeds() {
  const response = await fetch(`${catApiURI}/v1/breeds`, {
    method: 'GET',
    headers: {
      'x-api-key': process.env.CAT_API_KEY
    }
  });
  return response;
}

export async function getSpecificCatInfo(catId) {
  const response = await getAllBreeds();
  const allCats = await response.json();
  return allCats.find(cat => cat.id === catId);
}

export async function get8BreedImages(catId) {
  const response = await fetch(`${catApiURI}/v1/images/search?limit=8&breed_id=${catId}`, {
    method: 'GET',
    headers: {
      'x-api-key': process.env.CAT_API_KEY
    },
  });

  return await response.json();
}