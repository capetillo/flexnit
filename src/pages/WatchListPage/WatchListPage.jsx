import React from "react";
import movieService from "../../utils/movieService";
import Movies from "../../components/Movies/Movies";

class Watchlist extends React.Component {
  state = {
    listed: false,
    streaming: [],
    available: ""
  };

  saveMovie = () => {
    this.handleSaveMovie();

    //FIGURE OUT WHERE TO PASS THIS OMFG
    let watchlistCollection = {
      title: this.props.title,
      movie_id: this.props.id
      //poster: this.props.src,
      //summary: this.props.summary,
      //release_date: this.props.release
    };
    movieService.watchlistMovie(this.props.user_id, watchlistCollection);
  };

  // handleDeleteMovie = () => {
  //   console.log("maybe i deleted the movie, who knows?");
  //   movieService.deleteMovie(this.props.user_id, {
  //     movie_id: this.props.id
  //   });
  //   this.updateWatchlist();
  // };

  // checkStream = () => {
  //   console.log("check stream");
  //   let tempArray = [];
  //   movieService
  //   e.checkStream(this.props.title)
  //     .then(response => {
  //       console.log(response);
  //       console.log(response.data);
  //       if (response.data.length > 0) {
  //         for (let i = 0; i < response.data[0].locations.length; i++) {
  //           console.log(response.data[0].locations[i].display_name);
  //           tempArray.push(response.data[0].locations[i].display_name);
  //         }
  //       }
  //     })
  //     .then(() => {
  //       if (tempArray.length > 0) {
  //         this.setState({ streaming: tempArray, available: "Available On: " });
  //       } else {
  //         this.setState({
  //           available:
  //             "Womp womp, this isn't currently available on any streaming platform."
  //         });
  //       }
  //     });
  // };

  handleSaveMovie = () => {
    console.log("saved it i guess?");
    this.setState(state => ({ listed: !state.listed }));
  };

  // CHECK LATER
  // updateWatchlist = () => {
  //   console.log("made it to updatewatchlist")
  //   movieService.displayList(this.props.user.id)
  //   .then((res) => {
  //     console.log(res);
  //     return res;
  //   })
  //   .then(res => this.setState({ movies: res.data.favorite}))
  //   .catch(err => console.log(err));
  // }

  render() {
    //const stream = this.props.stream;

    return (
      <div>
        <Movies
          handleSaveMovie={this.handleSaveMovie}
          handleDeleteMovie={this.handleDeleteMovie}
        />
      </div>
    );
  }
}

export default Watchlist;
