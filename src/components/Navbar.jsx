import NavItem from "./NavItem.jsx";
import { GoHome, GoMail, GoPeople, GoPerson, GoSearch } from "react-icons/go";
import { PiShrimpFill } from "react-icons/pi";

const Navbar = () => {
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
    </div>
  );
};

export default Navbar;
