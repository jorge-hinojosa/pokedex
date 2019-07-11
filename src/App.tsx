import React from "react";
import { HashRouter as Router } from "react-router-dom";
import routes from "./routes";
import Header from "./components/Header";

function App(): JSX.Element {
  return (
    <Router>
      <div className="flex flex-col align-center min-h-screen bg-gray-100 font-robo">
        <Header />
        {routes}
      </div>
    </Router>
  );
}

export default App;
