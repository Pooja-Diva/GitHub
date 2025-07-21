import React, { useEffect } from "react";
import {useNavigate, useRoutes} from 'react-router-dom'

// Pages List
import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/user/Profile";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

// Auth Context
import { useAuth } from "./authContext";

const ProjectRoutes = ()=>{
    const {currentUser, setCurrentUser} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
  const userIdFromStorage = localStorage.getItem("userId");

  if (userIdFromStorage && !currentUser) {
    setCurrentUser(userIdFromStorage);
  }

  //  Only redirect if not on /auth or /signup
  if (
    !userIdFromStorage &&
    !["/auth", "/signup"].includes(window.location.pathname)
  ) {
    navigate("/auth");
  }

  //  Redirect to home if already logged in and on auth/signup page
  if (
    userIdFromStorage &&
    ["/auth", "/signup"].includes(window.location.pathname)
  ) {
    navigate("/");
  }
}, [currentUser, navigate, setCurrentUser]);


    let element = useRoutes([
        {
            path:"/",
            element:<Dashboard/>
        },
        {
            path:"/auth",
            element:<Login/>
        },
        {
            path:"/signup",
            element:<Signup/>
        },
        {
            path:"/profile",
            element:<Profile/>
        }
    ]);

    return element;
}

export default ProjectRoutes;