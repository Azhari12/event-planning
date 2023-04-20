import { FC, ReactNode } from "react";
import Footer from "./Footer";
// import Navbar from "./Navbar";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = (props) => {
  const { children } = props;
  return (
    <div className="flex flex-col h-screen w-full overflow-auto ">
      <div className="drawer min-h-screen h-full">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <div className=" h-full">
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
                Event Planning
              </div>
              <div className="flex-1 hidden lg:block ">
                <div className=" flex w-full justify-center font-medium">
                  <a className=" p-5">Home</a>
                  <a className=" p-5">My Events</a>
                </div>
              </div>
              <div className="flex-none hidden lg:block mr-10">
                <ul className="menu menu-horizontal">
                  <li>
                    <button className=" bg-white px-10 py-2 text-button rounded-md transition-all font-medium">
                      Login
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="container mx-auto bg-center bg-cover bg-no-repeat flex flex-col p-3">
              {children}
            </div>
          </div>
          <Footer />
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100">
            <li>
              <button className=" bg-button px-10 py-2 text-white rounded-3xl transition-all mt-5">
                Sign In
              </button>
            </li>
            <li>
              <a className=" p-5">Home</a>
            </li>
            <li>
              <a className=" p-5">My Events</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Layout;
