const REQUEST_URL =
  " https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup;";

export function getAllMovies() {
  return fetch(`${REQUEST_URL}movies`, { mode: "cors" }).then(res =>
    res.json()
  );
}
