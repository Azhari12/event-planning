import withReactContent from "sweetalert2-react-content";
import { useState, FC, useEffect } from "react";
import Layout from "@/components/Layout";
import Card from "@/components/Card";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "@/utils/Swal";
import { useCookies } from "react-cookie";

interface datasType {
  event_id: number;
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
  const [numberPage, setNumberPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [cateogry, setCategory] = useState<string>("");

  useEffect(() => {
    fetchData();
  }, [numberPage, cateogry]);

  function fetchData() {
    // axios
    //   .get(`events?page=${numberPage}`, {
    //     headers: {
    //       Authorization: `Bearer ${getToken}`,
    //     },
    //   })
    axios({
      method: "get",
      url: `https://peterzalai.biz.id/events?page=${numberPage}&category=${cateogry}`,
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    })
      .then((response) => {
        const { data, message, pagination } = response.data;
        setDatas(data);
        setTotalPage(pagination.total_pages);
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

  function handlePage(n: number) {
    const temp = numberPage + n;
    if (temp >= 1 && temp <= totalPage) {
      setNumberPage(temp);
    }
  }

  return (
    <Layout>
      <div className=" flex w-full sm:flex-col md:flex-row min-[400px]:flex-col">
        <div className=" flex-initial lg:w-[25%] md:w-[25%] sm:flex-row min-[400px]:w-full">
          <div>
            <p className=" font-semibold">Event Categories</p>
            <div className="grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-4 min-[400px]: grid-cols-2">
              {cateogry == "Music" ? (
                <button
                  className=" bg-[#A3C7FF] p-3 w-full text-start flex transition-all"
                  onClick={(e) => setCategory("Music")}
                >
                  Music
                </button>
              ) : (
                <button
                  className="p-3 w-full text-start flex transition-all"
                  onClick={(e) => setCategory("Music")}
                >
                  Music
                </button>
              )}

              {cateogry == "Art" ? (
                <button
                  className=" bg-[#A3C7FF] p-3 w-full text-start flex transition-all"
                  onClick={(e) => setCategory("Art")}
                >
                  Art
                </button>
              ) : (
                <button
                  className="p-3 w-full text-start flex transition-all"
                  onClick={(e) => setCategory("Art")}
                >
                  Art
                </button>
              )}
              {cateogry == "Games" ? (
                <button
                  className=" bg-[#A3C7FF] p-3 w-full text-start flex transition-all"
                  onClick={(e) => setCategory("Games")}
                >
                  Games
                </button>
              ) : (
                <button
                  className="p-3 w-full text-start flex transition-all"
                  onClick={(e) => setCategory("Games")}
                >
                  Games
                </button>
              )}
              {cateogry == "Sport" ? (
                <button
                  className=" bg-[#A3C7FF] p-3 w-full text-start flex transition-all"
                  onClick={(e) => setCategory("Sport")}
                >
                  Sport
                </button>
              ) : (
                <button
                  className="p-3 w-full text-start flex transition-all"
                  onClick={(e) => setCategory("Sport")}
                >
                  Sport
                </button>
              )}
            </div>
          </div>
        </div>
        <div className=" flex-1">
          <div className=" flex flex-col">
            {datas.map((data) => {
              return (
                <Link to={`/detail-event/${data.event_id}`}>
                  <Card
                    id={data.event_id}
                    name={data.title}
                    hosted_by={data.hosted_by}
                    date={data.date}
                    time={data.time}
                    status={data.status}
                    location={data.location}
                    details={data.description}
                    event_picture={data.event_picture}
                  />
                </Link>
              );
            })}
          </div>
          {totalPage > 1 ? (
            <div className="btn-group w-full justify-center items-center p-10">
              <button
                className="btn bg-white text-button border-none hover:bg-gradient-to-r"
                onClick={(e) => handlePage(-1)}
              >
                «
              </button>
              <button className="btn bg-white text-button border-none hover:bg-gradient-to-r">
                Page {numberPage}
              </button>
              <button
                className="btn bg-white text-button border-none hover:bg-gradient-to-r"
                onClick={(e) => handlePage(1)}
              >
                »
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
