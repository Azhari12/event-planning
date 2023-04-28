import withReactContent from "sweetalert2-react-content";
import { useState, FC, useEffect } from "react";
import Layout from "@/components/Layout";
import Card from "@/components/Card";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "@/utils/Swal";
import { useCookies } from "react-cookie";

interface datasType {
  id: number;
  title: string;
  hosted_by: string;
  date: string;
  time: string;
  status: string;
  location: string;
  description: string;
  event_picture: string;
}

const Home: FC = () => {
  const [datas, setDatas] = useState<datasType[]>([]);
  const MySwal = withReactContent(Swal);
  const [cookie, , removeCookie] = useCookies(["token", "uname"]);
  const getToken = cookie.token;

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios
      .get("events?page=1", {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then((response) => {
        const { data, message } = response.data;
        alert(data);
        setDatas(data);
      })
      .catch((er) => {
        const { message } = er.response.data;
        MySwal.fire({
          title: "Failed",
          text: message,
          showCancelButton: false,
        });
      });
  }

  return (
    <Layout>
      <div className=" flex w-full sm:flex-col md:flex-row min-[400px]:flex-col">
        <div className=" flex-initial lg:w-[25%] md:w-[25%] sm:flex-row min-[400px]:w-full">
          <div>
            <p className=" font-semibold">Event Categories</p>
            <div className="grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-4 min-[400px]: grid-cols-2">
              <label className="label cursor-pointer justify-start">
                <input type="checkbox" className="checkbox w-4 h-4 mx-8" />
                <span className="label-text">Music</span>
              </label>
              <label className="label cursor-pointer justify-start">
                <input type="checkbox" className="checkbox w-4 h-4 mx-8" />
                <span className="label-text">Art</span>
              </label>
              <label className="label cursor-pointer justify-start">
                <input type="checkbox" className="checkbox w-4 h-4 mx-8" />
                <span className="label-text">Games</span>
              </label>
              <label className="label cursor-pointer justify-start">
                <input type="checkbox" className="checkbox w-4 h-4 mx-8" />
                <span className="label-text">Sport</span>
              </label>
            </div>
          </div>
        </div>
        <div className=" flex-1">
          <div className=" flex flex-col">
            {datas.map((data) => {
              return (
                <Link to={`/detail-event/${data.id}`}>
                  <Card
                    id={data.id}
                    name={data.title}
                    hosted_by={data.hosted_by}
                    date={data.date}
                    time={data.time}
                    status={data.status}
                    location={data.location}
                    details={data.description}
                    event_picture="https://asset.kompas.com/crops/R9w_RwfaUKKKYumZwqo_1qQSEEo=/0x0:0x0/750x500/data/photo/2022/06/29/62bc2a26e66c5.jpg"
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
