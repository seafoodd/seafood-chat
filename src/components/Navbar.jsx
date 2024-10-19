import NavItem from "./NavItem.jsx";
import { GoHome, GoMail, GoPeople, GoPerson, GoSearch } from "react-icons/go";
import { PiShrimpFill } from "react-icons/pi";
import {useSelector} from "react-redux";
import Button from "./Button.jsx";
import PropTypes from "prop-types";

const Navbar = ({onSignOut}) => {

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="sticky left-0 top-0 max-w-[565px] h-[100vh] items-end xl:items-start flex-grow flex flex-1 flex-col gap-2 px-2">
      {/*TODO: Maybe add logos that are filled when the tab is active*/}
      <NavItem logo={<PiShrimpFill size={32} />} href={"feed"} />
      <NavItem logo={<GoHome size={28} />} text={"Feed"} href={"feed"} />
      <NavItem
        logo={<GoSearch size={28} />}
        text={"Explore"}
        href={"explore"}
      />
      <NavItem
        logo={<GoMail size={28} />}
        text={"Messages"}
        href={"messages"}
      />
      <NavItem
        logo={<GoPeople size={28} />}
        text={"Communities"}
        href={"communities"}
      />
      <NavItem
        logo={<GoPerson size={28} />}
        text={"Profile"}
        href={"/seafood"}
      />
      {isAuthenticated && (
        <Button
          text="Sign Out"
          onClick={onSignOut}
          className="lg:ml-4 mt-auto mb-8 bg-white hover:bg-white/90 text-black font-bold"
        />
      )}
    </div>
  );
};

Navbar.propTypes = {
  onSignOut: PropTypes.func
}

export default Navbar;
