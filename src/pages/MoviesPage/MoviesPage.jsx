import React, { Component } from "react";
import { Link } from "react-router-dom";
import Movies from "../../components/Movies/Movies";

class MoviesPage extends Component {
  constructor(props) {
    super(props);
    this.state = { movies: "" };
  }

  render() {
    return (
      <div className="MoviesPage">
        <Movies {...this.props} />
        <p>{this.state.movies}</p>
      </div>
    );
  }
}

export default MoviesPage;
