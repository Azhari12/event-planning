import { InputForm } from "@/components/Input";
import Layout from "@/components/Layout";
import { FC, useEffect, useState } from "react";

interface ticketCategoriesType {
  ticketName: string;
  ticketPrice: number;
  ticketQty: number;
}

const CreateEvent: FC = () => {
  const [ticketCategories, setTicketCategories] = useState<
    ticketCategoriesType[]
  >([
    {
      ticketName: "",
      ticketPrice: 0,
      ticketQty: 0,
    },
  ]);

  useEffect(() => {
    console.log(ticketCategories);
  }, [ticketCategories]);

  function addTicketCategoris() {
    console.log(ticketCategories);
    const temp = [...ticketCategories];
    temp.push({
      ticketName: "",
      ticketPrice: 0,
      ticketQty: 0,
    });
    console.log(temp);
    setTicketCategories(temp);
  }

  function deleteTicket() {
    const temp = [...ticketCategories];
    temp.length--;

    setTicketCategories(temp);
  }
  return (
    <Layout>
      <div className="lg:p-10">
        <p className=" text-2xl font-bold text-button">Create Event</p>
        <div className=" px-5 py-3 lg:px-14 lg:py-10 bg-[#F5F5F5] w-full">
          <InputForm type="text" placeholder="Event Title" label="Title" />
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24 rounded-xl"
              placeholder="Write Your Description Event Here"
            ></textarea>
          </div>
          <div className=" grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 min-[400px]:grid-cols-1">
            <div className=" lg:mr-5">
              <InputForm
                type="date"
                placeholder="Event Schedule Date"
                label="Date"
              />
            </div>
            <div className=" lg:mx-5">
              <InputForm
                type="time"
                placeholder="Event Schedule Time"
                label="Time"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Status</span>
              </label>
              <div className="input-group w-full rounded-xl">
                <select className="select select-bordered w-full ">
                  <option selected>Close</option>
                  <option>Open</option>
                </select>
              </div>
            </div>
            <div className="form-control w-full lg:pl-5">
              <label className="label">
                <span className="label-text">Categories</span>
              </label>
              <div className="input-group w-full ">
                <select className="select select-bordered w-full">
                  <option selected disabled>
                    Select Categories
                  </option>
                  <option>Music</option>
                  <option>Art</option>
                  <option>Game</option>
                  <option>IT</option>
                </select>
              </div>
            </div>
          </div>
          <InputForm
            type="text"
            placeholder="Event Location"
            label="Location"
          />
          <div className="form-control">
            <label className="label flex-row justify-start">
              <span className="label-text font-bold">Ticket Categories</span>
              <button
                onClick={(event) => {
                  addTicketCategoris();
                }}
              >
                <span className="label-text font-bold text-button  ml-5">
                  + Add Category
                </span>
              </button>
            </label>
            {ticketCategories.map((data) => {
              return (
                <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 min-[400px]:grid-cols-1 pb-3 border-b-2">
                  <div className=" lg:pr-3">
                    <InputForm
                      type="text"
                      placeholder="Ticket Name"
                      label="Ticket Name"
                    />
                  </div>
                  <div className=" lg:px-3">
                    <InputForm
                      type="text"
                      placeholder="Ticket Price"
                      label="Price"
                    />
                  </div>
                  <div className=" lg:pl-3 flex justify-center items-center ">
                    <InputForm type="text" placeholder="Quantity" label="Qty" />
                    <button onClick={deleteTicket}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 mt-8 ml-3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Upload Event Image</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full max-w-xs"
            />
          </div>
          <div className=" flex justify-center lg:justify-end w-full p-5">
            <button className="btn ml-2 bg-button rounded-lg">
              Launch Now
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateEvent;
