import React from "react";
import movieService from "../../utils/movieService";
import Nav from "../../components/Nav/Nav";
import "./WatchListPage.css";

const WatchListPage = props => (
  <div>
    <Nav user={props.user} />
    {props.user.watchlist.map(movie => (
      <div>
        {movie.name}
        <img className="img" src={movie.picture} alt=""></img>
        <button
          onClick={() =>
            movieService
              .deleteFromList(props.user._id, movie.name)
              .then(res => {
                console.log("RESSSS ", res);
                let newUser = res.data;
                props.handleUpdateUser(newUser);
              })
          }
        >
          {" "}
          -{" "}
        </button>
      </div>
    ))}
  </div>
);

export default WatchListPage;
