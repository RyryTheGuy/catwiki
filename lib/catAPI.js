const catApiURI = 'https://api.thecatapi.com';

export async function getAllBreeds() {
  // Todo: put api key in .env file
  const response = await fetch(`${catApiURI}/v1/breeds`, {
    method: 'GET',
    headers: {
      'x-api-key': '22043483-35d0-4742-8d7a-d837bf75ef45'
    }
  });
  return await response.json();
}

export async function getSpecificCatInfo(catId) {
  const allCats = await getAllBreeds();
  return allCats.find(cat => cat.id === catId);
}

export async function get8BreedImages(catId) {
  const response = await fetch(`${catApiURI}/v1/images/search?limit=8&breed_id=${catId}`, {
    method: 'GET',
    headers: {
      'x-api-key': '22043483-35d0-4742-8d7a-d837bf75ef45'
    },
  });

  return await response.json();
}