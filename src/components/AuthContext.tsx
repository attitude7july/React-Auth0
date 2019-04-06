import React from "react";
import { any, object } from "prop-types";
import Auth from "./Auth/Auth";

// tslint:disable-next-line:typedef
const AuthContext = React.createContext<Auth>(null);
export default AuthContext;

