export async function getAllBreeds() {
  // Todo: put api key in .env file
  const response = await fetch('https://api.thecatapi.com/v1/breeds', {
    method: 'GET',
    headers: {
      'x-api-key': '22043483-35d0-4742-8d7a-d837bf75ef45'
    }
  });
  return await response.json();
}