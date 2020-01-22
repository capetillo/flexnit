import React, { useState, Component } from "react";
import Results from "../Results/Results";
import movieService from "../../utils/movieService";
//import SaveButton from "./SaveButton/SaveButton";

class Movies extends Component {
  state = {
    title: "",
    streaming: [],
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
    movieService
      .checkStream(this.state.title)
      .then(response => {
        console.log(response);
        console.log("RESPONSE DATA IS ", response.data);
        if (response.data.length > 0) {
          for (let i = 0; i < response.data[0].locations.length; i++) {
            console.log(response.data[0].locations[i].display_name);
            tempArray.push(response.data[0].locations[i].display_name);
            tempArray.push(response.data[0].picture);
          }
        }
      })
      .then(() => {
        if (tempArray.length > 0) {
          this.setState({ streaming: tempArray, available: "Available On: " });
        } else {
          this.setState({
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
            <img src={this.state.streaming[1]} alt="u suck" />
          </div>
        </form>
        {/* <SaveButton onClick={this.props.handleDeleteMovie} /> */}
      </div>
    );
  }
}

export default Movies;
