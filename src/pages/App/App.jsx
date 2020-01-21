import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";
import userService from "../../utils/userService";
import HomePage from "../HomePage/HomePage";
import { getAllMovies } from "../../services/movies-api";
import SearchPage from "../../pages/SearchPage/SearchPage";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: userService.getUser(),
      movies: "",
      searchArr: []
    };
  }

  getMovie = idx => {
    return this.state.movies[idx];
  };

  async componentDidMount() {
    const movies = await getAllMovies();
    this.setState({ movies: movies });
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  };

  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser() });
  };

  render() {
    return (
      <div>
        <header className="header-footer">F L E X N I T</header>
        {
          // <main>
          //   {this.state.movies.map(movie => (
          //     <p key={movie.movie}> {movie.movie}</p>
          //   ))}
          // </main>
        }
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <HomePage
                user={this.state.user}
                handleLogout={this.handleLogout}
              />
            )}
          />
          <Route
            exact
            path="/signup"
            render={({ history }) => (
              <SignupPage
                history={history}
                handleSignupOrLogin={this.handleSignupOrLogin}
              />
            )}
          />
          <Route
            exact
            path="/login"
            render={({ history }) => (
              <LoginPage
                history={history}
                handleSignupOrLogin={this.handleSignupOrLogin}
              />
            )}
          />
          <Route
            exact
            path="/search"
            render={() => <SearchPage movies={this.state.searchArr} />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
