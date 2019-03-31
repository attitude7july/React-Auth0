import auth0 from "auth0-js";

export default class Auth {
  history: any;
  auth0: auth0.WebAuth;
  constructor(history: any) {
    this.history = history;
    this.auth0 = new auth0.WebAuth({
      domain: `${process.env.REACT_APP_AUTH0_DOMAIN}`,
      clientID: `${process.env.REACT_APP_AUTH0_CLIENT_ID}`,
      redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
      responseType: process.env.REACT_APP_AUTH0_RESPONSE_TYPE,
      scope: process.env.REACT_APP_AUTH0_SCOPE,
    });
    console.log(this.auth0);
  }
  login = () => {
    this.auth0.authorize();
  }
  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.history.push("/");
      } else if (err) {
        this.history.push("/home");
        alert(`Error:${err.error}. Check the console for further details.`);
        console.log(err);
      }
    });
  }
  setSession = (authResult: any) => {
    console.log(authResult);
    // set the time that the access token will expire
    let expiresAt: number = authResult.expiresIn * 1000 + new Date().getTime();

    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt));
  }
  isAuthenticated = () => {
    let expiresAt: number = JSON.parse(
      localStorage.getItem("expires_at") || "1"
    );
    return new Date().getTime() < expiresAt;
  }
  logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.clear();
    this.auth0.logout({
      clientID: `${process.env.REACT_APP_AUTH0_CLIENT_ID}`,
      returnTo: process.env.REACT_APP_AUTH0_RETURN_URL
    });
  }
}
