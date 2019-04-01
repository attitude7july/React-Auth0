import auth0 from "auth0-js";

export default class Auth {

  history: any;
  auth0: auth0.WebAuth;
  userProfile: any;
  requiredScope: any = "openid profile email read:categories";
  constructor(history: any) {
    this.history = history;
    this.auth0 = new auth0.WebAuth({
      domain: `${process.env.REACT_APP_AUTH0_DOMAIN}`,
      clientID: `${process.env.REACT_APP_AUTH0_CLIENT_ID}`,
      redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
      responseType: process.env.REACT_APP_AUTH0_RESPONSE_TYPE,
      scope: this.requiredScope,
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    });
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
        alert(`Error: ${err.error}.Check the console for further details.`);
        console.log(err);
      }
    });
  }
  setSession = (authResult: any) => {

    console.log(authResult);
    // set the time that the access token will expire
    let expiresAt: number = authResult.expiresIn * 1000 + new Date().getTime();
    let scope: string = authResult.scope || this.requiredScope || "";
    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt));
    localStorage.setItem("scopes", JSON.stringify(scope));
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
    localStorage.removeItem("scopes");
    this.userProfile = null;
    this.auth0.logout({
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      returnTo: process.env.REACT_APP_AUTH0_RETURN_URL,
    });
  }
  getAccessToken = () => {
    // tslint:disable-next-line: typedef
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      throw new Error("No access token found");
    }
    return accessToken;
  }
  getIdToken = () => {
    // tslint:disable-next-line: typedef
    const idToken = localStorage.getItem("id_token");
    if (!idToken) {
      throw new Error("No id token found");
    }
    return idToken;
  }
  getProfile = (cb: any) => {
    if (this.userProfile) {
      return cb(this.userProfile);
    }
    this.auth0.client.userInfo(this.getAccessToken(), (err, profile) => {
      if (profile) {
        this.userProfile = profile;
      }
      cb(profile, err);
    });
  }
  // tslint:disable-next-line:typedef
  userHasScopes(scopes: string[]) {
    let grantScopes: string[] = (JSON.parse(localStorage.getItem("scopes")) || "").split(" ");
    let result: boolean = scopes.every(scope => grantScopes.includes(scope));
    console.log(result);
    return result;
  }
}
