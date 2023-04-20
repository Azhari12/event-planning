import { useState, FC } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Layout from "@/components/Layout";
import Card from "@/components/Card";
import { Link } from "react-router-dom";

const Home: FC = () => {
  return (
    <Layout>
      <div className=" flex w-full sm:flex-col md:flex-row min-[400px]:flex-col">
        <div className=" flex-initial lg:w-[25%] md:w-[25%] sm:flex-row min-[400px]:w-full">
          <div>
            <p className=" font-semibold">Event Categories</p>
            <div className="grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-4 min-[400px]: grid-cols-2">
              <label className="label cursor-pointer justify-start">
                <input type="checkbox" className="checkbox w-4 h-4 mx-8" />
                <span className="label-text">Music</span>
              </label>
              <label className="label cursor-pointer justify-start">
                <input type="checkbox" className="checkbox w-4 h-4 mx-8" />
                <span className="label-text">Art</span>
              </label>
              <label className="label cursor-pointer justify-start">
                <input type="checkbox" className="checkbox w-4 h-4 mx-8" />
                <span className="label-text">Games</span>
              </label>
              <label className="label cursor-pointer justify-start">
                <input type="checkbox" className="checkbox w-4 h-4 mx-8" />
                <span className="label-text">Sport</span>
              </label>
            </div>
          </div>
        </div>
        <div className=" flex-1">
          <div className=" flex flex-col">
            <Link to={"/"}>
              <Card />
            </Link>
            <Link to={"/"}>
              <Card />
            </Link>
            <Link to={"/"}>
              <Card />
            </Link>
            <Link to={"/"}>
              <Card />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
