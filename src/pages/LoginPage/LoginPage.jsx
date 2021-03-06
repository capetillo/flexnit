import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css";
import userService from "../../utils/userService";

class LoginPage extends Component {
  state = {
    email: "",
    pw: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    try {
      await userService.login(this.state);
      // Let <App> know a user has signed up!
      this.props.handleSignupOrLogin();
      // Successfully signed up - show GamePage
      this.props.history.push("/");
    } catch (err) {
      // Invalid user data (probably duplicate email)
      alert("Invalid Credentials!");
    }
  };

  render() {
    return (
      <div className="LoginPage">
        <header className="header-footer">LOG IN</header>
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <div className="col-sm-12">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={this.state.email}
                name="email"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={this.state.pw}
                name="pw"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12 text-center">
              <div className="loginandcancel">
                <button className="btn btn-default">LOG IN</button>
                &nbsp;&nbsp;&nbsp;
                <div className="cancel">
                  <Link to="/">CANCEL</Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginPage;
