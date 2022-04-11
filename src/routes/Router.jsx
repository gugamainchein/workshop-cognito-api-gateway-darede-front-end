import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import React from "react";
import { Login } from "../pages/Login";
import { useAuth } from "../context/amplify";
import { Loading } from "../pages/Loading";
import { ForgotPassword } from "../pages/ForgotPassword";
import { CodeVerification } from "../pages/CodeVerification";
import { FirstLoginConfirm } from "../pages/FirstLoginConfirm";
import { Home } from "../pages/Home";

function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();

  if (auth.isAuthenticating) {
    return <Loading />;
  }

  if (auth.isAuthenticating === false && !auth.isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
}

function PublicPath({ children }) {
  let auth = useAuth();
  let location = useLocation();

  if (auth.isAuthenticating === true && !auth.isAuthenticated) {
    return <Loading />;
  }

  if (auth.isAuthenticating === true && auth.isAuthenticated) {
    return <Navigate to="/dashboard" state={{ from: location }} />;
  }

  return children;
}

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          element={
            <PublicPath>
              <Login />
            </PublicPath>
          }
        />
        <Route
          path="/recuperar-senha"
          element={
            <PublicPath>
              <ForgotPassword />
            </PublicPath>
          }
        />
        <Route
          path="/verificarcodigo"
          element={
            <PublicPath>
              <CodeVerification />
            </PublicPath>
          }
        />
        <Route
          path="/primeirologin"
          element={
            <PublicPath>
              <FirstLoginConfirm />
            </PublicPath>
          }
        />
        <Route
          path="/home"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
