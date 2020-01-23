import React from "react";
import Nav from "../../components/Nav/Nav";
import Movies from "../../components/Movies/Movies";

const HomePage = props => {
  return (
    <div className="HomePage">
      <Nav user={props.user} handleLogout={props.handleLogout} />
      <Movies
        user={props.user}
        movies={props.movies}
        handleUpdateUser={props.handleUpdateUser}
      />
    </div>
  );
};

export default HomePage;
