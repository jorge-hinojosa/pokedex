import React from "react";
import { Link } from "react-router-dom";

export default function Menu(props: any): JSX.Element {
  const toggleMenu = () => {
    !props.menuOpen ? props.setMenuOpen(true) : props.setMenuOpen(false);
  };
  return (
    <div>
      <i
        className="material-icons text-gray-200 mt-2 static md:hover:text-gray-700 cursor-pointer"
        onClick={() => toggleMenu()}
      >
        menu
      </i>

      {!props.menuOpen ? null : (
        <div className="bg-gray-700 shadow w-48 my-2 text-gray-200 absolute top-0 right-0 mt-10">
          <ul className="list-reset">
            <Link to="/" onClick={() => toggleMenu()}>
              <li className="block p-4 font-bold hover:bg-gray-600 hover:border-red-500 border-r-4">
                Home
              </li>
            </Link>
            <Link to='/pokemon' onClick={() => toggleMenu()}>
              <li className="block p-4 font-bold hover:bg-gray-600 hover:border-red-500 border-r-4">
                  View All Pokemon
              </li>
            </Link>
            <Link to="/party" onClick={() => toggleMenu()}>
              <li className="block p-4 font-bold hover:bg-gray-600 hover:border-red-500 border-r-4">
                My Party
              </li>
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
}
