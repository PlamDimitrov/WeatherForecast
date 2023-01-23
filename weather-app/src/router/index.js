// import React from 'react';
import { createBrowserRouter } from "react-router-dom";

import Forcast from '../components/Forcast/Forcast';

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>MainPage</div>,
    errorElement: <div>Page not found under development!</div>,
    children: [
      {
        path: "/:cityNameDashCityId",
        element: <Forcast />,
      },
    ],
  },
]);

export default router;