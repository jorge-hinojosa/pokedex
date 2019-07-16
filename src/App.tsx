import React from "react";
import routes from "./routes";
import Header from "./components/Header";

function App(): JSX.Element {
  return (
      <div className="flex flex-col align-center min-h-screen bg-gray-100 font-robo">
        <Header />
        {routes}
      </div>
  );
}

export default App;
