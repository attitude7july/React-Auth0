import React, { Component } from "react";
import { Link } from "react-router-dom";
class NavBar extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }
  render(): JSX.Element {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">
            Restaurant
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  Home <span className="sr-only">(current)</span>
                </Link>
              </li>
              {this.props.auth.isAuthenticated() ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/category">
                      Category
                    </Link>
                  </li>
                </>
              ) : null}
            </ul>
            <div className="form-inline my-2 my-lg-0">
              {this.props.auth.isAuthenticated() ? (
                <button
                  className="btn btn-warning"
                  type="button"
                  onClick={this.props.auth.logout}
                >
                  Log Out
                </button>
              ) : (
                  <button
                    className="btn btn-success"
                    onClick={this.props.auth.login}
                    type="button"
                  >
                    Log In
                </button>
                )}
            </div>
          </div>
        </nav>
      </>
    );
  }
}

export default NavBar;
