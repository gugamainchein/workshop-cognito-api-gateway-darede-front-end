import { AuthProvider } from "./context/amplify";
import Router from "./routes/Router";
import "./App.less";

import packageJson from "../package.json";

const version = localStorage.getItem("version");

if (version !== packageJson.version) {
  if ("caches" in window) {
    caches.keys().then((names) => {
      names.forEach((name) => {
        caches.delete(name);
      });
    });

    window.location.reload();
  }

  localStorage.clear();
  localStorage.setItem("version", packageJson.version);
}

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;
