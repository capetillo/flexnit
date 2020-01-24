import React from "react";
import movieService from "../../utils/movieService";
import Nav from "../../components/Nav/Nav";
import "./WatchListPage.css";

const WatchListPage = props => (
  <div>
    <Nav user={props.user} />
    <h2>Your saved shows and movies</h2>
    {props.user.watchlist.map(movie => (
      <div className="results">
        <div className="info">
          {movie.name}
          <img className="img" src={movie.picture} alt=""></img>
          <div className="services">
            <p>Available on: </p>
            {movie.locations}
            <img
              src="https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-line/254000/82-512.png"
              alt="delete"
              className="button"
              onClick={() =>
                movieService
                  .deleteFromList(props.user._id, movie.name)
                  .then(res => {
                    console.log("RESSSS ", res);
                    let newUser = res.data;
                    props.handleUpdateUser(newUser);
                  })
              }
            ></img>
            <p>remove from watchlist</p>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default WatchListPage;
