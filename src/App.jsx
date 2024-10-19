import "./App.css";
import Container from "./components/Container.jsx";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import { useSelector } from "react-redux";
import { useState } from "react";
import Modal from "./components/Modal.jsx";
import Auth from "./pages/Auth.jsx";
import Button from "./components/Button.jsx";
import {useDispatch} from "react-redux";
import {logout} from "./features/auth/authSlice.js";

function App() {
  const location = useLocation();
  const removeNavbar = location.pathname === "/auth";
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialIsRegister, setInitialIsRegister] = useState(true);

  const handleSignOut = () => {
    window.location.reload();
    dispatch(logout());
  };
  const openModal = (isRegister) => {
    setInitialIsRegister(isRegister);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      <Container>
        {removeNavbar ? (
          <div>
            <Outlet />
          </div>
        ) : (
          <>
            <Navbar onSignOut={handleSignOut}/>
            <div className="border-x-[1px] border-blue-100/20 w-[600px]">
              <Outlet />
            </div>
            <div className="w-[30%]"></div>
          </>
        )}
      </Container>
      {!isAuthenticated && !removeNavbar && (
        <div className="h-[72px] bg-color-1 fixed left-0 bottom-0 w-full flex justify-center items-center">
          <div className="my-3 font-normal text-[18px] flex justify-center gap-72 items-center">
            <div className='text-start hidden md:block'>
              <h1 className='font-bold text-[23px]'>Don&apos;t miss what&apos;s happening</h1>
              <h2 className='font-light text-[15px]'>People on SeafoodChat are first to know.</h2>
            </div>
            <div className='flex gap-4 my-2'>
              <Button
                text="Sign Up"
                onClick={() => openModal(true)}
                className="w-32 sm:w-56 md:w-auto font-bold hover:bg-white/5 text-white border-[1px] border-white/50"
              />
              <Button
                text="Log In"
                onClick={() => openModal(false)}
                className="w-32 sm:w-56 md:w-auto bg-white hover:bg-white/90 text-black font-bold border-[1px] border-white/50"
              />
            </div>
          </div>
        </div>
      )}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <Auth initialIsRegister={initialIsRegister} />
      </Modal>
    </>
  );
}

export default App;
