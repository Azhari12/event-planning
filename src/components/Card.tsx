import { FC } from "react";

const Card: FC = () => {
  return (
    <div className="card lg:card-side hover:bg-gradient-to-r from-white via-[#E5EFFF] via-50% to-white to-100% p-10 w-full">
      <figure className=" lg:w-1/3 md:w-full sm:flex-row min-[400px]:w-full">
        <img src="/noah.jpg" alt="Album" className=" rounded-xl" />
      </figure>
      <div className="card-body lg:w-2/3 md:w-full min-[400px]:w-full sm:w-full justify-start p-0 lg:pl-5 min-[400px]:p-0 sm:p-0">
        <div className="flex min-[400px]:flex-col sm:flex-col lg:flex-row justify-between max-w-full relative">
          <p className="card-title truncate font-bold capitalize">
            NOAH music concert
            <div className="badge badge-success gap-2">Open</div>
          </p>
          <p className="font-semibold text-sm lg:text-end">
            Monday, April 17 | 07.00 PM
          </p>
        </div>
        <div className=" text-sm text-[#1E1E1E] flex-initial h-full">
          <p className="line-clamp-5">
            Nowadays, it isn’t uncommon to see lenders rapidly adopting a
            digital lending strategy to streamline the lending process Gorgeous,
            high-quality design system for mobile, tablet & a few reasons
            digital Nowadays, it isn’t uncommon to see lenders rapidly adopting
            a digital lending strategy to streamline the lending process
            Gorgeous, high-quality design system for mobile, tablet & a few
            reasons digital Nowadays, it isn’t uncommon to see lenders rapidly
            adopting a digital lending strategy to streamline the lending
            process Gorgeous, high-quality design system for mobile, tablet & a
            few reasons digital
          </p>
        </div>
        <div className="flex justify-start text-[#858C80] text-sm font-medium">
          <p className=" flex-none">
            {" "}
            Hosted by NOAH | Gelora Bung Karno - Jakarta
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
