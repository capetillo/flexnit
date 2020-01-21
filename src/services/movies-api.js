export function getAllMovies() {
  return fetch(
    "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup",
    {
      method: "GET",
      headers: {
        "x-rapidapi-host":
          "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_API_KEY
      }
    }
  )
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.log(err);
    });
}
