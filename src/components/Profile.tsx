import React, { Component } from "react";

export default class Profile extends Component<any, any> {
  state = {
    profile: null,
    error: ""
  };
  // tslint:disable-next-line:typedef
  componentDidMount() {

    this.loadUserProfile();
  }
  loadUserProfile = () => {
    this.props.auth.getProfile((profile: any, error: any) =>
      this.setState({ profile, error }));
  }
  // tslint:disable-next-line:typedef
  render() {
    const { profile } = this.state;
    if (!profile) { return null; }
    return (
      <>
      <h1>Profile </h1>
      <img src={profile.picture}
       alt="author" style={{width:50, height:50}} />
      {profile.nickname}
      {profile.email}
      <pre>{JSON.stringify(profile)}</pre>
      </>
    );
  }
}
