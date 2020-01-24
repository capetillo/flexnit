import React, { Component } from "react";
import movieService from "../../utils/movieService";
import Movies from "../../components/Movies/Movies";
import Nav from "../../components/Nav/Nav";
import "./WatchListPage.css";

// const handleShowWatchlist = () => {
//   console.log("made it to showing watchlist");
//   movieService
//     .displayList(this.state.user_id)
//     .then(response => {
//       console.log("RESPONSE??", response);
//       return response;
//     })
//     .then(response => this.setState({ moviesArr: response.data.watchlist }))
//     .catch(err => console.log(err));
// };

const WatchListPage = props => (
  <div>
    <Nav user={props.user} />
    {props.user.watchlist.map(movie => (
      <div>
        {movie.name}
        <img className="img" src={movie.picture} alt=""></img>
      </div>
    ))}
  </div>
);

// export default Watchlsit;

//   render() {
//     //const stream = this.props.stream;

//     return (
//       <div>
//         <Movies
//           handleSaveMovie={this.handleSaveMovie}
//           handleDeleteMovie={this.handleDeleteMovie}
//         />
//       </div>
//     );
//   }
// }

export default WatchListPage;
