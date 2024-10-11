import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const NavItem = ({ logo, text, href }) => {
  return (
    <NavLink
      className={({ isActive, isPending }) =>
        isPending ? "pending" : isActive ? "font-semibold" : ""
      }
      to={href}
    >
      <div className={`flex gap-4 hover:bg-white/10 p-4 ${text && 'xl:py-3'} transition-colors rounded-full max-w-fit
      items-center`}>
        {logo}
        {text && <h2 className='hidden text-[22px] xl:flex'>{text}</h2>}
      </div>
    </NavLink>
  );
};

NavItem.propTypes = {
  logo: PropTypes.node,
  text: PropTypes.string,
  href: PropTypes.string.isRequired,
}

export default NavItem;
