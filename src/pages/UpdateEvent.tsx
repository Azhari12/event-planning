import withReactContent from "sweetalert2-react-content";
import { FC, useState, useEffect, FormEvent } from "react";
import Layout from "@/components/Layout";
import { InputForm } from "@/components/Input";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import Swal from "@/utils/Swal";
import ReactDatePicker from "react-datepicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { id, te } from "date-fns/locale";

interface ticketCategoriesType {
  ticket_category: string;
  ticket_price: number;
  ticket_quantity: number;
}

interface detailType {
  title?: string;
  description?: string;
  hosted_by?: string;
  date?: string | undefined | null;
  time?: string | undefined | null;
  status?: string;
  category?: string;
  location?: string;
  event_picture?: any;
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
  const [objSubmit, setObjSubmit] = useState<Partial<detailType>>({});
  const [ticketDatas, setTicketDatas] = useState<ticketCategoriesType[]>([]);
  const [fetch, setFetch] = useState<boolean>(false);
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  useEffect(() => {
    console.log(fetch);
    console.log(ticketCategories);
    console.log(objSubmit);
    fetchData();
  }, [objSubmit]);

  function fetchData() {
    if (!fetch) {
      console.log("2fetch");
      // axios
      //   .get(`events/${id}`, {
      //     headers: {
      //       Authorization: `Bearer ${getToken}`,
      //     },
      //   })
      axios({
        method: "get",
        url: `https://peterzalai.biz.id/events/${id}`,
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
        .then((res) => {
          const { data, message } = res.data;

          setObjSubmit({
            ...objSubmit,
            title: data.title,
            description: data.description,
            date: data.date,
            time: data.time,
            status: data.status,
            category: data.category,
            location: data.location,
            event_picture: data.event_picture,
          });
        })
        .catch((error) => {
          const { message } = error.response.data;
          MySwal.fire({
            title: "Failed",
            text: message,
            showCancelButton: false,
          });
        });

      axios;
      // .get(`tickets/${id}`, {
      //   headers: {
      //     Authorization: `Bearer ${getToken}`,
      //   },
      // })
      axios({
        method: "get",
        url: `https://peterzalai.biz.id/tickets/${id}`,
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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(objSubmit);
    const formData = new FormData();
    let key: keyof typeof objSubmit;
    // console.log(objSubmit);
    for (key in objSubmit) {
      formData.append(key, objSubmit[key]);
      console.log(key, objSubmit[key]);
    }
    axios({
      method: "put",
      url: `https://peterzalai.biz.id/events/${id}`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getToken}`,
      },
    })
      .then((res) => {
        const { message } = res.data;
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
  }

  function updateTicket() {
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

  function handleDate(date: Date | null) {
    const tes = date
      ?.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/(\d+)\/(\d+)\/(\d+)/, "$3-$2-$1");
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

  return (
    <Layout>
      <div className="lg:p-10">
        <p className=" text-2xl font-bold text-button">Update Event</p>
        <div className=" px-5 py-3 lg:px-14 lg:py-10 bg-[#F5F5F5] w-full">
          <form
            className=" transition-all"
            onSubmit={(event) => handleSubmit(event)}
          >
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
                  <span className="label-text">Time</span>
                </label>
                <DatePicker
                  className="input input-bordered w-full rounded-xl"
                  selected={startDate}
                  onChange={(date) => handleTime(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
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
            {/* <div className="form-control">
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
            </div> */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Upload Profile Image</span>
              </label>
              <input
                type="file"
                className="file-input file-input-bordered w-full max-w-xs"
                onChange={(event) => {
                  if (!event.currentTarget.files) {
                    return;
                  }
                  setObjSubmit({
                    ...objSubmit,
                    event_picture: event.currentTarget.files[0],
                  });
                }}
              />
            </div>
            <div className=" flex justify-center lg:justify-end w-full p-5">
              <button className="btn ml-2 bg-button rounded-lg">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateEvent;
