import { Link } from "react-router-dom";
import Logo from "./assets/jobizz.png";
export default function Header() {
  return (
    <div>
      <header className="p-4  text-gray-800">
        <div className="container flex justify-between h-16 mx-auto">
          {/* <Logo></Logo> */}
          <a
            rel="noopener noreferrer"
            href="#"
            aria-label="Back to homepage"
            className="flex items-center p-2"
          >
            <img src={Logo} className="h-8 rounded-3xl mr-3 w-8"></img>
            Jobizz
          </a>
          <ul className="items-stretch hidden space-x-3 md:flex">
            <li className="flex">
              <Link
                to="/mainpage"
                className="flex items-center px-4 -mb-1 border-b-2 border-transparent"
              >
                About Us
              </Link>
            </li>
            <li className="flex">
              <Link
                to="/loginpage"
                className="flex items-center px-4 -mb-1 border-b-2 border-transparent"
              >
                Log In
              </Link>
            </li>
            <li className="flex">
              <Link
                to="/signUpPage"
                className="flex items-center px-4 -mb-1 border-b-2 border-transparent text-default-600 border-default-600"
              >
                Sign Up
              </Link>
            </li>
            <li className="flex">
              <Link
                to="/"
                className="flex items-center px-4 -mb-1 border-b-2 border-transparent"
              >
                Home
              </Link>
            </li>
          </ul>
          <button className="flex justify-end p-4 md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </header>
    </div>
  );
}
