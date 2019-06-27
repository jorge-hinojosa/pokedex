import React from "react";
import Home from "./components/Home";

function App() {
  return (
    <div className="flex flex-col align-center min-h-screen bg-gray-100 font-robo">
      <header>
        <nav className="w-full h-10 bg-blue-800 shadow-md flex flex-row justify-center items-center z-10 fixed top-0">
          <div className="w-11/12 border-black flex flex-row justify-between items-center">
            {/* <h1 className="text-white font-bold">Pokemon</h1> */}
            <img
              src="https://image.flaticon.com/icons/svg/528/528101.svg"
              alt="Pokeball"
              className="w-6"
            />
            {/* <span>HAM</span> */}
          </div>
        </nav>
      </header>
      <section>
        <Home />
      </section>
    </div>
  );
}

export default App;
