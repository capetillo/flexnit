import React, { useState } from "react";
import Results from "../Results/Results";

const Movies = () => {
  let [term, setTerm] = useState("");
  let [country, setCountry] = useState("");
  let [responseObj, setResponseObj] = useState({});
  let [error, setError] = useState(false);
  let [loading, setLoading] = useState(false);

  function getMovies(e) {
    e.preventDefault();

    if (term.length === 0) {
      return setError(true);
    }

    // Clear state in preparation for new data
    setError(false);
    setResponseObj({});

    setLoading(true);

    const uriEncodedTerm = encodeURIComponent(term);
    const uriEncodedCountry = encodeURIComponent(country);

    fetch(
      `https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=${uriEncodedTerm}&country=${uriEncodedCountry}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host":
            "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
          "x-rapidapi-key": process.env.REACT_APP_API_KEY
        }
      }
    )
      .then(response => response.json())
      .then(response => {
        if (response.status_code !== 200) {
          throw new Error();
        }

        setResponseObj(response);
        setLoading(false);
      })
      .catch(err => {
        setError(true);
        setLoading(false);
        console.log(err.message);
      });
  }

  return (
    <div>
      <h2>Find a movie idk</h2>
      <div>
        <form onSubmit={getMovies}>
          <input
            type="text"
            placeholder="Search movie"
            maxLength="50"
            value={term}
            onChange={e => setTerm(e.target.value)}
          />
          <button type="submit">Search Movie</button>
          <Results responseObj={responseObj} error={error} loading={loading} />
          <h2>Where tho</h2>
          <input
            type="text"
            placeholder="Where"
            maxLength="50"
            value={country}
            onChange={e => setCountry(e.target.value)}
          />
          <button type="submit">Search Movie</button>
        </form>
        <Results responseObj={responseObj} error={error} loading={loading} />
      </div>
    </div>
  );
};

export default Movies;
