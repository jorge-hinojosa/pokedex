import React from "react";
import { HashRouter as Router, Link } from "react-router-dom";
import routes from "./routes";

function App(): JSX.Element {
  return (
    <Router>
      <div className="flex flex-col align-center min-h-screen bg-gray-100 font-robo">
        <header>
          <nav className="w-full h-10 bg-blue-800 shadow-md flex flex-row justify-center items-center z-10 fixed top-0">
            <div className="w-11/12 border-black flex flex-row justify-between items-center">
              <Link to="/">
                <img
                  src="https://image.flaticon.com/icons/svg/528/528101.svg"
                  alt="Pokeball"
                  className="w-6"
                />
              </Link>
              <i className="material-icons text-gray-200">menu</i>
            </div>
          </nav>
        </header>
        <section />
        {routes}
      </div>
    </Router>
  );
}

export default App;
