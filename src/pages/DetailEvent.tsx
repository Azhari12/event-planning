import Layout from "@/components/Layout";
import { FC, useState, useEffect } from "react";

interface tikcetType {
  default_price: number;
  price: number;
  name: string;
  qty: number;
}

const DetailEvent: FC = () => {
  const tickets: tikcetType[] = [];
  const [tiecketArray, setTicetArray] = useState<tikcetType[]>([]);
  const [tikectselect, setTicketSelect] = useState<string>("");
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    console.log(tikectselect);
    console.log(tiecketArray);

    // addTicket(tikectselect);
  }, [tiecketArray]);

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

    if (categories == "vip") {
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

  return (
    <Layout>
      <div className=" min-h-screen place-items-start lg:p-10">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src="/noah.jpg"
            className=" w-full h-full max-w-md max-h-[28rem] rounded-lg shadow-2xl object-cover"
          />
          <div className=" lg:pl-14">
            <h1 className="text-5xl font-bold capitalize">
              NOAH music concert
            </h1>
            <p className="py-6 text-[#4B5262]">
              Nowadays, it isn’t uncommon to see lenders rapidly adopting a
              digital lending strategy to streamline the lending process
              Gorgeous, high-quality design system for mobile, tablet & a few
              reasons digital Nowadays, it isn’t uncommon to see lenders rapidly
              adopting a digital lending strategy to streamline the lending
              process Gorgeous, high-quality design system for mobile, tablet &
              a few reasons digital Nowadays, it isn’t uncommon to see lenders
              rapidly adopting a digital lending strategy to streamline the
              lending process Gorgeous, high-quality design system for mobile,
              tablet & a few reasons digital
            </p>
            <div className=" flex justify-around text-lg font-bold">
              <div className=" w-48">
                <p>100 Joined</p>
                <p className="text-[#4B5262] text-sm font-normal">
                  100 People were joined this event, we still waiting
                </p>
              </div>
              <div>
                <p>400 Ticket Alvailable</p>
                <p className="text-[#4B5262] text-sm font-normal">
                  Don't let you run out of tickets
                </p>
              </div>
            </div>
            <div className=" flex flex-col border-2 rounded-lg p-5 mt-5">
              <p className=" font-bold tex-md">Time</p>
              <p>Monday, April 17 | 07.00 PM</p>
              <p className=" font-bold tex-md">Location</p>
              <p>Gelora Bung Karno - Jakarta</p>
              <p className=" font-bold tex-md mt-10">Hosted by NOAH</p>
            </div>
          </div>
        </div>
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
                  <option value={"vip"}>V.I.P.</option>
                  <option value={"reguler"}>Reguler</option>
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
        <div className="m-4">
          <p className=" text-lg font-bold ">Attendees</p>
          <div className=" grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 min-[400px]:grid-cols-2 text-lg font-semibold">
            <div className=" flex flex-col justify-center items-center p-10">
              <img
                src="/kirito.jpg"
                className=" w-full h-full max-w-md max-h-[28rem] mask mask-circle shadow-2xl object-fill"
              />
              <p>kirito</p>
            </div>
            <div className=" flex flex-col justify-center items-center p-10">
              <img
                src="/kirito.jpg"
                className=" w-full h-full max-w-md max-h-[28rem] mask mask-circle shadow-2xl object-fill"
              />
              <p>kirito</p>
            </div>
            <div className=" flex flex-col justify-center items-center p-10">
              <img
                src="/kirito.jpg"
                className=" w-full h-full max-w-md max-h-[28rem] mask mask-circle shadow-2xl object-fill"
              />
              <p>kirito</p>
            </div>
            <div className=" flex flex-col justify-center items-center p-10">
              <img
                src="/kirito.jpg"
                className=" w-full h-full max-w-md max-h-[28rem] mask mask-circle shadow-2xl object-fill"
              />
              <p>kirito</p>
            </div>
            <div className=" flex flex-col justify-center items-center p-10">
              <img
                src="/kirito.jpg"
                className=" w-full h-full max-w-md max-h-[28rem] mask mask-circle shadow-2xl object-fill"
              />
              <p>kirito</p>
            </div>
          </div>
        </div>
        <div className="m-4">
          <p className=" text-lg font-bold ">Comments</p>
          <div className="lg:px-[2rem]">
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
            <div className="flex items-center">
              <div className=" flex-initial max-w-[10rem]">
                <img
                  src="/kirito.jpg"
                  className="lg:block md:block sm:hidden min-[400px]:hidden w-full h-full max-w-md max-h-[28rem] mask mask-circle shadow-2xl object-cover"
                />
              </div>
              <div className="bg-[#F7F8F9] flex p-5 flex-col">
                <p className=" text-lg font-bold">Jenny</p>
                <p>
                  Lorem ipsum dolor sit amet, coetur adipiscing elit ut aliquam,
                  purus sit amet luctus Lorem ipsum dolor sit amet aliquam,
                  purus sit amet luctus{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailEvent;
