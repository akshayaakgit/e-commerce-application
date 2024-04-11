import React from "react";
import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser } from '@fortawesome/free-solid-svg-icons'; // Solid style icons
// import { faUser as faUserRegular } from '@fortawesome/free-regular-svg-icons';
import LoginIcon from "../Assets/loginlogo.png";
import Seller from "../Assets/becomeaseller.png";
import Register from "../Assets/register.png";
import Option from "../Assets/options.png";

const Header = () => {
  return (
    // <div className='flex item-center justify-around bg-blue-900 text-slate-100'>
    //   <Link to={"/home"}>Logo</Link>
    //   <Link to={"/login"}>Login</Link>
    //   <Link to={"/register"}>Register</Link>
    // </div>
    <header className="bg-gray-300 text-gray-700">
      <div className="container mx-auto py-4 flex justify-between items-center">
        <Link to="/">
          <div className="flex items-center space-x-4">
            <img
              src="https://img.icons8.com/color/48/000000/open-box.png"
              alt="Flipkart Logo"
              className="h-8"
            />
            <h1 className="font-semibold text-lg">E kart</h1>
          </div>
        </Link>
        <div className="w-16"></div> {/* Spacer */}
        <div className="flex-grow">
          <input
            type="text"
            placeholder="Search for products brands and more"
            className="bg-gray-200 px-2 py-1 rounded-full w-80 focus:outline-none focus:bg-white"
          />
        </div>
        <div className="flex items-center space-x-2">
          {/* <Link to="/login" className="hover:text-gray-900 flex items-center">
            <img src={LoginIcon} alt="Login" className="h-5 w-5" />
            <h1 className="font-semibold text-lg">Login</h1>
          </Link> */}
          <div class="relative group">
            <Link
              to="/login"
              class="flex items-center px-2 py-1 rounded-md hover:bg-gray-100 text-gray-700 group-hover:text-gray-900"
            >
              <img src={LoginIcon} alt="Login" class="h-5 w-5 mr-2" />
              <h1 className="font-semibold text-lg">Login</h1>
              <svg
                class="ml-2 h-4 w-4 fill-current"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.381 3.354a.216.216 0 00-.414 0L4.854 8.15a.216.216 0 00.293.387l4.498 4.499a.216.216 0 00.414-.387L16.181 7.74a.216.216 0 00-.293-.387z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </Link>
            <div class="absolute hidden top-full left-0 w-60 overflow-hidden rounded-md shadow-md group-hover:block z-50">
              <ul class="py-1 bg-sky-400">
                <li class="block px-4 py-2 hover:bg-gray-100">
                  <Link to="/register" class="text-sm">
                    New Customer?Sign Up
                  </Link>
                </li>
                <li class="block px-4 py-2 hover:bg-gray-100">
                  <Link to="/profile" class="text-sm">
                    Profile
                  </Link>
                </li>
                <li class="block px-4 py-2 hover:bg-gray-100">
                  <Link to="/settings" class="text-sm">
                    Settings
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="w-16"></div>
        <Link to="/register" className="hover:text-gray-900 flex items-center">
          <img src={Seller} alt="Become a Seller" className="h-5 w-5" />
          <h1 className="font-semibold text-lg">Become a Seller</h1>
        </Link>
        <div className="w-16"></div>
        <Link to="/register" className="hover:text-gray-900 flex items-center">
          <img src={Option} alt="Options" className="h-5 w-5" />
          {/* <h1 className="font-semibold text-lg">Register</h1> */}
        </Link>
      </div>
    </header>
  );
};

export default Header;
