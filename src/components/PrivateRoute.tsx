import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
// tslint:disable-next-line: typedef
export function PrivateRoute({ component: Component, auth, scopes, ...rest }) {
    return (<Route {...rest} render={props => {
        // 1 Redirect to login if not logged in.
        if (!auth.isAuthenticated()) {
            return auth.login();
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
    }} />);
}
PrivateRoute.propTypes = {
    component: PropTypes.any.isRequired,
    auth: PropTypes.object.isRequired,
    scopes: PropTypes.array
};
PrivateRoute.defaultProps = {
    scopes: []
};
export default PrivateRoute;