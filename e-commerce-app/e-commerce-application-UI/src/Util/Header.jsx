import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser } from '@fortawesome/free-solid-svg-icons'; // Solid style icons
// import { faUser as faUserRegular } from '@fortawesome/free-regular-svg-icons';
import { IoMdLogIn } from "react-icons/io";
import { SlOptionsVertical } from "react-icons/sl";
import { FaRegUserCircle } from "react-icons/fa";
import Seller from "../Assets/becomeaseller.png";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { MdAddToPhotos } from "react-icons/md";
import { useAuth } from "../auth/AuthProvider";
import Logout from "../Public/Logout";

// const user = {
//   userId: "123",
//   userName: "akshaya",
//   accessexpiration: 3600,
//   refreshexpiration: 1296000,
//   authenticated: false,
//   role: "SELLER"
// };
// const Logout = () => {
//   try {
//     // Send registration request to the backend server
//     const response = axios.post(
//       "http://localhost:8080/api/vl/logout",
//       {},
//       {
//         headers: { "Content-Type": "application/json" },
//         withCredentials: "true"
//       }
//     );  
//     alert(response);
//     navigate("/");
//     window.location.reload();
//   } catch (error) {
//     console.error("Message:", error);
//   }
// };

const Header = () => {
  const {user}=useAuth();
  //console.log(user);
  const { userRole, authenticated, username } = user;
  return (
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
        {authenticated && userRole == "CUSTOMER" ? (
          <div class="relative group flex items-center space-x-4">
            <HeaderLink
              icon={<FaRegUserCircle />}
              name={username}
              to={"/user"}
            ></HeaderLink>
            <HeaderLink
              icon={<FaShoppingCart />}
              name={"Cart"}
              to={"/cart"}
            ></HeaderLink>
            <HeaderLink
              icon={<FaRegHeart />}
              name={"WishList"}
              to={"/wishlist"}
            ></HeaderLink>
          </div>
        ) : authenticated && userRole == "SELLER" ? (
          <div class="relative group flex items-center space-x-4">
            <HeaderLink
              icon={<FaRegUserCircle />}
              name={userName}
              to={"/user"}
            ></HeaderLink>
            <HeaderLink
              icon={<MdAddToPhotos />}
              name={"AddProducts"}
              to={"/add"}
            ></HeaderLink>
          </div>
        ) : (
          !authenticated && (
            <div className="flex items-center space-x-2">
              <div class="relative group">
                <Link
                  to="/login"
                  class="flex items-center px-2 py-1 rounded-md hover:bg-gray-100 text-gray-700 group-hover:text-gray-900"
                >
                  <IoMdLogIn alt="Login" class="h-5 w-5 mr-2" />

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
                      <Link to="/customer/register" class="text-sm">
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
              <div className="w-16"></div>
              <div class="relative group">
                <Link
                  to="/seller/register"
                  className="hover:text-gray-900 flex items-center"
                >
                  <img src={Seller} alt="Become a Seller" className="h-5 w-5 mr-2" />
                  <h1 className="font-semibold text-lg">Become a Seller</h1>
                </Link>
              </div>
            </div>
          )
        )}
        <div className="w-16"></div>
        <div class="relative group">
          <Link
            to="/options"
            class="flex items-center px-2 py-1 rounded-md hover:bg-gray-100 text-gray-700 group-hover:text-gray-900"
          >
            <SlOptionsVertical alt="Options" class="h-5 w-5 mr-2" />
          </Link>
          <div class="absolute hidden top-full right-0 w-40 overflow-hidden rounded-md shadow-md group-hover:block z-50">
            <ul class="py-1 bg-sky-400">
              <li class="block px-4 py-2 hover:bg-gray-100">
                <Link to="https://www.flipkart.com/helpcentre" class="text-sm">
                  24*7 customer care
                </Link>
              </li>
              <li class="block px-4 py-2 hover:bg-gray-100">
                <Link to="https://www.flipkart.com/helpcentre" class="text-sm">
                  About us
                </Link>
              </li>
              <li class="block px-4 py-2 hover:bg-gray-100">
                      <Link onClick={Logout} class="text-sm">
                        Logout
                      </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;

const HeaderLink = ({ icon, name, to }) => {
  return (
    <Link to={to} className="hover:text-gray-900 flex items-center">
      <div className="h-5 w-5 mt-2 mr-1">{icon}</div>
      <h1 className="font-semibold text-lg">{name}</h1>
    </Link>
  );
};

