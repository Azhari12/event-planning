import withReactContent from "sweetalert2-react-content";
import { FC, ReactNode } from "react";
import Footer from "./Footer";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import Swal from "@/utils/Swal";
import { useDispatch } from "react-redux";
import { handleAuth } from "@/utils/redux/reducers/reducer";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = (props) => {
  const [cookie, , removeCookie] = useCookies(["token", "uname"]);
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getToken = cookie.token;
  const { children } = props;

  function handleLogout() {
    MySwal.fire({
      title: "Logout",
      text: "Are you sure?",
    }).then((result) => {
      if (result.isConfirmed) {
        removeCookie("token");
        removeCookie("uname");
        dispatch(handleAuth(false));
        navigate("/");
      }
    });
  }

  return (
    <div className="flex flex-col min-h-screen w-full ">
      <div className="drawer min-h-screen h-full">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col relative h-full">
          <div className=" h-full  bg-gradient-to-r from-[#EBEBEB] to-white to-40%">
            <div className="w-full navbar bg-button text-white p-0">
              <div className="flex-none lg:hidden">
                <label
                  htmlFor="my-drawer-3"
                  className="btn btn-square btn-ghost"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-6 h-6 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </label>
              </div>
              <div className="flex-initial px-2 ml-10 font-bold ">
                <Link to={"/"}>Event Planning</Link>
              </div>
              <div className="flex-1 hidden lg:block ">
                <div className=" flex w-full justify-center font-medium">
                  <Link to={"/"} className=" p-5">
                    Home
                  </Link>
                  <Link to={"/my-events"} className=" p-5">
                    My Events
                  </Link>
                </div>
              </div>
              <div className="flex-none hidden lg:block mr-10">
                {getToken ? (
                  <div className="flex justify-center items-center">
                    <Link
                      to={"/create-event"}
                      className=" bg-white px-5 mr-3 my-1 text-button rounded-md transition-all font-semibold p-2"
                    >
                      Create Event
                    </Link>
                    <div className="dropdown dropdown-end text-button">
                      <label
                        tabIndex={0}
                        className="btn btn-ghost btn-circle avatar"
                      >
                        <div className="w-10 rounded-full">
                          <img src="/kirito.jpg" />
                        </div>
                      </label>
                      <ul
                        tabIndex={0}
                        className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                      >
                        <li>
                          <a className="justify-between">Profile</a>
                        </li>

                        <li>
                          <button onClick={handleLogout}>Logout</button>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <ul className="menu menu-horizontal">
                    <li>
                      <Link
                        to={"/auth"}
                        className=" bg-white px-10 py-2 text-button rounded-md transition-all font-medium"
                      >
                        Login
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </div>
            <div className="container mx-auto bg-center bg-cover bg-no-repeat flex flex-col p-3  ">
              {children}
            </div>
          </div>
          <Footer />
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          {getToken ? (
            <ul className="menu p-4 w-80 bg-base-100">
              <li>
                <a className=" p-5">Profile</a>
              </li>
              <li>
                <a className=" p-5">Home</a>
              </li>
              <li>
                <a className=" p-5">My Events</a>
              </li>
              <li>
                <button className="p-5" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          ) : (
            <ul className="menu p-4 w-80 bg-base-100">
              <li>
                <Link
                  to={"/auth"}
                  className=" bg-button px-10 py-2 text-white rounded-3xl transition-all mt-5"
                >
                  Login
                </Link>
              </li>
              <li>
                <a className=" p-5">Home</a>
              </li>
              <li>
                <a className=" p-5">My Events</a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Layout;
