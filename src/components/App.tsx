import React, { Component } from "react";
import { Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import Profile from "./Profile";
import Auth from "./Auth/Auth";
import Callback from "./Auth/Callback";
import Category from "./Admin/Category";
import "../css/App.css";
import AuthContext from "./AuthContext";
import PrivateRoute from "./PrivateRoute";
class App extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      auth: new Auth(props.history)
    };
  }
  render(): JSX.Element {
    const { auth } = this.state;
    return (
      <AuthContext.Provider value={auth}>
        <NavBar {...this.props} auth={auth} />
        <Route path="/" exact component={Home} auth={auth} />
        <Route
          path="/callback"
          exact
          render={props => <Callback auth={auth} {...props} />}
        />
        <PrivateRoute
          component={Profile}
          path="/profile"
          scopes={[]}
        />
        <PrivateRoute
          path="/category"
          component={Category}
          scopes={["read:category"]}
        />
      </ AuthContext.Provider>
    );
  }
}

export default App;
