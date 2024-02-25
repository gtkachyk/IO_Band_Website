import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import Music from "./routes/music"
import Video from "./routes/video";
import About from "./routes/about";
import Album, {loader as albumLoader} from "./routes/album";
import {loader as rootLoader} from "./routes/music";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "music",
    element: <Music />,
    // loader: rootLoader,
  },
  {
    path: "video",
    element: <Video />,
  },
  {
    path: "about",
    element: <About />,
  },
  {
    path: "music/:albumId",
    element: <Album />,
    loader: albumLoader
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);