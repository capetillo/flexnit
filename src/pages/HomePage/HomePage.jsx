import React from "react";
import Nav from "../../components/Nav/Nav";

const HomePage = props => {
  return (
    <div className="HomePage">
      <Nav user={props.user} handleLogout={props.handleLogout} />
    </div>
  );
};

export default HomePage;
