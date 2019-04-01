import React, { Component } from "react";

class Category extends Component<any, any> {
  state = {
    categories: [],
    error: ""
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
      .then(response => this.setState({ categories: response.categories }))
      .catch(error => this.setState({ error: error.message }));
  }
  // tslint:disable-next-line:typedef
  render() {
    return <div>{this.state.categories.map((category) => { return <p key={category.id}>{category.title}</p> })}</div>;
  }
}
export default Category;
