import withReactContent from "sweetalert2-react-content";
import Layout from "@/components/Layout";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import Swal from "@/utils/Swal";

interface localType {
  event_id: number;
  items_description: {
    ticket_id: number;
    ticket_category: string;
    ticket_price: number;
    ticket_quantity: number;
    subtotal: number;
  }[];
  grandtotal: number;
  title_event: string;
  title_image: string;
  payment_method: string;
}

const Payment: FC = () => {
  const navigate = useNavigate();
  const [cookie, , removeCookie] = useCookies(["token", "uname"]);
  const getToken = cookie.token;
  const MySwal = withReactContent(Swal);
  const [localData, setLocalData] = useState<localType>();
  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    const data: string | null = localStorage.getItem("ticket_data");
    if (data !== null) {
      setLocalData(JSON.parse(data));
    }
  }

  function handlePay() {
    const data = {
      event_id: localData?.event_id,
      item_description: localData?.items_description,
      grandtotal: localData?.grandtotal,
      payment_method: "Virtual Account BCA",
    };

    // axios
    //   .post("transactions", data, {
    //     headers: {
    //       Authorization: `Bearer ${getToken}`,
    //     },
    //   })
    axios({
      method: "post",
      url: `https://peterzalai.biz.id/transactions`,
      data: data,
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    })
      .then((res) => {
        const { message, data } = res.data;
        let array: type[] = [];
        console.log(data);

        interface type {
          id?: number;
          event_id?: number;
          username: string;
        }
        const trans: string | null = localStorage.getItem("newTrans");
        if (trans !== null) {
          array = JSON.parse(trans);
        }
        const transactionLocal = {
          id: data.invoice,
          event_id: localData?.event_id,
          username: cookie.uname,
        };
        array.push(transactionLocal);

        const paymentData = {
          invoice: data.invoice,
          gross_amount: localData?.grandtotal,
        };

        localStorage.setItem("newTrans", JSON.stringify(array));
        console.log(transactionLocal);
        axios({
          method: "post",
          url: `https://peterzalai.biz.id/payments`,
          data: paymentData,
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        })
          .then((res) => {
            const { data, message } = res.data;
            console.log(message);
            console.log(data);
            MySwal.fire({
              title: "Success",
              text: `Please Save this VA number ${data.Va_Numbers}  for Your Payment Before Close This`,
              showCancelButton: false,
            }).then((result) => {
              if (result.isConfirmed) {
                navigate(`/detail-event/${localData?.event_id}`);
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
        localStorage.removeItem("ticket_data");
        // navigate(`detail-event/${localData?.event_id}`);
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
      <div className="lg:p-10">
        {" "}
        <p className=" text-2xl font-bold text-button">Payment</p>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-10">
          <div className="card card-side bg-[#F7F8F9] px-5 rounded-xl">
            <figure className=" w-2/4">
              <img
                src={localData?.title_image}
                alt="Movie"
                className=" rounded-lg"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{localData?.title_event}</h2>
              <p>
                {localData?.items_description.reduce(
                  (totals, tickets) => totals + tickets.ticket_quantity,
                  0
                )}{" "}
                Tickets
              </p>
              <div className="mt-5">
                <p className=" text-lg">Total</p>
                <p className=" text-xl font-semibold">
                  Rp. {localData?.grandtotal}
                </p>
              </div>
            </div>
          </div>
          <div className="px-10 flex flex-col items-center">
            <p className=" text-lg font-medium">Choose Payment Method</p>
            <div className="bg-[#D6BBFB] w-full flex p-5 justify-start items-start rounded-lg">
              <figure className=" w-[15%]">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/2560px-Bank_Central_Asia.svg.png"
                  alt="Movie"
                  className=" rounded-lg"
                />
              </figure>
              <p className="ml-10 font-medium">BCA Virtual Account</p>
            </div>
            <select className=" border-2 rounded-lg p-2 mt-5 w-full">
              <option selected>BNI Virtual Account</option>
            </select>
            <button
              className="mt-10 text-lg text-white bg-red-600 p-5 rounded-lg font-medium"
              onClick={handlePay}
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Payment;
