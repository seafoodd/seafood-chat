import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Feed from "./pages/Feed.jsx";
import Explore from "./pages/Explore.jsx";
import Messages from "./pages/Messages.jsx";
import Communities from "./pages/Communities.jsx";
import Profile from "./pages/Profile.jsx";
import CurrentPost from "./pages/CurrentPost.jsx";

const router = createBrowserRouter(
  [
    {
      path: "",
      element: <App />,
      children: [
        { path: "", element: <Feed /> },
        { path: "/feed", element: <Feed /> },
        { path: "/explore", element: <Explore /> },
        { path: "/messages", element: <Messages /> },
        { path: "/communities", element: <Communities /> },
        { path: "/profile", element: <Profile /> },
        { path: "/status/:id", element: <CurrentPost /> },
      ],
    },
  ],
  {
    basename: "/seafood-chat",
  },
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
