import React, { useState, Component } from "react";
import Results from "../Results/Results";
import movieService from "../../utils/movieService";
//import SaveButton from "../SaveButton/SaveButton"
import "./Movies.css";
import userService from "../../utils/userService";

class Movies extends Component {
  state = {
    title: "",
    streaming: [],
    movie: {},
    imgArr: [],
    available: "",
    searchArr: [],
    searchRedirect: false
  };

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
  };

  checkStream = () => {
    console.log("check stream");
    let tempArray = [];
    let imgArray = [];
    let obj = { locations: [] };
    movieService
      .checkStream(this.state.title)
      .then(response => {
        console.log("RESPONSE DATA IS ", response.data);
        if (response.data.length > 0) {
          imgArray.push(response.data[0].picture);
          obj.picture = response.data[0].picture;
          obj.name = response.data[0].name;
          console.log("TEMP ARRAY", tempArray);
          for (let i = 0; i < response.data[0].locations.length; i++) {
            tempArray.push(response.data[0].locations[i].display_name);
            obj.locations.push(response.data[0].locations[i].display_name);
          }
        }
      })
      .then(() => {
        if (tempArray.length > 0) {
          this.setState({
            streaming: tempArray,
            imgArr: imgArray,
            available: "Available On: ",
            movie: obj
          });
        } else {
          this.setState({
            imgArr: imgArray,
            streaming: tempArray,
            available:
              "Womp womp, this isn't currently available on any streaming platform."
          });
        }
      });
  };

  render() {
    const CheckStreamingButton = () => (
      <button onClick={this.checkStream}> Search </button>
    );

    // const nav = !this.state.streaming.includes(this.state.movie) ? (
    //   <button
    //     onClick={() =>
    //       movieService.addToList(this.props.user._id, this.state.movie)
    //     }
    //   >
    //     {" "}
    //     +{" "}
    //   </button>
    // ) : (
    //   <button
    //     onClick={() =>
    //       movieService.deleteFromList(this.props.user._id, this.state.movie)
    //     }
    //   >
    //     {" "}
    //     -{" "}
    //   </button>
    // );

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <div>
              <input
                type="text"
                placeholder="Title"
                value={this.state.title}
                title="title"
                onChange={this.handleChange}
              />
              <CheckStreamingButton />
              {/* <p>{this.state.title}</p> adds the title simultaneously*/}
              <p>{this.state.available}</p>
              {this.state.streaming.map(service => (
                <p key={service}>{service}</p>
              ))}
            </div>
            <img src={this.state.imgArr} className="img" />
          </div>
        </form>
        <button
          onClick={() =>
            movieService
              .addToList(this.props.user._id, this.state.movie)
              .then(res => {
                let newUser = this.props.user;
                newUser.watchlist = [...newUser.watchlist, res.data.message];
                console.log(newUser);
                this.props.handleUpdateUser(newUser);
              })
          }
        >
          {" "}
          +{" "}
        </button>

        <button
          onClick={() =>
            movieService
              .deleteFromList(this.props.user._id, this.state.movie.name)
              .then(res => {
                let newUser = userService.getUser();
                this.props.handleUpdateUser(newUser);
                // let oldUser = this.props.user;
                // oldUser
              })
          }
        >
          {" "}
          -{" "}
        </button>
      </div>
    );
  }
}

export default Movies;
