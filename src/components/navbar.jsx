import { MenuIcon } from "@heroicons/react/outline";
import Button from "./button";
import Divider from "./divider";
import Search from "./search";
import logo from "../assets/images/unsplash-logo.svg";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center gap-4 py-3">
      <Link to="/">
        <div className="w-11 h-11 cursor-pointer">
          <img src={logo} alt="unsplash-logo" className="w-full h-full" />
        </div>
      </Link>
      <Search variant="navbar" />
      <div className="hidden md:flex gap-4 items-center">
        <div className="flex items-center">
          <Button variant="clean">Explore</Button>
          <Button variant="clean">Avertise</Button>
          <Button variant="clean">Blog</Button>
        </div>
        <Divider />
        <div className="flex items-center">
          <Button variant="clean">Log in</Button>
          <div className="w-[1px] h-4 bg-neutral-400 rotate-[15deg] mx-1"></div>
          <Button variant="clean">Sign up</Button>
        </div>
        <Button variant="normal">Submit a photo</Button>
      </div>
      <MenuIcon className="w-6 h-6 cursor-pointer hover:text-neutral-800" />
    </nav>
  );
};

export default Navbar;
