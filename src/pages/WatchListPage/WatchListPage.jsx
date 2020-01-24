import React from "react";
import movieService from "../../utils/movieService";
import Nav from "../../components/Nav/Nav";
import "./WatchListPage.css";

const WatchListPage = props => (
  <div>
    <Nav user={props.user} />
    <h2>Your saved shows and movies</h2>
    {props.user.watchlist.map(movie => (
      <div className="results2">
        <div className="info2">
          <div className="title2">
            <div className="titleforreal">{movie.name}</div>
            <div className="chunky">
              <img className="img" src={movie.picture} alt=""></img>

              <div className="services2">
                <img
                  src="https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-line/254000/82-512.png"
                  alt="delete"
                  className="button2"
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
        </div>
      </div>
    ))}
  </div>
);

export default WatchListPage;
