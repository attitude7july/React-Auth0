import React, { Component } from "react";

export default class Callback extends Component<any, any> {
  // tslint:disable-next-line:typedef
  componentDidMount() {
    if (/access_token|id_token|error/.test(this.props.location.hash)) {
      this.props.auth.handleAuthentication();
    } else {
      throw new Error("Invalid Callback URL.");
    }
  }
  render(): JSX.Element {
    return (
      <>
        <h1>...loading</h1>
      </>
    );
  }
}
