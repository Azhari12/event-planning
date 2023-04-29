import withReactContent from "sweetalert2-react-content";
import Layout from "@/components/Layout";
import axios from "axios";
import { FC, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "@/utils/Swal";
import { useCookies } from "react-cookie";

interface tikcetType {
  default_price: number;
  price: number;
  name: string;
  qty: number;
}

interface detailType {
  event_id: number;
  title: string;
  description: string;
  hosted_by: string;
  date: string;
  time: string;
  status: string;
  category: string;
  location: string;
  image: string;
  reviews: [
    {
      username: string;
      user_picture: string;
      review: string;
    }
  ];
}

interface ticketType {
  ticket_category: string;
  ticket_price: number;
  ticket_quantity: number;
}

interface attendeesType {
  id: number;
  user_id: number;
  event_id: number;
  event_category: number;
  quantity: number;
}

const DetailEvent: FC = () => {
  const [tiecketArray, setTicetArray] = useState<tikcetType[]>([]);
  const [tikectselect, setTicketSelect] = useState<string>("");
  const [total, setTotal] = useState<number>(0);
  const { id } = useParams();
  const [data, setData] = useState<detailType>();
  const [ticketDatas, setTicketDatas] = useState<ticketType[]>([]);
  const [attendees, setAttendees] = useState<attendeesType[]>([]);
  const MySwal = withReactContent(Swal);
  const [qtyAllticket, setQtyAllTicket] = useState<number>(0);
  const [cookie, , removeCookie] = useCookies(["token", "uname"]);
  const getToken = cookie.token;
  const navigate = useNavigate();

  useEffect(() => {
    console.log(tikectselect);
    console.log(tiecketArray);
    console.log(qtyAllticket);
    fetchData();
    // addTicket(tikectselect);
  }, [tiecketArray]);

  function fetchData() {
    axios
      .get(`events/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then((res) => {
        const { data, message } = res.data;
        console.log(data);
        setData(data);
      })
      .catch((error) => {
        const { message } = error.response.data;
        MySwal.fire({
          title: "Failed",
          text: message,
          showCancelButton: false,
        });
      });

    // get attendess data by event id
    // axios
    //   .get(`events/${id}/attendees`, {
    //     headers: {
    //       Authorization: `Bearer ${getToken}`,
    //     },
    //   })
    //   .then((res) => {
    //     const { data, message } = res.data;
    //     setAttendees(data);
    //   })
    //   .catch((error) => {
    //     const { message } = error.response.data;
    //     MySwal.fire({
    //       title: "Failed",
    //       text: message,
    //       showCancelButton: false,
    //     });
    //   });

    //get ticket datas by event id
    axios
      .get(`tickets/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then((res) => {
        const { data, message } = res.data;
        setTicketDatas(data);
        console.log(ticketDatas);
      })
      .catch((error) => {
        const { message } = error.response.data;
        MySwal.fire({
          title: "Failed",
          text: message,
          showCancelButton: false,
        });
      });

    // if (ticketDatas) {
    //   ticketDatas.map((data) => {
    //     return setQtyAllTicket(data.ticket_quantity + qtyAllticket);
    //   });
    // }
  }

  function addTicket(categories: string) {
    console.log(categories);

    const tempTikcet = [...tiecketArray];
    const vip = {
      default_price: 350000,
      price: 350000,
      name: "V.I.P.",
      qty: 1,
    };

    const reguler = {
      default_price: 100000,
      price: 100000,
      name: "Reguler",
      qty: 1,
    };

    if (categories == "VIP") {
      tempTikcet.push(vip);
      setTotal(total + vip.price);
    } else {
      tempTikcet.push(reguler);
      setTotal(total + reguler.price);
    }

    const totalPrice = total;
    setTicetArray(tempTikcet);
  }

  function handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    setTicketSelect(event.target.value);
  }

  function handleUpdatePlus(
    ticketName: string,
    qty: number,
    default_price: number
  ) {
    qty++;
    const ticketData = {
      price: default_price * qty,
      qty: qty,
    };
    setTicetArray(
      tiecketArray.map((data) => {
        if (data.name === ticketName) {
          return { ...data, ...ticketData };
        }
        return data;
      })
    );
    setTotal(total + default_price);
  }

  function handleUpdateMinus(
    ticketName: string,
    qty: number,
    default_price: number
  ) {
    qty--;
    const ticketData = {
      price: default_price * qty,
      qty: qty,
    };
    setTicetArray(
      tiecketArray.map((data) => {
        if (data.name === ticketName) {
          return { ...data, ...ticketData };
        }
        return data;
      })
    );
    setTotal(total - default_price);
  }

  function handleDelete(id?: number) {
    axios
      .delete(`/events/${id}`)
      .then((res) => {
        const { message } = res.data;
        MySwal.fire({
          title: "Success Delete",
          text: message,
          showCancelButton: false,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
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
  }

  return (
    <Layout>
      <div className=" min-h-screen place-items-start lg:p-10">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src="/noah.jpg"
            className=" w-full h-full max-w-md max-h-[28rem] rounded-lg shadow-2xl object-cover"
          />
          <div className=" lg:pl-14">
            <h1 className="text-5xl font-bold capitalize">{data?.title}</h1>
            <p className="py-6 text-[#4B5262]">{data?.description}</p>
            <div className=" flex justify-around text-lg font-bold">
              <div className=" w-48">
                <p>{attendees.length} Joined</p>
                <p className="text-[#4B5262] text-sm font-normal">
                  {attendees.length} People were joined this event, we still
                  waiting
                </p>
              </div>
              <div>
                <p>
                  {ticketDatas.reduce(
                    (totals, tickets) => totals + tickets.ticket_quantity,
                    0
                  )}{" "}
                  Ticket Alvailable
                </p>
                <p className="text-[#4B5262] text-sm font-normal">
                  Don't let you run out of tickets
                </p>
              </div>
            </div>
            {cookie.uname == data?.hosted_by ? (
              <div className=" grid grid-cols-1  md:grid-cols-2 border-2 rounded-lg p-5 mt-5">
                <div>
                  <p className=" font-bold tex-md">Time</p>
                  <p>
                    {data?.date} | {data?.time}
                  </p>
                  <p className=" font-bold tex-md">Location</p>
                  <p>{data?.location}</p>
                  <p className=" font-bold tex-md mt-10">
                    Hosted by {data?.hosted_by}
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <p className=" text-lg font-bold text-red-800">Closed</p>
                  <button className="btn ml-2 bg-button mt-10 text rounded-lg">
                    Open
                  </button>
                </div>
              </div>
            ) : (
              <div className=" flex flex-col border-2 rounded-lg p-5 mt-5">
                <p className=" font-bold tex-md">Time</p>
                <p>
                  {data?.date} | {data?.time}
                </p>
                <p className=" font-bold tex-md">Location</p>
                <p>{data?.location}</p>
                <p className=" font-bold tex-md mt-10">
                  Hosted by {data?.hosted_by}
                </p>
              </div>
            )}
          </div>
        </div>
        {cookie.uname == "peterzalai" ? (
          <div className=" grid grid-cols-1 md:grid-cols-2 border-2 rounded-lg m-4 p-5">
            <div className=" flex flex-col">
              <div className=" rounded-lg border-2 mt-5 p-3">
                {ticketDatas.map((data) => {
                  return (
                    <div className=" flex justify-start">
                      <div className=" font-medium w-[30%]">
                        <p>
                          Rp. {data.ticket_price}
                          <span className=" text-xs ">/ticket</span>
                        </p>
                        <p className=" font-semibold">{data.ticket_category}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className=" flex flex-row justify-center items-center ">
              <Link
                to={`/update-event/${data?.event_id}`}
                className="btn ml-2 bg-button w-36 rounded-lg capitalize font-medium text-lg"
              >
                Update
              </Link>
              <button
                className="btn ml-2 bg-white border-red-600 text-red-600 w-36 rounded-lg capitalize font-medium text-lg"
                onClick={(e) => handleDelete(data?.event_id)}
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <div className=" grid grid-cols-1 lg:grid-cols-2 border-2 rounded-lg m-4 p-5">
            <div className=" flex flex-col">
              <div className="form-control">
                <div className="input-group">
                  <select
                    className="select select-bordered"
                    onChange={handleSelect}
                    value={tikectselect}
                  >
                    <option disabled selected value={""}>
                      Choose Ticket
                    </option>
                    {ticketDatas.map((data) => {
                      return (
                        <option value={data.ticket_category}>
                          {data.ticket_category}
                        </option>
                      );
                    })}

                    {/* <option value={"reguler"}>Reguler</option> */}
                  </select>
                  <button
                    className="btn ml-2 bg-button rounded-lg"
                    onClick={(e) => addTicket(tikectselect)}
                  >
                    Add Ticket
                  </button>
                </div>
              </div>
              <div className=" rounded-lg border-2 mt-5 p-3">
                {tiecketArray.map((data) => {
                  return (
                    <div className=" flex justify-around">
                      <div className=" font-medium w-[30%]">
                        <p>
                          Rp. {data.default_price}
                          <span className=" text-xs ">/ticket</span>
                        </p>
                        <p className=" font-semibold">{data.name}</p>
                      </div>
                      <div className="2-[20%] flex">
                        <p className=" self-center">{data.qty} Ticket</p>
                      </div>
                      <div className=" flex justify-around w-[20%]">
                        <button
                          onClick={() =>
                            handleUpdateMinus(
                              data.name,
                              data.qty,
                              data.default_price
                            )
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.75 9.25a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                        <p className=" self-center">{data.qty}</p>
                        <button
                          onClick={() =>
                            handleUpdatePlus(
                              data.name,
                              data.qty,
                              data.default_price
                            )
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className=" flex flex-col justify-center items-center text-lg font-semibold">
              <p>Total</p>
              <p className="mt-3 text-xl">Rp. {total}</p>
              <div>
                <button className="btn ml-2 bg-button mt-10 text-lg rounded-lg">
                  Join Now
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="m-4">
          <p className=" text-lg font-bold ">Attendees</p>
          <div className=" grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 min-[400px]:grid-cols-2 text-lg font-semibold">
            {attendees !== null
              ? attendees.map((data) => {
                  return (
                    <div className=" flex flex-col justify-center items-center p-10">
                      <img
                        src="/kirito.jpg"
                        className=" w-full h-full max-w-md max-h-[28rem] mask mask-circle shadow-2xl object-fill"
                      />
                      <p>kirito</p>
                    </div>
                  );
                })
              : "tes"}
          </div>
        </div>
        <div className="m-4">
          <p className=" text-lg font-bold ">Comments</p>
          <div className="lg:px-[2rem]">
            {cookie.uname != data?.hosted_by ? (
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
            ) : (
              ""
            )}
            {data?.reviews
              ? data?.reviews.map((data) => {
                  return (
                    <div className="flex items-center">
                      <div className=" flex-initial max-w-[10rem]">
                        <img
                          src="/kirito.jpg"
                          className="lg:block md:block sm:hidden min-[400px]:hidden w-full h-full max-w-md max-h-[28rem] mask mask-circle shadow-2xl object-cover"
                        />
                      </div>
                      <div className="bg-[#F7F8F9] flex p-5 flex-col">
                        <p className=" text-lg font-bold">{data.username}</p>
                        <p>{data.review}</p>
                      </div>
                    </div>
                  );
                })
              : "tes"}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailEvent;
