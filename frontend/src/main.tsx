import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home.tsx'
import RoleSelector from './pages/Role_Selector.tsx';
import SignIn from './pages/SignIn_Page.tsx';
import Camera from './pages/Camera.tsx'
import './index.css'
import CaptureCorner from './pages/CaptureCorner.tsx';
import Guiding from './pages/Guiding.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/select-role",
    element: <RoleSelector />,
  },
  {
    path: "/capture-corner/:id",
    element: <CaptureCorner />
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/capture-corner",
    element: <Camera />,
  },
  {
    path: "/guiding",
    element: <Guiding />,
  },
  
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
