import React, { useState } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";

import { connect } from "react-redux";
//IMPORT THE ACTION
import { register } from "../../actions/trelloActions";

const Register = ({ trello: { isAuthenticated }, register }: any) => {
  const history = useHistory();
  if (isAuthenticated) {
    history.push("/");
  }

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = user;

  const onchange = (e: any) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      console.log("Please enter all fields");
    } else if (password !== confirmPassword) {
      console.log("Passwords dont match");
    } else if (password.length < 6 || confirmPassword.length < 6) {
      console.log("Password must be 6 or more characters");
    } else {
      register({
        name,
        email,
        password,
      });
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1>
          Account <span className="text-primary">Register</span>
        </h1>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={onchange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Email</label>
            <input
              type="email"
              name="email"
              required
              value={email}
              onChange={onchange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Password</label>
            <input
              type="password"
              name="password"
              required
              value={password}
              onChange={onchange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              required
              value={confirmPassword}
              onChange={onchange}
            />
          </div>

          <div style={{ display: "flex" }}>
            <input
              type="submit"
              value="Login"
              className="btn btn-primary btn-block deep-purple lighten-2"
            />
            <p style={{ marginLeft: "15px" }}>
              Already have an account ? Press here to{" "}
              <Link to="/login">login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  trello: state.trello,
});

export default withRouter(connect(mapStateToProps, { register })(Register));
