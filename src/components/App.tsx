import React, { Component } from "react";
import { Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import Profile from "./Profile";
import Auth from "./Auth/Auth";
import Callback from "./Auth/Callback";
import "../css/App.css";

class App extends Component {
  auth: Auth;
  constructor(props: any) {
    super(props);
    this.auth = new Auth(props.history);
  }
  render(): JSX.Element {
    return (
      <>
        <NavBar auth={this.auth} {...this.props} />
        <Route path="/" exact component={Home} />
        <Route
          path="/callback"
          exact
          render={props => <Callback auth={this.auth} {...props} />}
        />
        <Route path="/profile" exact component={Profile} />
      </>
    );
  }
}

export default App;
