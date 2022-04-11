import { Auth, Hub } from "aws-amplify";
import { useContext, createContext, useState, useEffect } from "react";
import { getPayload, mapUserDataFromPayload } from "../utils/userData";

const authContext = createContext({});

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export function useAuth() {
  return useContext(authContext);
}

function useProvideAuth() {
  const [userData, setUserData] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isFirstLogin, setIsFirstLogin] = useState(false);

  const signIn = async (email, password) => {
    try {
      const userSignIn = await Auth.signIn(email, password);

      let user = await Auth.currentSession();

      setUserData(mapUserDataFromPayload(getPayload(user)));

      setUser(user);
      setIsAuthenticated(true);

      return userSignIn;
    } catch (error) {
      if (error === "No current user") {
        return "No current user";
      }
      console.log(error);
    }
  };

  const signOut = () => {
    return Auth.signOut().then(() => {
      localStorage.clear();
      setUser(null);
      setUserData(null);
      setIsAuthenticated(false);
    });
  };

  const completePassword = async (newPassword) => {
    const userSignIn = await Auth.signIn(
      localStorage.getItem("email"),
      localStorage.getItem("password")
    );

    localStorage.clear();

    return Auth.completeNewPassword(userSignIn, newPassword);
  };

  const sendPasswordResetEmail = (email) => {
    return Auth.forgotPassword(email);
  };

  const recoveryNewPassword = (username, code, newPass) => {
    return Auth.forgotPasswordSubmit(username, code, newPass);
  };

  function hub() {
    Hub.listen("auth", (data) => {
      const { payload } = data;
      console.log({ payloadHub: payload });
    });
  }

  async function onLoad() {
    hub();
    try {
      let user = await Auth.currentSession();
      setUser(user);
      console.log(user);
      setUserData(mapUserDataFromPayload(getPayload(user)));
      setIsAuthenticated(true);
    } catch (e) {
      setUser(null);
      setIsAuthenticated(false);
    }

    setIsAuthenticating(false);
  }

  useEffect(() => {
    onLoad();
    hub();
  }, []);

  return {
    user,
    setUser,
    signIn,
    isAuthenticating,
    signOut,
    sendPasswordResetEmail,
    completePassword,
    isFirstLogin,
    setIsFirstLogin,
    isAuthenticated,
    setIsAuthenticated,
    userData,
    recoveryNewPassword,
  };
}
