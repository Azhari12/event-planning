import withReactContent from "sweetalert2-react-content";
import Layout from "@/components/Layout";
import axios from "axios";
import { FC, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "@/utils/Swal";
import { useCookies } from "react-cookie";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFDocument from "@/components/PDFDocument";

interface buyingTikcetType {
  ticket_id: number;
  ticket_category: string;
  ticket_price: number;
  ticket_quantity: number;
  subtotal: number;
}

interface detailType {
  event_id?: number;
  title?: string;
  description?: string;
  hosted_by?: string;
  date?: string;
  time?: string;
  status?: string;
  category?: string;
  location?: string;
  event_picture?: string;
  attendances?: [
    {
      username?: string;
      user_picture?: string;
    }
  ];
  reviews?: [
    {
      username?: string;
      user_picture?: string;
      review?: string;
    }
  ];
}

interface ticketType {
  ticket_id: number;
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

interface reviewType {
  review: string;
}

interface attendances {
  username: string;
  user_picture: string;
}

interface transactionsType {
  invoice: string;
  seller: string;
  seller_email: string;
  attendee: string;
  attendee_email: string;
  title: string;
  event_date: string;
  event_time: string;
  purchase_startdate: string;
  purchase_enddate: string;
  status: string;
  status_date: string;
  items_description: [
    {
      ticket_category: string;
      ticket_price: number;
      ticket_quantity: number;
      subtotal: number;
    }
  ];
  grand_total: number;
  payment_method: string;
}

const DetailEvent: FC = () => {
  const [tiecketArray, setTicetArray] = useState<buyingTikcetType[]>([]);
  const [ticketDatas, setTicketDatas] = useState<ticketType[]>([]);
  // const [attendees, setAttendees] = useState<attendeesType[]>([]);
  const [cookie, , removeCookie] = useCookies(["token", "uname", "image"]);
  const [tikectselect, setTicketSelect] = useState<string>("");
  const [qtyAllticket, setQtyAllTicket] = useState<number>(0);
  const [review, setReview] = useState<reviewType>();
  const [data, setData] = useState<detailType>();
  const [total, setTotal] = useState<number>(0);
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const getToken = cookie.token;
  const { id } = useParams();
  const [attending, setAttending] = useState<boolean>(false);
  const [trasactionData, setTrasactionData] = useState<transactionsType>();
  const [join, setJoin] = useState<boolean>(false);

  const username = "peterzalai";

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    localStorage.removeItem("ticket_data");
    let array: attendances[] = [];
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
        setData(data);
        array = data.attendances;
        let isAttending = array.some((item) => item.username === cookie.uname);
        setAttending(isAttending);
        if (isAttending) {
          fetchTransaction();
        }
      })
      .catch((error) => {
        const { message } = error.response.data;
        MySwal.fire({
          title: "Failed",
          text: message,
          showCancelButton: false,
        });
      });

    //get ticket datas by event id
    // axios
    //   .get(`tickets/${id}`, {
    //     headers: {
    //       Authorization: `Bearer ${getToken}`,
    //     },
    //   })
    axios({
      method: "get",
      url: `https://peterzalai.biz.id/tickets/${id}`,
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    })
      .then((res) => {
        const { data, message } = res.data;

        setTicketDatas(data);
      })
      .catch((error) => {
        const { message } = error.response.data;
      });
  }

  function fetchTransaction() {
    interface transType {
      id: string;
      event_id: number | undefined;
      username: string;
    }
    const data: string | null = localStorage.getItem("newTrans");
    let dataTransactionLocal: transType[] = [];
    if (data !== null) {
      dataTransactionLocal = JSON.parse(data);
    }

    let trans: any;
    if (id) {
      trans = dataTransactionLocal.find(
        (item: transType) =>
          item.username === cookie.uname && item.event_id === parseInt(id)
      );
    }

    // axios
    //   .get(`transactions/${trans?.id}`, {
    //     headers: {
    //       Authorization: `Bearer ${getToken}`,
    //     },
    //   })
    axios({
      method: "get",
      url: `https://peterzalai.biz.id/transactions/${trans?.id}`,
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    }).then((res) => {
      const { data } = res.data;
      setTrasactionData(data);
    });
  }

  function addTicket(categories: string) {
    setJoin(true);
    const tempTikcet = [...tiecketArray];
    let dataTicket = {
      ticket_id: 0,
      ticket_category: "",
      ticket_price: 0,
      ticket_quantity: 1,
      subtotal: 0,
    };

    ticketDatas.map((data) => {
      if (categories == data.ticket_category) {
        dataTicket.ticket_id = data.ticket_id;
        dataTicket.ticket_price = data.ticket_price;
        dataTicket.ticket_category = data.ticket_category;
        dataTicket.subtotal = data.ticket_price;
      }
    });

    tempTikcet.push(dataTicket);
    setTotal(total + dataTicket.subtotal);

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
      subtotal: default_price * qty,
      ticket_quantity: qty,
    };
    setTicetArray(
      tiecketArray.map((data) => {
        if (data.ticket_category === ticketName) {
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
    if (qty > 1) {
      qty--;
      const ticketData = {
        subtotal: default_price * qty,
        ticket_quantity: qty,
      };
      setTicetArray(
        tiecketArray.map((data) => {
          if (data.ticket_category === ticketName) {
            return { ...data, ...ticketData };
          }
          return data;
        })
      );
      setTotal(total - default_price);
    }
  }

  function handleDelete(id?: number) {
    MySwal.fire({
      title: "Delete",
      text: "Are you sure delete this event?",
    }).then((result) => {
      if (result.isConfirmed) {
        // axios
        //   .delete(`/events/${id}`)
        axios({
          method: "delete",
          url: `https://peterzalai.biz.id/events/${id}`,
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        })
          .then((res) => {
            const { message } = res.data;
            MySwal.fire({
              title: "Success Delete Event",
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
    });
  }

  function handleComment() {
    // axios
    //   .post(`reviews/${id}`, review, {
    //     headers: {
    //       Authorization: `Bearer ${getToken}`,
    //     },
    //   })
    axios({
      method: "post",
      url: `https://peterzalai.biz.id/reviews/${id}`,
      data: review,
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    })
      .then((res) => {
        const { message } = res.data;
        MySwal.fire({
          title: "Success",
          text: message,
          showCancelButton: false,
        });
      })
      .catch((error) => {
        const { message } = error.response.data;
        MySwal.fire({
          title: "Failed",
          text: message,
          showCancelButton: false,
        });
      })
      .finally(() => fetchData());
  }

  function handleJoin() {
    let localData = {
      event_id: parseInt(id ?? "0"),
      items_description: tiecketArray,
      grandtotal: total,
      title_event: data?.title,
      title_image: data?.event_picture,
      payment_method: "",
    };
    localStorage.setItem("ticket_data", JSON.stringify(localData));
    navigate(`/payment/${id}`);
  }

  function handleStatus(statusChange: string) {
    const dataStatus = { ...data, status: statusChange };
    axios({
      method: "put",
      url: `https://peterzalai.biz.id/events/${id}`,
      data: dataStatus,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getToken}`,
      },
    })
      .then((res) => {
        const { message } = res.data;
        MySwal.fire({
          title: "Success",
          text: `Status Changed to ${statusChange}`,
          showCancelButton: false,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate(`/detail-event/${id}`);
          }
        });
      })
      .catch((error) => {
        const { message } = error.response.data;
        MySwal.fire({
          title: "Failed",
          text: "message",
          showCancelButton: false,
        });
      })
      .finally(() => fetchData());
  }
  return (
    <Layout>
      <div className=" min-h-screen place-items-start lg:p-10">
        <div className="hero-content flex-col lg:flex-row items-start">
          <img
            src={data?.event_picture}
            className="w-[35rem]  h-[28rem] rounded-lg shadow-2xl object-cover"
          />
          <div className=" lg:pl-14">
            <h1 className="text-3xl font-bold capitalize">{data?.title}</h1>
            <p className="py-6 text-[#4B5262]">{data?.description}</p>
            <div className=" flex justify-around text-lg font-bold">
              {data?.attendances !== undefined ? (
                <div className=" w-48">
                  <p>{data?.attendances.length} Joined</p>
                  <p className="text-[#4B5262] text-sm font-normal">
                    {data?.attendances.length} People were joined this event, we
                    still waiting
                  </p>
                </div>
              ) : (
                <div className=" w-48">
                  <p>0 Joined</p>
                  <p className="text-[#4B5262] text-sm font-normal">
                    0 People were joined this event, we still waiting
                  </p>
                </div>
              )}

              <div>
                <p>
                  {ticketDatas !== undefined
                    ? ticketDatas.reduce(
                        (totals, tickets) => totals + tickets.ticket_quantity,
                        0
                      )
                    : 0}{" "}
                  Ticket Alvailable
                </p>
                <p className="text-[#4B5262] text-sm font-normal">
                  {ticketDatas !== undefined
                    ? ticketDatas.reduce(
                        (totals, tickets) => totals + tickets.ticket_quantity,
                        0
                      ) !== 0
                      ? "Don't let you run out of tickets"
                      : "Sorry you ran out of tickets, and Can not join this event"
                    : "no tickets"}
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
                {data?.status == "close" ? (
                  <div className="flex flex-col justify-center items-center">
                    <p className=" text-lg font-bold text-red-800 uppercase">
                      {data?.status}
                    </p>
                    <button
                      className="btn ml-2 bg-button mt-10 text rounded-lg"
                      onClick={(e) => handleStatus("open")}
                    >
                      Open
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col justify-center items-center">
                    <p className=" text-lg font-bold text-green-600 uppercase">
                      {data?.status}
                    </p>
                    <button
                      className="btn ml-2 bg-red-700 mt-10 text rounded-lg border-red-700"
                      onClick={(e) => handleStatus("close")}
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className=" flex border-2 rounded-lg p-5 mt-5 justify-around">
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
                <div className="flex flex-col items-center w-1/2">
                  {data?.status == "close" ? (
                    <p className=" text-lg">
                      Event is{" "}
                      <label className="font-bold text-red-800">
                        {data?.status}
                      </label>
                      .You Can Not join this event.
                    </p>
                  ) : (
                    <p className=" text-lg font-bold text-green-500">
                      {data?.status}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* condition, is atteding true or not, inside false of this condition is, a component for ticket area which have condition too */}
        {attending ? (
          <div className=" grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-2 rounded-lg m-4 p-5">
            <div className="flex flex-col  font-semibold justify-center">
              <p className=" text-base">
                {trasactionData?.items_description.reduce(
                  (totals, items_description) =>
                    totals + items_description.ticket_quantity,
                  0
                )}{" "}
                Tickets Buyed
              </p>
              {trasactionData?.items_description.map((data) => {
                return (
                  <div className=" flex items-center justify-between">
                    <p className=" text-sm">
                      {data.ticket_quantity + " " + data.ticket_category} Ticket
                    </p>
                    <p className="text-lg font-semibold">
                      {" "}
                      Rp. {data.subtotal}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className=" flex justify-center items-center">
              <p className="text-lg font-semibold">Total</p>
              <p className="text-lg font-semibold">
                Rp. {trasactionData?.grand_total}
              </p>
            </div>
            <div className=" flex justify-center items-center">
              <label
                htmlFor="my-modal-3"
                className="btn ml-2 bg-button mt-10 text-md rounded-lg"
              >
                Detail Transaction
              </label>
            </div>
          </div>
        ) : cookie.uname == data?.hosted_by ? (
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
                          Rp. {data.ticket_price}
                          <span className=" text-xs ">/ticket</span>
                        </p>
                        <p className=" font-semibold">{data.ticket_category}</p>
                      </div>
                      <div className="2-[20%] flex">
                        <p className=" self-center">
                          {data.ticket_quantity} Ticket
                        </p>
                      </div>
                      <div className=" flex justify-around w-[20%]">
                        <button
                          onClick={() =>
                            handleUpdateMinus(
                              data.ticket_category,
                              data.ticket_quantity,
                              data.ticket_price
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
                        <p className=" self-center">{data.ticket_quantity}</p>
                        <button
                          onClick={() =>
                            handleUpdatePlus(
                              data.ticket_category,
                              data.ticket_quantity,
                              data.ticket_price
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
                {join &&
                data?.status !== "close" &&
                ticketDatas.reduce(
                  (totals, tickets) => totals + tickets.ticket_quantity,
                  0
                ) !== 0 ? (
                  <button
                    className="btn ml-2 bg-button mt-10 text-lg rounded-lg"
                    onClick={(e) => handleJoin()}
                  >
                    Join Now
                  </button>
                ) : (
                  <button
                    disabled
                    className="btn ml-2 bg-button mt-10 text-lg rounded-lg"
                    onClick={(e) => handleJoin()}
                  >
                    Join Now
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {attending ? (
          ""
        ) : (
          <div>
            <div className="m-4">
              <p className=" text-lg font-bold ">Attendees</p>
              <div className=" grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 min-[400px]:grid-cols-2 text-lg font-semibold">
                {data?.attendances !== undefined ? (
                  data.attendances.length > 0 ? (
                    data?.attendances.map((data) => {
                      return (
                        <div className=" flex flex-col justify-center items-center p-10">
                          <img
                            src={data.user_picture}
                            className=" w-full h-full max-w-[5rem] max-h-[5rem] mask mask-circle shadow-2xl object-fill"
                          />
                          <p>{data.username}</p>
                        </div>
                      );
                    })
                  ) : (
                    <div className=" font-normal text-base w-full">
                      <p>No User Joining this event yet</p>
                    </div>
                  )
                ) : (
                  "No Data"
                )}
              </div>
            </div>
            <div className="m-4">
              <p className=" text-lg font-bold ">Comments</p>
              <div className="lg:px-[2rem]">
                {cookie.uname != data?.hosted_by ? (
                  <div className="flex items-center mb-5">
                    <div className=" flex-initial max-w-[5rem]">
                      <img
                        src={cookie.image}
                        className="lg:block md:block sm:hidden min-[400px]:hidden w-full h-full max-w-md max-h-[28rem] mask mask-circle shadow-2xl object-cover"
                      />
                    </div>
                    <div className="flex-1 bg-[#F7F8F9] flex p-5 items-center justify-between">
                      <textarea
                        placeholder="Enter a comment ..."
                        className="textarea textarea-bordered textarea-md w-full max-w-2xl"
                        onChange={(e) =>
                          setReview({ ...review, review: e.target.value })
                        }
                      ></textarea>
                      <button
                        className="btn ml-2 bg-button rounded-lg"
                        onClick={(e) => handleComment()}
                      >
                        comment
                      </button>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {data?.reviews ? (
                  data.reviews.length > 0 ? (
                    data?.reviews.map((data) => {
                      return (
                        <div className="flex items-center">
                          <div className=" flex-initial w-[5rem] h-20">
                            <img
                              src={data.user_picture}
                              className="lg:block md:block sm:hidden min-[400px]:hidden max-w-[100%] max-h-[100%] mask mask-circle shadow-2xl object-fill"
                            />
                          </div>
                          <div className="bg-[#F7F8F9] flex p-5 flex-col">
                            <p className=" text-lg font-bold">
                              {data.username}
                            </p>
                            <p>{data.review}</p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className=" font-normal text-base w-full">
                      <p>No Comment on This Event</p>
                    </div>
                  )
                ) : (
                  "No Data"
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      {/* modal */}
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div className=" flex flex-col text-xs text-[#667085]">
            <h3 className="text-lg font-bold text-black">Detail Transaction</h3>
            <div className=" flex justify-around">
              <div className=" flex-col">
                <p>TO:</p>
                <p className=" text-base text-button font-semibold">
                  {data?.hosted_by}
                </p>
                <p> </p>
              </div>
              <div className=" flex-col">
                <p>FROM:</p>
                <p className=" text-base text-button font-semibold">
                  {trasactionData?.attendee}
                </p>
                <p>{trasactionData?.attendee_email}</p>
              </div>
            </div>
            <p>INFO</p>
            <p className=" text-base text-button font-semibold">
              Amount: Rp. {trasactionData?.grand_total}
            </p>
            <div className="flex">
              <div className="flex flex-col">
                <p>Invoice</p>
                <p>Event Date</p>
                <p>Event Time</p>
                <p>Status</p>
                <p>Payment Method</p>
              </div>
              <div className="flex flex-col">
                <p> : {trasactionData?.event_date}</p>
                <p> : {trasactionData?.event_time}</p>
                <p> : {trasactionData?.status}</p>
                <p> : {trasactionData?.payment_method}</p>
              </div>
            </div>
            <div className="flex items-center">
              <p>Subject : </p>
              <p className=" text-base text-button font-semibold">
                {trasactionData?.title}
              </p>
            </div>
            <div className="flex justify-between border-b-2 border-black pb-3">
              <div className="flex flex-col">
                <p>ITEM DESCRIPTION</p>
                {trasactionData?.items_description.map((data) => {
                  return (
                    <p className=" text-sm text-button font-semibold mt-3">
                      {data.ticket_category} Ticket
                    </p>
                  );
                })}
              </div>
              <div className="flex flex-col">
                <p>QTY</p>
                {trasactionData?.items_description.map((data) => {
                  return (
                    <p className=" text-sm text-button font-semibold mt-3">
                      {data.ticket_quantity}
                    </p>
                  );
                })}
              </div>
              <div className="flex flex-col">
                <p>RATE</p>
                {trasactionData?.items_description.map((data) => {
                  return (
                    <p className=" text-sm text-button font-semibold mt-3">
                      {data.ticket_price}
                    </p>
                  );
                })}
              </div>
              <div className="flex flex-col">
                <p>AMOUNT</p>
                {trasactionData?.items_description.map((data) => {
                  return (
                    <p className=" text-sm text-button font-semibold mt-3">
                      {data.subtotal}
                    </p>
                  );
                })}
              </div>
            </div>
            <div className="flex justify-between mt-3">
              <p className="text-sm text-button font-semibold">Total</p>
              <p className=" text-sm text-button font-semibold">
                Rp. {trasactionData?.grand_total}
              </p>
            </div>
            <div className="flex justify-center">
              <PDFDownloadLink
                className="btn ml-2 bg-button mt-10 text-md rounded-lg"
                document={
                  <PDFDocument
                    title={trasactionData?.title}
                    to={trasactionData?.seller}
                    from={trasactionData?.attendee}
                    amount={trasactionData?.grand_total}
                    invoice={trasactionData?.invoice}
                    event_date={trasactionData?.event_date}
                    event_time={trasactionData?.event_time}
                    status={trasactionData?.status}
                    payment_method={trasactionData?.payment_method}
                    grand_total={trasactionData?.grand_total}
                    event_picture={data?.event_picture}
                    item_description={trasactionData?.items_description}
                  />
                }
                fileName="document.pdf"
              >
                {({ blob, url, loading, error }) =>
                  loading ? "Loading document..." : "Print PDF!"
                }
              </PDFDownloadLink>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailEvent;
