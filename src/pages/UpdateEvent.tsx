import withReactContent from "sweetalert2-react-content";
import { FC, useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { InputForm } from "@/components/Input";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import Swal from "@/utils/Swal";

interface ticketCategoriesType {
  ticket_category: string;
  ticket_price: number;
  ticket_quantity: number;
}

interface detailType {
  title: string;
  description: string;
  hosted_by: string;
  date: string;
  time: string;
  status: string;
  category: string;
  location: string;
  event_picture: string;
}

const UpdateEvent: FC = () => {
  const [ticketCategories, setTicketCategories] = useState<
    ticketCategoriesType[]
  >([]);
  // const [data, setData] = useState<detailType>();
  const { id } = useParams();
  const [cookie, , removeCookie] = useCookies(["token", "uname"]);
  const getToken = cookie.token;
  const MySwal = withReactContent(Swal);
  const [objSubmit, setObjSubmit] = useState<detailType>({
    title: "",
    description: "",
    hosted_by: "",
    date: "",
    time: "",
    status: "",
    category: "",
    location: "",
    event_picture: "default_image_gcp.png",
  });
  const [ticketDatas, setTicketDatas] = useState<ticketCategoriesType[]>([]);
  const [fetch, setFetch] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(fetch);
    console.log(ticketCategories);
    console.log(objSubmit);
    fetchData();
  }, [ticketCategories]);

  function fetchData() {
    if (!fetch) {
      console.log("2fetch");
      axios
        .get(`events/${id}`, {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        })
        .then((res) => {
          const { data, message } = res.data;
          console.log(data);
          setObjSubmit(data);
        })
        .catch((error) => {
          const { message } = error.response.data;
          MySwal.fire({
            title: "Failed",
            text: message,
            showCancelButton: false,
          });
        });

      axios
        .get(`tickets/${id}`, {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        })
        .then((res) => {
          const { data, message } = res.data;
          console.log(data);
          setTicketCategories(data);
        })
        .catch((error) => {
          const { message } = error.response.data;
          MySwal.fire({
            title: "Failed",
            text: message,
            showCancelButton: false,
          });
        });
      setFetch(true);
    }
  }

  function handleUpdate() {
    console.log(objSubmit);
    axios
      .put(`events/${id}`, objSubmit, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then((res) => {
        const { data, message } = res.data;
        console.log(data);
        MySwal.fire({
          title: "Success",
          text: message,
          showCancelButton: false,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate(`/detail-event/${id}`);
          }
        });
        console.log("event Succes Update");
      })
      .catch((error) => {
        const { message } = error.response.data;
        MySwal.fire({
          title: "Failed",
          text: message,
          showCancelButton: false,
        });
      });

    axios
      .put(`tickets/${id}`, ticketCategories, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then((res) => {
        const { data, message } = res.data;
        MySwal.fire({
          title: "Success Ticket",
          text: message,
          showCancelButton: false,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate(`/detail-event/${id}`);
          }
        });
        console.log("Tickets Succes Update");
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

  function addTicketCategoris() {
    console.log(ticketCategories);
    const temp = [...ticketCategories];
    temp.push({
      ticket_category: "",
      ticket_price: 0,
      ticket_quantity: 0,
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
          <InputForm
            type="text"
            placeholder="Event Title"
            label="Title"
            defaultValue={objSubmit.title}
            onChange={(e) =>
              setObjSubmit({ ...objSubmit, title: e.target.value })
            }
          />
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              defaultValue={objSubmit.description}
              className="textarea textarea-bordered h-24 rounded-xl"
              placeholder="Write Your Description Event Here"
              onChange={(e) =>
                setObjSubmit({ ...objSubmit, description: e.target.value })
              }
            ></textarea>
          </div>
          <div className=" grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 min-[400px]:grid-cols-1">
            <div className=" lg:mr-5">
              <InputForm
                defaultValue={objSubmit.date}
                type="date"
                placeholder="Event Schedule Date"
                label="Date"
              />
            </div>
            <div className=" lg:mx-5">
              <InputForm
                defaultValue={objSubmit.time}
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
                <select
                  className="select select-bordered w-full"
                  value={objSubmit.status}
                >
                  <option selected disabled>
                    Select Status
                  </option>
                  <option>close</option>
                  <option>open</option>
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
                  value={objSubmit.category}
                >
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
            defaultValue={objSubmit.location}
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
                      defaultValue={data.ticket_category}
                      type="text"
                      placeholder="Ticket Name"
                      label="Ticket Name"
                    />
                  </div>
                  <div className=" lg:px-3">
                    <InputForm
                      defaultValue={data.ticket_price}
                      type="text"
                      placeholder="Ticket Price"
                      label="Price"
                    />
                  </div>
                  <div className=" lg:pl-3 flex justify-center items-center ">
                    <InputForm
                      type="text"
                      placeholder="Quantity"
                      label="Qty"
                      defaultValue={data.ticket_quantity}
                    />
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
            <button
              className="btn ml-2 bg-button rounded-lg"
              onClick={(e) => {
                handleUpdate();
              }}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateEvent;
