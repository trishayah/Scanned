import React from 'react';
import Logo from "./assets/logo3 (1).svg";

const Header = () => {
  return (
    <header className="bg-teal-600 text-white fixed top-0 left-0 w-full z-50 shadow-lg">
      <div className="flex items-center px-4 py-2">
        <img
          src={Logo} // Replace with the path to your logo
          alt=" Logo"
          className="h-12 w-12 mr-3"
        />
        <div>
          <h1 className="text-2xl font-bold"><em>Scanned</em></h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
