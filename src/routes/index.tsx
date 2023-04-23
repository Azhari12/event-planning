import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { FC, useState, useMemo, useEffect } from "react";
import { ThemeContext } from "@/utils/context";
import axios from "axios";

import Home from "@/pages";
import Auth from "@/pages/Auth";
import DetailEvent from "@/pages/DetailEvent";
import CreateEvent from "@/pages/CreateEvent";
import MyEvents from "@/pages/MyEvents";
import DetailAttendingEvent from "@/pages/DetailAttendingEvent";

// axios.defaults.baseURL = "https://pokeapi.co/api/v2/";

const Router: FC = () => {
  const [theme, setTheme] = useState<string>("dark");
  const background = useMemo(() => ({ theme, setTheme }), [theme]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/auth",
      element: <Auth />,
    },
    {
      path: "/detail-event",
      element: <DetailEvent />,
    },
    {
      path: "/create-event",
      element: <CreateEvent />,
    },
    {
      path: "/my-events",
      element: <MyEvents />,
    },
    {
      path: "/detail-attending-event",
      element: <DetailAttendingEvent />,
    },
  ]);

  return (
    <ThemeContext.Provider value={background}>
      <RouterProvider router={router} />
    </ThemeContext.Provider>
  );
};

export default Router;
