import { FC } from "react";

interface Props {
  id: number;
  name: string;
  hosted_by: string;
  date: string;
  location: string;
  details: string;
  event_picture: string;
}

const Card: FC<Props> = (props) => {
  const { name, hosted_by, date, location, details, event_picture } = props;
  return (
    <div className="card lg:card-side hover:bg-gradient-to-r from-white via-[#E5EFFF] via-50% to-white to-100% pt-10 lg:p-10 w-full">
      <figure className=" lg:w-1/3 md:w-full sm:flex-row min-[400px]:w-full">
        <img src={event_picture} alt="Album" className=" rounded-xl" />
      </figure>
      <div className="card-body lg:w-2/3 md:w-full min-[400px]:w-full sm:w-full justify-start p-0 lg:pl-5 min-[400px]:p-0 sm:p-0">
        <div className="flex min-[400px]:flex-col sm:flex-col lg:flex-row justify-between max-w-full relative">
          <p className="card-title truncate font-bold capitalize flex min-[400px]:flex-col lg:flex-row">
            {name}
            <div className="badge badge-success gap-2">Open</div>
          </p>
          <p className="font-semibold text-sm lg:text-end">{date} | 07.00 PM</p>
        </div>
        <div className=" text-sm text-[#1E1E1E] flex-initial h-full">
          <p className="line-clamp-5">{details}</p>
        </div>
        <div className="flex justify-start text-[#858C80] text-sm font-medium">
          <p className=" flex-none">
            {" "}
            Hosted by {hosted_by} | {location}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
