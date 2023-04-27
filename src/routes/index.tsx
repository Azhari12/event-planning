import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { FC, useState, useMemo, useEffect } from "react";
import { ThemeContext } from "@/utils/context";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import axios from "axios";

import { handleAuth } from "@/utils/redux/reducers/reducer";
import Home from "@/pages";
import Auth from "@/pages/Auth";
import DetailEvent from "@/pages/DetailEvent";
import CreateEvent from "@/pages/CreateEvent";
import MyEvents from "@/pages/MyEvents";
import DetailAttendingEvent from "@/pages/DetailAttendingEvent";
import DetailHostingEvent from "@/pages/DetailHostingEvent";
import UpdateEvent from "@/pages/UpdateEvent";

axios.defaults.baseURL =
  "https://virtserver.swaggerhub.com/dimasyudhana/EventappRESTfulAPI/1.0.1";
// axios.defaults.baseURL = "https://peterzalai.biz.id";

const Router: FC = () => {
  const [theme, setTheme] = useState<string>("dark");
  const background = useMemo(() => ({ theme, setTheme }), [theme]);
  const [cookie] = useCookies(["token", "uname"]);
  const getToken = cookie.token;
  const dispatch = useDispatch();
  const [, , removeCookie] = useCookies();

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
      path: "/detail-event/:id",
      element: getToken ? <DetailEvent /> : <Navigate to="/auth" />,
    },
    {
      path: "/create-event",
      element: getToken ? <CreateEvent /> : <Navigate to="/auth" />,
    },
    {
      path: "/my-events",
      element: getToken ? <MyEvents /> : <Navigate to="/auth" />,
    },
    {
      path: "/detail-attending-event",
      element: getToken ? <DetailAttendingEvent /> : <Navigate to="/auth" />,
    },
    {
      path: "/detail-hosting-event",
      element: getToken ? <DetailHostingEvent /> : <Navigate to="/auth" />,
    },
    {
      path: "/update-event",
      element: getToken ? <UpdateEvent /> : <Navigate to="/auth" />,
    },
  ]);

  useEffect(() => {
    // removeCookie("tkn");
    // removeCookie("uname");
    console.log(getToken);
    if (getToken) {
      dispatch(
        handleAuth({ isLoggedIn: true, uname: cookie.uname, token: getToken })
      );
    } else {
      dispatch(handleAuth({ isLoggedIn: false, uname: "", token: "" }));
    }
  }, [cookie]);

  return (
    <ThemeContext.Provider value={background}>
      <RouterProvider router={router} />
    </ThemeContext.Provider>
  );
};

export default Router;
