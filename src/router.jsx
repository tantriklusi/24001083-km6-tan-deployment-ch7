import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Trending from "./componen/Trending";
import HomePage from "./componen/HomePage";
import Detail from "./componen/Detail";
import Detailhome from "./componen/Detailhome";
import OnAir from "./componen/OnAir";
import Discoveri from "./componen/Discoveri";
import Genres from "./componen/Genres";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginPage from "./componen/Login";
import Register from "./componen/Register";
import PeopleList from "./componen/People";
import GoogleLogin from "./componen/GoogleLogin";
import Authme from "./componen/authme";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/trending",
      element: <Trending />,
    },
    {
      path: "/people",
      element: <PeopleList />,
    },
    {
      path: "/detail",
      element: <Detail />,
    },
    {
      path: "/onair",
      element: <OnAir />,
    },
    {
      path: "/discover",
      element: <Discoveri />,
    },
    {
      path: "/genre",
      element: <Genres />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/detailhome",
      element: <Detailhome />,
    },
    {
      path: "/gogle",
      element: <GoogleLogin />,
    },
    {
      path: "/auth",
      element: <Authme />,
    },
  ]);

  return (
    <GoogleOAuthProvider clientId="344661882858-h613h0lo2pmn05uhl217t7ik4t7fi7uf.apps.googleusercontent.com">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  );
}
