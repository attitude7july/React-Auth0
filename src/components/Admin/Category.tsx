import React, { Component } from "react";

class Category extends Component<any, any> {
  state = {
    message: "",
  };
  // tslint:disable-next-line:typedef
  componentDidMount() {
    fetch("/category", {
      headers: { Authorization: `Bearer ${this.props.auth.getIdToken()}` },
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not Ok.");
      })
      .then(response => this.setState({ message: response.message }))
      .catch(error => this.setState({ message: error.message }));
  }
  // tslint:disable-next-line:typedef
  render() {
    return <div>{this.state.message}</div>;
  }
}
export default Category;
