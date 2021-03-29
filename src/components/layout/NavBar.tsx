import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import { logout } from "../../actions/trelloActions";

const NavBar = ({ trello: { isAuthenticated }, logout }) => {
  const signOut = () => {
    logout();
  };

  return (
    <Fragment>
      <nav>
        <div className="nav-wrapper  deep-purple darken-1">
          <Link to="/" className="brand-logo" style={{ marginLeft: "15px" }}>
            Trello
          </Link>
          {!isAuthenticated ? (
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          ) : (
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <a href="#" onClick={signOut}>
                  LOGOUT
                </a>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </Fragment>
  );
};
const mapStateToProps = (state: any) => ({
  trello: state.trello,
});

export default connect(mapStateToProps, { logout })(NavBar);
