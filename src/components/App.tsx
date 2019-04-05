import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import Profile from "./Profile";
import Auth from "./Auth/Auth";
import Callback from "./Auth/Callback";
import Category from "./Admin/Category";
import "../css/App.css";
import PrivateRoute from "./PrivateRoute";
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
        <PrivateRoute
          component={Profile}
          auth={this.auth}
          path="/profile"
          scopes={[]}
        />
        <PrivateRoute
          path="/category"
          component={Category}
          auth={this.auth}
          scopes={["read:category"]}
        />
      </>
    );
  }
}

export default App;
