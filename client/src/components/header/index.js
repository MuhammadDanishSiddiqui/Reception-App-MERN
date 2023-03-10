import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between px-8 py-4 bg-blue-600">
      <div>
        <h1 className="text-white font-bold text-xl">Receptionist App</h1>
      </div>
      <div className="mt-2 sm:mt-0">
        <Link className="text-white text-lg mr-8" to={"/entry"}>
          Register
        </Link>
        <Link className="text-white text-lg" to={"/visitors"}>
          Visitors
        </Link>
      </div>
    </div>
  );
};

export default Header;
