import React from "react";
import Nav from "../../components/Nav/Nav";
import Movies from "../../components/Movies/Movies";

const HomePage = props => {
  let home = props.user ? (
    <div className="home">
      <Nav user={props.user} handleLogout={props.handleLogout} />
      <Movies
        user={props.user}
        movies={props.movies}
        handleUpdateUser={props.handleUpdateUser}
      />
    </div>
  ) : (
    <div className="home2">
      <Nav />
    </div>
  );
  return <div className="HomePage">{home}</div>;
};

export default HomePage;
