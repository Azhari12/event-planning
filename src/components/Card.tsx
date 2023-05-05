import { FC } from "react";

interface Props {
  id: number;
  name: string;
  hosted_by: string;
  date: string;
  time: string;
  status: string;
  location: string;
  details: string;
  event_picture: string;
}

const Card: FC<Props> = (props) => {
  const {
    name,
    hosted_by,
    date,
    time,
    status,
    location,
    details,
    event_picture,
  } = props;
  return (
    <div className="card lg:card-side hover:bg-gradient-to-r from-white via-[#E5EFFF] via-50% to-white to-100% pt-10 lg:p-10 w-full transition-all max-h-[20rem]">
      <figure className=" lg:w-1/3 md:w-full sm:flex-row min-[400px]:w-full  ">
        <img
          src={event_picture}
          alt="Album"
          className=" rounded-xl h-full object-cover"
        />
      </figure>
      <div className="card-body lg:w-2/3 md:w-full min-[400px]:w-full sm:w-full justify-start p-0 lg:pl-5 min-[400px]:p-0 sm:p-0">
        <div className="flex min-[400px]:flex-col sm:flex-col lg:flex-row max-w-full relative">
          <p className=" truncate flex-initial text-xl font-bold capitalize max-w-[55%]">
            {name}
          </p>
          <div className="md: pl-5 flex justify-center items-center">
            {status == "close" ? (
              <div className="badge badge-error gap-2">{status}</div>
            ) : (
              <div className="badge badge-success gap-2">{status}</div>
            )}
          </div>
          <p className="font-semibold text-sm lg:text-end">
            {date} | {time}
          </p>
        </div>
        <div className=" text-sm text-[#1E1E1E] flex-initial h-full">
          <p className="line-clamp-5">{details}</p>
        </div>
        <div className="flex justify-start text-[#858C80] text-sm font-medium">
          <p className=" truncate flex-none w-[100%]">
            {" "}
            Hosted by {hosted_by} | {location}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
