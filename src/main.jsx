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
import { Provider } from "react-redux";
import store from "./app/store.js";
import Auth from "./pages/Auth.jsx";

const router = createBrowserRouter(
  [
    {
      path: "",
      element: <App />,
      children: [
        { path: "", element: <Feed /> },
        { path: "/auth", element: <Auth /> },
        { path: "/feed", element: <Feed /> },
        { path: "/explore", element: <Explore /> },
        { path: "/messages", element: <Messages /> },
        { path: "/communities", element: <Communities /> },
        { path: "/:username", element: <Profile /> },
        { path: "/status/:id", element: <CurrentPost /> },
      ],
    },
  ],
  {
    basename: "/seafood-chat", // uncomment for github pages
    // basename: "/", // uncomment for nginx
  },
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
