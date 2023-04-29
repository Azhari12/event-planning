import withReactContent from "sweetalert2-react-content";
import { InputForm } from "@/components/Input";
import Layout from "@/components/Layout";
import { FC, useEffect, useState, FormEvent } from "react";
import React from "react";
import DatePicker from "react-datepicker";
import { useCookies } from "react-cookie";
import "react-datepicker/dist/react-datepicker.css";
import { id, te } from "date-fns/locale";
import { format } from "date-fns";

import axios from "axios";
import Swal from "@/utils/Swal";
interface ticketCategoriesType {
  ticket_category: string;
  ticket_price: number;
  ticket_quantity: number;
}

interface EventsType {
  title: string;
  description: string;
  hosted_by: string;
  date: string | undefined | null;
  time: string | undefined | null;
  status: string;
  category: string;
  location: string;
  event_picture: string;
  tickets: {
    ticket_category: string;
    ticket_price: number;
    ticket_quantity: number;
  }[];
}
const CreateEvent: FC = () => {
  const [cookie, , removeCookie] = useCookies(["token", "uname"]);
  const getToken = cookie.token;
  const MySwal = withReactContent(Swal);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [objSubmit, setObjSubmit] = useState<EventsType>({
    title: "",
    description: "",
    hosted_by: "NOAH",
    date: "",
    time: "",
    status: "",
    category: "",
    location: "",
    event_picture: "default_image_gcp.png",
    tickets: [
      {
        ticket_category: "",
        ticket_price: 0,
        ticket_quantity: 0,
      },
    ],
  });
  const [ticketCategories, setTicketCategories] = useState<
    ticketCategoriesType[]
  >([
    {
      ticket_category: "",
      ticket_price: 0,
      ticket_quantity: 0,
    },
  ]);

  useEffect(() => {
    // console.log(ticketCategories);
    console.log(objSubmit);
    console.log(startDate);
  }, [ticketCategories, objSubmit, startDate]);

  function addTicketCategoris() {
    // console.log(ticketCategories);
    const temp = [...objSubmit.tickets];
    temp.push({
      ticket_category: "",
      ticket_price: 0,
      ticket_quantity: 0,
    });
    console.log(temp);
    setObjSubmit({ ...objSubmit, tickets: temp });
  }

  function deleteTicket(index: number) {
    const indexToRemove = index;
    const temp = [...objSubmit.tickets];
    const newTicket = temp.filter((_, index) => index !== indexToRemove);
    setObjSubmit({ ...objSubmit, tickets: newTicket });
  }

  function handleSubmit() {
    axios
      .post("events", objSubmit, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then((res) => {
        const { message, data } = res.data;
        MySwal.fire({
          title: "Success",
          text: message,
          showCancelButton: false,
        });
        console.log("sucess", { data });
      })
      .catch((error) => {
        const { message } = error.response.data;
        MySwal.fire({
          title: "Failed",
          text: message,
          showCancelButton: false,
        });
      });
  }

  function handleDate(date: Date | null) {
    const tes = date
      ?.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/(\d+)\/(\d+)\/(\d+)/, "$1-$2-$3");
    setStartDate(date);
    console.log(tes);
    setObjSubmit({ ...objSubmit, date: tes });
    // setObjSubmit({ ...objSubmit, time: timeConv });
  }

  function handleTime(date: Date | null) {
    setStartDate(date);
    const timeConv = date?.toLocaleTimeString("en-US", { hour12: false });
    setObjSubmit({ ...objSubmit, time: timeConv });
  }
  // function handleChange(
  //   value: (string & number) | undefined,
  //   key: keyof typeof objSubmit
  // ) {
  //   let temp = { ...objSubmit };
  //   temp[key] = value;
  //   setObjSubmit(temp);
  // }

  return (
    <Layout>
      <div className="lg:p-10">
        <p className=" text-2xl font-bold text-button">Create Event</p>
        <div className=" px-5 py-3 lg:px-14 lg:py-10 bg-[#F5F5F5] w-full">
          {/* <form onSubmit={(e) => handleSubmit(e)}> */}
          <InputForm
            type="text"
            placeholder="Event Title"
            label="Title"
            onChange={(e) =>
              setObjSubmit({ ...objSubmit, title: e.target.value })
            }
          />
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24 rounded-xl"
              placeholder="Write Your Description Event Here"
              onChange={(e) =>
                setObjSubmit({ ...objSubmit, description: e.target.value })
              }
            ></textarea>
          </div>
          <div className=" grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 min-[400px]:grid-cols-1">
            <div className=" lg:mr-5">
              <label className="label">
                <span className="label-text">Date</span>
              </label>
              <DatePicker
                className="input input-bordered w-full rounded-xl"
                selected={startDate}
                onChange={(date) => handleDate(date)}
                dateFormat="dd-MM-yyyy"
              />
            </div>
            <div className=" lg:mx-5">
              <label className="label">
                <span className="label-text">Date</span>
              </label>
              <DatePicker
                className="input input-bordered w-full rounded-xl"
                selected={startDate}
                onChange={(date) => handleTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                locale={id}
                dateFormat="p"
                timeFormat="p"
                // minDate={new Date()}
                // maxDate={moment().tz("Asia/Jakarta").endOf("day").toDate()}
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Status</span>
              </label>
              <div className="input-group w-full rounded-xl">
                <select
                  className="select select-bordered w-full "
                  onChange={(e) => {
                    setObjSubmit({ ...objSubmit, status: e.target.value });
                  }}
                  // value={tikectselect}
                >
                  <option selected>Status</option>
                  <option value="close">Close</option>
                  <option value="open">Open</option>
                </select>
              </div>
            </div>
            <div className="form-control w-full lg:pl-5">
              <label className="label">
                <span className="label-text">Categories</span>
              </label>
              <div className="input-group w-full ">
                <select
                  className="select select-bordered w-full"
                  onChange={(e) => {
                    setObjSubmit({ ...objSubmit, category: e.target.value });
                  }}
                >
                  <option selected disabled>
                    Select Categories
                  </option>
                  <option value={"music"}>Music</option>
                  <option value={"art"}>Art</option>
                  <option value={"game"}>Game</option>
                  <option value={"it"}>IT</option>
                </select>
              </div>
            </div>
          </div>
          <InputForm
            type="text"
            placeholder="Event Location"
            label="Location"
            onChange={(e) => {
              setObjSubmit({ ...objSubmit, location: e.target.value });
            }}
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
            {objSubmit.tickets.map((data, index) => {
              return (
                <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 min-[400px]:grid-cols-1 pb-3 border-b-2">
                  <div className=" lg:pr-3">
                    <InputForm
                      type="text"
                      placeholder="Ticket Name"
                      label="Ticket Name"
                      defaultValue={data.ticket_category}
                      onChange={(e) => {
                        const price = data.ticket_price;
                        const qty = data.ticket_quantity;
                        let temp = [...objSubmit.tickets];
                        temp[index] = {
                          ticket_category: e.target.value,
                          ticket_price: price,
                          ticket_quantity: qty,
                        };
                        setObjSubmit({
                          ...objSubmit,
                          tickets: temp,
                        });
                      }}
                    />
                  </div>
                  <div className=" lg:px-3">
                    <InputForm
                      type="text"
                      placeholder="Ticket Price"
                      label="Price"
                      defaultValue={data.ticket_price}
                      onChange={(e) => {
                        const category = data.ticket_category;
                        const qty = data.ticket_quantity;
                        let temp = [...objSubmit.tickets];
                        temp[index] = {
                          ticket_category: category,
                          ticket_price: parseInt(e.target.value),
                          ticket_quantity: qty,
                        };
                        setObjSubmit({
                          ...objSubmit,
                          tickets: temp,
                        });
                      }}
                    />
                  </div>
                  <div className=" lg:pl-3 flex justify-center items-center ">
                    <InputForm
                      type="text"
                      placeholder="Quantity"
                      label="Qty"
                      defaultValue={data.ticket_quantity}
                      onChange={(e) => {
                        const category = data.ticket_category;
                        const price = data.ticket_price;
                        let temp = [...objSubmit.tickets];
                        temp[index] = {
                          ticket_category: category,
                          ticket_price: price,
                          ticket_quantity: parseInt(e.target.value),
                        };
                        setObjSubmit({
                          ...objSubmit,
                          tickets: temp,
                        });
                      }}
                    />
                    <button
                      onClick={(e) => {
                        deleteTicket(index);
                      }}
                    >
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

          <div className=" flex justify-center lg:justify-end w-full p-5">
            <button
              className="btn ml-2 bg-button rounded-lg"
              onClick={handleSubmit}
            >
              Launch Now
            </button>
          </div>
          {/* </form> */}
        </div>
      </div>
    </Layout>
  );
};

export default CreateEvent;
