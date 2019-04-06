import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import AuthContext from "./AuthContext";
import { render } from "react-dom";
// tslint:disable-next-line: typedef
function PrivateRoute({ component: Component, scopes, ...rest }) {
    return (
        <AuthContext.Consumer>
            {auth => (
                <Route
                    {...rest}
                    exact
                    render={props => {
                        // 1 Redirect to login if not logged in.
                        if (!auth.isAuthenticated()) {
                            auth.login();
                        }
                        // 2 Display message if user lacks required scopes.
                        if (scopes.length > 0 && !auth.userHasScopes(scopes)) {
                            return (<h1>
                                Unauthorized - You need following scope(s) to view this page :{" "}
                                {scopes.join(",")}
                            </h1>);
                        }
                        // 3. Render Component
                        return <Component auth={auth} {...props} />;
                    }}
                />
            )
            }
        </AuthContext.Consumer>
    );
}
PrivateRoute.propTypes = {
    component: PropTypes.any.isRequired,
    scopes: PropTypes.array
};
PrivateRoute.defaultProps = {
    scopes: []
};
export default PrivateRoute;