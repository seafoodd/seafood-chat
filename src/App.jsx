import "./App.css";
import Container from "./components/Container.jsx";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

function App() {
  const location = useLocation();
  const isAuth = location.pathname === "/auth";

  return (
    <>
      <Container>
        {isAuth ? (
          <div>
            <Outlet />
          </div>
        ) : (
          <>
            <Navbar />
            <div className="border-x-[1px] border-blue-100/20 w-[600px]">
              <Outlet />
            </div>
            <div className="w-[30%]"></div>
          </>
        )}
      </Container>
    </>
  );
}

export default App;
