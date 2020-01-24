import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = props => {
  let nav = props.user ? (
    <div className="links">
      <span className="NavBar-welcome">WELCOME, {props.user.name}</span>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Link to="/home" className="NavBar-link">
        HOME
      </Link>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Link to="/watchlist" className="NavBar-link">
        YOUR WATCHLIST
      </Link>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Link to="/home" className="NavBar-link" onClick={props.handleLogout}>
        LOG OUT
      </Link>
    </div>
  ) : (
    <div className="links">
      <Link to="/login" className="NavBar-link">
        LOG IN
      </Link>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <Link to="/signup" className="NavBar-link">
        SIGN UP
      </Link>
    </div>
  );

  return <div className="NavBar">{nav}</div>;
};

export default Nav;
