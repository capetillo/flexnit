export default {
  getAllMovies
};

async function getAllMovies(title) {
  const response = await fetch(
    `https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=${title}&country=us`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host":
          "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_API_KEY
      }
    }
  );
  const json = await response.json();
  return json;
}

// function getPopularMovies() {
//   fetch(
//     `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=4812dacb2c849b2a2f5670f835ee5e9e`
//   ).then(res => res.json()).then;
// }
