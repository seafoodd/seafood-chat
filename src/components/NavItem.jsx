import { NavLink } from "react-router-dom";

const NavItem = ({ logo, text, href }) => {
  return (
    <NavLink
      className={({ isActive, isPending }) =>
        isPending ? "pending" : isActive ? "font-semibold" : ""
      }
      to={href}
    >
      <div className={`flex gap-4 hover:bg-white/10 py-4 xl:py-3 px-4 transition-colors rounded-full max-w-fit
      items-center`}>
        {logo}
        {text && <h2 className='hidden text-[22px] xl:flex'>{text}</h2>}
      </div>
    </NavLink>
  );
};

export default NavItem;
