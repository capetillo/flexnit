import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";
import userService from "../../utils/userService";
import HomePage from "../HomePage/HomePage";
import movieApi from "../../services/movies-api";
import SearchPage from "../../pages/SearchPage/SearchPage";
import WatchListPage from "../WatchListPage/WatchListPage";
import movieService from "../../utils/movieService";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: userService.getUser(),
      moviesArr: [],
      searchArr: []
    };
  }

  getMovie = idx => {
    return this.state.moviesArr[idx];
  };

  componentDidMount() {
    const moviesArr = movieApi.getAllMovies();
    this.setState(async state => await { ...state, moviesArr: moviesArr });
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  };

  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser() });
  };

  handleUpdateUser = newUser => {
    this.setState({ user: newUser });
  };

  render() {
    return (
      <div>
        <header className="header-footer">F L E X N I T</header>
        <Switch>
          <Route
            exact
            path="/home"
            render={() => (
              <HomePage
                user={this.state.user}
                handleLogout={this.handleLogout}
                handleUpdateUser={this.handleUpdateUser}
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
          <div>
            <Route
              exact
              path="/watchlist"
              render={() => (
                <WatchListPage
                  user={this.state.user}
                  // title={movie.title}
                  // summary={movie.summary}
                  // id={movie.movie_id}
                  // updateWatchlist={this.updateWatchlist}
                />
              )}
            />
          </div>
        </Switch>
      </div>
    );
  }
}

export default App;
