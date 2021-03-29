import { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//REDUXS STUFF
import { Provider } from "react-redux";
import store from "./store";

import "./App.css";
import M from "materialize-css";

import NavBar from "./components/layout/NavBar";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import About from "./components/pages/About";

function App() {
  useEffect(() => {
    M.AutoInit();
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <NavBar />

          <Switch>
            <Route exact path="/" component={Home} />

            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/about" component={About} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
