import { FC } from "react";
import Layout from "@/components/Layout";
const DetailHostingEvent: FC = () => {
  return (
    <Layout>
      <div className=" min-h-screen place-items-start lg:p-10">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src="/noah.jpg"
            className=" w-full h-full max-w-md max-h-[28rem] rounded-lg shadow-2xl object-cover"
          />
          <div className=" lg:pl-14">
            <h1 className="text-5xl font-bold capitalize">
              NOAH music concert
            </h1>
            <p className="py-6 text-[#4B5262]">
              Nowadays, it isn’t uncommon to see lenders rapidly adopting a
              digital lending strategy to streamline the lending process
              Gorgeous, high-quality design system for mobile, tablet & a few
              reasons digital Nowadays, it isn’t uncommon to see lenders rapidly
              adopting a digital lending strategy to streamline the lending
              process Gorgeous, high-quality design system for mobile, tablet &
              a few reasons digital Nowadays, it isn’t uncommon to see lenders
              rapidly adopting a digital lending strategy to streamline the
              lending process Gorgeous, high-quality design system for mobile,
              tablet & a few reasons digital
            </p>
            <div className=" flex justify-around text-lg font-bold">
              <div className=" w-48">
                <p>100 Joined</p>
                <p className="text-[#4B5262] text-sm font-normal">
                  100 People were joined this event, we still waiting
                </p>
              </div>
              <div>
                <p>400 Ticket Alvailable</p>
                <p className="text-[#4B5262] text-sm font-normal">
                  Don't let you run out of tickets
                </p>
              </div>
            </div>
            <div className=" flex flex-col border-2 rounded-lg p-5 mt-5">
              <p className=" font-bold tex-md">Time</p>
              <p>Monday, April 17 | 07.00 PM</p>
              <p className=" font-bold tex-md">Location</p>
              <p>Gelora Bung Karno - Jakarta</p>
              <p className=" font-bold tex-md mt-10">Hosted by NOAH</p>
            </div>
          </div>
        </div>
        <div className=" grid grid-cols-1 lg:grid-cols-2 border-2 rounded-lg m-4 p-5">
          <div className=" flex flex-col">
            <div className=" rounded-lg border-2 mt-5 p-3">
              <div className=" flex justify-around">
                <div className=" font-semibold text-lg w-[30%]">
                  <p>
                    Rp. 350000
                    <span className=" text-xs ">/ticket</span>
                  </p>
                  <p className=" font-semibold">V.I.P.</p>
                </div>
              </div>
              <div className="divider"></div>

              <div className=" flex justify-around">
                <div className=" font-semibold text-lg w-[30%]">
                  <p>
                    Rp. 100000
                    <span className=" text-xs ">/ticket</span>
                  </p>
                  <p className=" font-semibold">Reguler</p>
                </div>
              </div>
            </div>
          </div>
          <div className=" flex flex-col justify-center items-center text-lg font-semibold">
            <div className="flex justify-around mt-10 w-full px-[8rem]">
              <button className="btn ml-2 bg-button text-lg rounded-lg capitalize">
                Update
              </button>
              <button className="btn ml-2 bg-white  text-lg rounded-lg capitalize text-red-700 border-red-700 hover:bg-red-700 hover:text-white hover:border-red-700">
                Delete
              </button>
            </div>
          </div>
        </div>
        <div className="m-4">
          <p className=" text-lg font-bold ">Attendees</p>
          <div className=" grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 min-[400px]:grid-cols-2 text-lg font-semibold">
            <div className=" flex flex-col justify-center items-center p-10">
              <img
                src="/kirito.jpg"
                className=" w-full h-full max-w-md max-h-[28rem] mask mask-circle shadow-2xl object-fill"
              />
              <p>kirito</p>
            </div>
            <div className=" flex flex-col justify-center items-center p-10">
              <img
                src="/kirito.jpg"
                className=" w-full h-full max-w-md max-h-[28rem] mask mask-circle shadow-2xl object-fill"
              />
              <p>kirito</p>
            </div>
            <div className=" flex flex-col justify-center items-center p-10">
              <img
                src="/kirito.jpg"
                className=" w-full h-full max-w-md max-h-[28rem] mask mask-circle shadow-2xl object-fill"
              />
              <p>kirito</p>
            </div>
            <div className=" flex flex-col justify-center items-center p-10">
              <img
                src="/kirito.jpg"
                className=" w-full h-full max-w-md max-h-[28rem] mask mask-circle shadow-2xl object-fill"
              />
              <p>kirito</p>
            </div>
            <div className=" flex flex-col justify-center items-center p-10">
              <img
                src="/kirito.jpg"
                className=" w-full h-full max-w-md max-h-[28rem] mask mask-circle shadow-2xl object-fill"
              />
              <p>kirito</p>
            </div>
          </div>
        </div>
        <div className="m-4">
          <p className=" text-lg font-bold ">Comments</p>
          <div className="lg:px-[2rem]">
            <div className="flex items-center mb-5">
              <div className=" flex-initial max-w-[10rem]">
                <img
                  src="/kirito.jpg"
                  className="lg:block md:block sm:hidden min-[400px]:hidden w-full h-full max-w-md max-h-[28rem] mask mask-circle shadow-2xl object-cover"
                />
              </div>
              <div className="flex-1 bg-[#F7F8F9] flex p-5 items-center justify-between">
                <textarea
                  placeholder="Enter a comment ..."
                  className="textarea textarea-bordered textarea-md w-full max-w-2xl"
                ></textarea>
                <button className="btn ml-2 bg-button rounded-lg">
                  comment
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <div className=" flex-initial max-w-[10rem]">
                <img
                  src="/kirito.jpg"
                  className="lg:block md:block sm:hidden min-[400px]:hidden w-full h-full max-w-md max-h-[28rem] mask mask-circle shadow-2xl object-cover"
                />
              </div>
              <div className="bg-[#F7F8F9] flex p-5 flex-col">
                <p className=" text-lg font-bold">Jenny</p>
                <p>
                  Lorem ipsum dolor sit amet, coetur adipiscing elit ut aliquam,
                  purus sit amet luctus Lorem ipsum dolor sit amet aliquam,
                  purus sit amet luctus{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailHostingEvent;
