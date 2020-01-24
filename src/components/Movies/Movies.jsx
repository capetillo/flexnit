import React, { Component } from "react";
import movieService from "../../utils/movieService";
import YouTube from "react-youtube";
import "./Movies.css";

class Movies extends Component {
  state = {
    title: "",
    streaming: [],
    movie: {},
    imgArr: [],
    available: "",
    hasSearched: false,
    url: [],
    opts: {
      height: "390",
      width: "640",
      playerVars: "https://www.youtube.com/watch?v=YgSW4fnmlKs"
    }
  };

  _onReady(event) {
    event.target.playVideo();
  }

  searchMovie = title => {
    this.setState({ title: title });
  };

  handleChange = e => {
    this.searchMovie();
    console.log("TARGET VALUE" + e.target.value);
    this.setState({
      [e.target.title]: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    console.log("a title was submitted " + this.state.title);
    this.setState({ hasSearched: true });
  };

  checkStream = () => {
    console.log("check stream");
    let tempArray = [];
    let imgArray = [];
    let urlArray = [];
    let obj = { locations: [] };
    movieService
      .checkStream(this.state.title)
      .then(response => {
        if (response.data.length > 0) {
          imgArray.push(response.data[0].picture);
          obj.picture = response.data[0].picture;
          obj.name = response.data[0].name;
          for (let i = 0; i < response.data[0].locations.length; i++) {
            urlArray.push(response.data[0].locations[i].url);
            tempArray.push(response.data[0].locations[i]);
            obj.locations.push(response.data[0].locations[i].display_name);
            console.log("URLS", urlArray);
          }
        }
      })
      .then(() => {
        if (tempArray.length > 0) {
          this.setState({
            streaming: tempArray,
            imgArr: imgArray,
            available: "Available On: ",
            movie: obj,
            url: urlArray
          });
        } else {
          this.setState({
            imgArr: imgArray,
            streaming: tempArray,
            available:
              "This isn't currently available on any streaming platform."
          });
        }
      });
  };

  render() {
    const CheckStreamingButton = () => (
      <button onClick={this.checkStream} disabled={this.state.title === ""}>
        {" "}
        Search{" "}
      </button>
    );
    console.log("THIS PROPS USER", this.props.user);

    let contains = false;
    for (let i = 0; i < this.props.user.watchlist.length; i++) {
      if (this.props.user.watchlist[i].name === this.state.movie.name) {
        contains = true;
        break;
      }
    }
    let nav = !contains ? (
      <div className="add">
        <img
          src="https://www.freeiconspng.com/uploads/facebook-circle-heart-love-png-4.png"
          alt="save"
          className="save"
          onClick={() =>
            movieService
              .addToList(this.props.user._id, this.state.movie)
              .then(res => {
                let newUser = this.props.user;
                newUser.watchlist = [...newUser.watchlist, res.data.message];
                this.props.handleUpdateUser(newUser);
              })
          }
        ></img>
        <p
          onClick={() =>
            movieService
              .addToList(this.props.user._id, this.state.movie)
              .then(res => {
                let newUser = this.props.user;
                newUser.watchlist = [...newUser.watchlist, res.data.message];
                this.props.handleUpdateUser(newUser);
              })
          }
        >
          add to watchlist
        </p>
      </div>
    ) : (
      <div className="remove">
        <img
          src="https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-line/254000/82-512.png"
          alt="delete"
          className="delete"
          onClick={() =>
            movieService
              .deleteFromList(this.props.user._id, this.state.movie.name)
              .then(res => {
                console.log("RESSSS ", res);
                let newUser = res.data;
                this.props.handleUpdateUser(newUser);
              })
          }
        ></img>
        <p
          onClick={() =>
            movieService
              .deleteFromList(this.props.user._id, this.state.movie.name)
              .then(res => {
                console.log("RESSSS ", res);
                let newUser = res.data;
                this.props.handleUpdateUser(newUser);
              })
          }
        >
          remove from watchlist
        </p>
      </div>
    );

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="inputandbutton">
            <input
              type="text"
              placeholder="Title"
              value={this.state.title}
              title="title"
              onChange={this.handleChange}
            />
            <CheckStreamingButton />
          </div>
          {this.state.hasSearched ? (
            <div className="results">
              <div className="title">
                <p className="moviename">{this.state.movie.name}</p>
                <div className="info">
                  <img src={this.state.imgArr} className="img" />

                  <div className="services">
                    <p className="available">{this.state.available}</p>
                    {this.state.streaming.map(service => (
                      <a target="blank" href={service.url}>
                        <p key={service.display_name}>{service.display_name}</p>
                      </a>
                    ))}
                    {nav}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="youtube">
              <YouTube
                videoId="YgSW4fnmlKs"
                opts={this.state.opts}
                onReady={this._onReady}
              />
            </div>
          )}
        </form>
      </div>
    );
  }
}

export default Movies;
