import PropTypes from "prop-types";
import { IoMdClose } from "react-icons/io";
import { useEffect } from "react";
import {PiShrimpFill} from "react-icons/pi";

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-color-4/40 flex justify-center items-center z-50">
      <div className="bg-black rounded-2xl w-[600px] h-[600px] relative">
        <div className="w-full h-12 flex justify-center items-center">
          <button className="absolute top-4 left-4" onClick={onClose}>
            <div className="transition-colors rounded-full hover:bg-white/10 p-2 -ml-2 -mt-2">
              <IoMdClose size={22} />
            </div>
          </button>
          <PiShrimpFill size={36} className='mt-3'/>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
