import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { connect } from "react-redux";
//IMPORT THE ACTION
import { login } from "../../actions/trelloActions";

const Login = ({ trello: { isAuthenticated }, login }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, [isAuthenticated, history]);

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (email === "" || password === "") {
      return <h1>PLEASE ENTER FILEDA</h1>;
    }
    login({
      email,
      password,
    });
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1>
          Account <span className="text-primary">Login</span>
        </h1>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div style={{ display: "flex" }}>
            <input
              type="submit"
              value="Login"
              className="btn btn-primary btn-block deep-purple lighten-2"
            />
            <p style={{ marginLeft: "15px" }}>
              Dont have an account ? Press here to{" "}
              <Link to="/register">register</Link>
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

export default connect(mapStateToProps, { login })(Login);
