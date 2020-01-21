import React, { useState, Component } from "react";
import Results from "../Results/Results";
import movieService from "../../utils/movieService";

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
      // Using ES2015 Computed Property Names

      [e.target.title]: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    console.log("a title was submitted " + this.state.title);
  };

  //   handleFormSubmit = e => {
  //     e.preventDefault();
  //     movieService
  //       .getSearch(this.state.search)
  //       .then(res => {
  //         console.log(res);
  //         return res;
  //       })
  //       .then(res => this.setState({ searchArr: res.data }))
  //       .then(this.setState({ searchRedirect: true }))
  //       .catch(err => console.log(err));
  //   };

  checkStream = () => {
    console.log("check stream");
    let tempArray = [];
    console.log("made it this far");
    movieService
      .checkStream(this.state.title)
      .then(response => {
        console.log(response);
        console.log(response.data);
        if (response.data.length > 0) {
          for (let i = 0; i < response.data[0].locations.length; i++) {
            console.log(response.data[0].locations[i].display_name);
            tempArray.push(response.data[0].locations[i].display_name);
          }
        }
      })
      .then(() => {
        if (tempArray.length > 0) {
          this.setState({ streaming: tempArray, available: "Available On: " });
        } else {
          this.setState({
            available:
              "Womp womp, this isn't currently available on any streaming platform."
          });
        }
      });
  };
  // const Movies = () => {
  //     let [term, setTerm] = useState("");
  //     let [country, setCountry] = useState("");
  //     let [responseObj, setResponseObj] = useState({});
  //     let [error, setError] = useState(false);
  //     let [loading, setLoading] = useState(false);
  //   getMovies = e => {
  //     e.preventDefault();

  //     if (term.length === 0) {
  //       return setError(true);
  //     }

  //     //     // Clear state in preparation for new data
  //     setError(false);
  //     setResponseObj({});

  //     setLoading(true);

  //     const uriEncodedTerm = encodeURIComponent(term);
  //     const uriEncodedCountry = encodeURIComponent(country);

  //     fetch(
  //       `https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=${uriEncodedTerm}&country=${uriEncodedCountry}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "x-rapidapi-host":
  //             "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
  //           "x-rapidapi-key": process.env.REACT_APP_API_KEY
  //         }
  //       }
  //     )
  //       .then(response => response.json())
  //       .then(response => {
  //         if (response.status_code !== 200) {
  //           throw new Error();
  //         }

  //         setResponseObj(response);
  //         setLoading(false);
  //       })
  //       .catch(err => {
  //         setError(true);
  //         setLoading(false);
  //         console.log(err.message);
  //       });
  //   };
  //   render() {
  //     return (
  //       <div>
  //         <h2>Find a movie idk</h2>
  //         <div>
  //           <form onSubmit={getMovies}>
  //             <input
  //               type="text"
  //               placeholder="Search movie"
  //               maxLength="50"
  //               value={term}
  //               onChange={e => setTerm(e.target.value)}
  //             />
  //             <button type="submit">Search Movie</button>
  //             <Results
  //               responseObj={responseObj}
  //               error={error}
  //               loading={loading}
  //             />
  //             <h2>Where are you tho</h2>
  //             <input
  //               type="text"
  //               placeholder="Where"
  //               maxLength="50"
  //               value={country}
  //               onChange={e => setCountry(e.target.value)}
  //             />
  //             <button type="submit">Search Movie</button>
  //           </form>
  //           <Results responseObj={responseObj} error={error} loading={loading} />
  //         </div>
  //       </div>
  //     );
  //   }
  // }
  render() {
    // const { classes } = this.props;
    // const stream = this.props.stream;
    const CheckStreamingButton = () => (
      <button onClick={this.checkStream}> Can I Stream This? </button>
    );
    return (
      <div>
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <div className="col-sm-12">
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                value={this.state.title}
                title="title"
                onChange={this.handleChange}
              />
              <CheckStreamingButton />
              <p>{this.state.available}</p>
              {this.state.streaming.map(service => (
                <p key={service}>{service}</p>
              ))}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Movies;
