import NavItem from "./NavItem.jsx";
import {GoHomeFill, GoMail, GoPeople, GoPerson, GoSearch} from "react-icons/go";
import { PiShrimpFill } from "react-icons/pi";

const Navbar = () => {
  return (
    <div className="max-w-[565px] xl:pr-16 items-end xl:items-start flex-grow flex flex-col gap-2 px-2 ">
      <NavItem logo={<PiShrimpFill size={32} />} href={"feed"} />
      <NavItem logo={<GoHomeFill size={28}/>} text={"Feed"} href={'feed'}/>
      <NavItem logo={<GoSearch size={28}/>} text={"Explore"} href={'explore'}/>
      <NavItem logo={<GoMail size={28}/>} text={"Messages"} href={'messages'}/>
      <NavItem logo={<GoPeople size={28}/>} text={"Communities"} href={'communities'}/>
      <NavItem logo={<GoPerson size={28}/>} text={"Profile"} href={'profile'}/>

    </div>
  );
};

export default Navbar;
