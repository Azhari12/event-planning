import withReactContent from "sweetalert2-react-content";
import { FC, useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import Card from "@/components/Card";
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

const MyEvents: FC = () => {
  const [page, setPage] = useState<string>("attending");
  const [datas, setDatas] = useState<datasType[]>([]);
  const MySwal = withReactContent(Swal);
  const [cookie, , removeCookie] = useCookies(["token", "uname"]);
  const getToken = cookie.token;
  const [endPoint, setEndpoint] = useState<string>("attendances");

  useEffect(() => {
    fetchData();
  }, [page]);

  function handlePage(page: string) {
    setPage(page);
    if (page == "attending") {
      setEndpoint("attendances");
    } else {
      setEndpoint("events");
    }
  }

  function fetchData() {
    // axios
    //   .get(`/users/${endPoint}`, {
    //     headers: {
    //       Authorization: `Bearer ${getToken}`,
    //     },
    //   })
    axios({
      method: "get",
      url: `https://peterzalai.biz.id/users/${endPoint}`,
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    })
      .then((response) => {
        const { data, message } = response.data;
        console.log(data);
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
      <div className=" flex w-full sm:flex-col md:flex-row min-[400px]:flex-col p-10 transition-all">
        <div className=" flex-initial lg:w-[25%] md:w-[25%] sm:flex-row min-[400px]:w-full transition-all">
          <div>
            {page == "attending" ? (
              <p className=" text-4xl text-button font-bold lg:text-start sm:text-center min-[400px]:text-center">
                Attending
              </p>
            ) : (
              <p className=" text-4xl text-button font-bold lg:text-start sm:text-center min-[400px]:text-center">
                Hosting
              </p>
            )}

            {page == "attending" ? (
              <div className="flex lg:flex-col items-start mt-5  font-semibold">
                <button
                  className=" bg-[#A3C7FF] p-3 w-full text-start flex transition-all"
                  onClick={(event) => handlePage("attending")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 mr-3"
                  >
                    <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                    <path
                      fillRule="evenodd"
                      d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Attending
                </button>
                <button
                  className=" p-3 w-full text-start flex transition-all"
                  onClick={(event) => handlePage("hosting")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 mr-3"
                  >
                    <path d="M19.006 3.705a.75.75 0 00-.512-1.41L6 6.838V3a.75.75 0 00-.75-.75h-1.5A.75.75 0 003 3v4.93l-1.006.365a.75.75 0 00.512 1.41l16.5-6z" />
                    <path
                      fillRule="evenodd"
                      d="M3.019 11.115L18 5.667V9.09l4.006 1.456a.75.75 0 11-.512 1.41l-.494-.18v8.475h.75a.75.75 0 010 1.5H2.25a.75.75 0 010-1.5H3v-9.129l.019-.006zM18 20.25v-9.565l1.5.545v9.02H18zm-9-6a.75.75 0 00-.75.75v4.5c0 .414.336.75.75.75h3a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Hosting
                </button>
              </div>
            ) : (
              <div className=" flex lg:flex-col items-start mt-5  font-semibold">
                <button
                  className="  p-3 w-full text-start flex transition-all"
                  onClick={(event) => handlePage("attending")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 mr-3"
                  >
                    <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                    <path
                      fillRule="evenodd"
                      d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Attending
                </button>
                <button
                  className=" bg-[#A3C7FF] p-3 w-full text-start flex transition-all"
                  onClick={(event) => handlePage("hosting")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 mr-3"
                  >
                    <path d="M19.006 3.705a.75.75 0 00-.512-1.41L6 6.838V3a.75.75 0 00-.75-.75h-1.5A.75.75 0 003 3v4.93l-1.006.365a.75.75 0 00.512 1.41l16.5-6z" />
                    <path
                      fillRule="evenodd"
                      d="M3.019 11.115L18 5.667V9.09l4.006 1.456a.75.75 0 11-.512 1.41l-.494-.18v8.475h.75a.75.75 0 010 1.5H2.25a.75.75 0 010-1.5H3v-9.129l.019-.006zM18 20.25v-9.565l1.5.545v9.02H18zm-9-6a.75.75 0 00-.75.75v4.5c0 .414.336.75.75.75h3a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Hosting
                </button>
              </div>
            )}
          </div>
        </div>
        <div className=" flex-1">
          <div className=" flex flex-col transition-all">
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
        </div>
      </div>
    </Layout>
  );
};

export default MyEvents;
