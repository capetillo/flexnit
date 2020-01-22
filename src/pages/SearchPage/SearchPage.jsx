import React, { Component } from "react";
import Results from "../../components/Results/Results";

let user;

class Search extends Component {
  state = {
    movies: []
  };

  componentDidMount() {
    user = this.props.user;
  }

  render() {
    return (
      <div>
        {this.props.movies.map(movie => (
          <p key={movie.movie}> {movie.movie}</p>
        ))}
        <Results />
        {/* ))}
              key={movie.id} src={movie.poster_path} alt={movie.title} title= {movie.title} summary={movie.summary}
           id={movie.id} userName= {user.displayName} user_id={user.uid} icon={true} stream={true} */}
      </div>
    );
  }
}

export default Search;
