import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { FiMoreHorizontal } from "react-icons/fi";

const Dropdown = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="btn text-white/50 hover:text-color-1
        hover:bg-color-1/10 p-2 -mt-1 -mr-2 rounded-full"
      >
        <FiMoreHorizontal size={20} />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 shadow-dropdown bg-black rounded-xl z-10 overflow-hidden">
          <ul className="w-full flex-col">
            {options.map((option, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-white/5 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  option.onClick();
                  setIsOpen(false);
                }}
              >
                <div className="flex items-center font-bold text-[15px]">
                  {option.icon && <span className="mr-3">{option.icon}</span>}
                  {option.label}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
      icon: PropTypes.element,
    }),
  ).isRequired,
};

export default Dropdown;
