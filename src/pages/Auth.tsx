import withReactContent from "sweetalert2-react-content";
import { Input } from "@/components/Input";
import React, { FC, useState, useEffect } from "react";
import Swal from "@/utils/Swal";
import axios from "axios";
import { Cookies, useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { handleAuth } from "@/utils/redux/reducers/reducer";
import { useNavigate } from "react-router-dom";

const Auth: FC = () => {
  const [register, setRegister] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [image, setImage] = useState<string>("https://peterzalai.jpg");
  const [cookie, setCookie, removeCookie] = useCookies([
    "token",
    "uname",
    "image",
  ]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    buttonRegister(register);
    console.log(register);
  }, [register, cookie]);

  function buttonRegister(bool: boolean) {
    return setRegister(bool);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const body = {
      email,
      username,
      phone,
      password,
      image,
    };

    // .post("register", body)
    axios({
      method: "post",
      url: "https://peterzalai.biz.id/register",
      data: body,
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
      });
  }

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const body = {
      email,
      password,
    };
    removeCookie("image");

    // axios
    //   .post("login", body)
    axios({
      method: "post",
      url: "https://peterzalai.biz.id/login",
      data: body,
    })
      .then((res) => {
        const { message, data } = res.data;
        MySwal.fire({
          title: "Success",
          text: message,
          showCancelButton: false,
        }).then((result) => {
          // axios
          //   .get("users", {
          //     headers: {
          //       Authorization: `Bearer ${data.token}`,
          //     },
          //   })
          axios({
            method: "get",
            url: "https://peterzalai.biz.id/users",
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
          }).then((res) => {
            const { data } = res.data;
            setCookie("uname", data.username);
            setCookie("image", data.image);
          });
          if (result.isConfirmed) {
            setCookie("token", data.token);
            dispatch(handleAuth(true));
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
    <div className=" container mx-auto py-14 h-screen poppin ">
      <div className=" grid lg:grid-cols-2 sm:grid-cols-1 h-full">
        <div className="flex justify-center h-full max-h-[600px] min-[400px]:hidden sm:hidden lg:block">
          <img
            src="/event.jpg"
            alt=""
            className=" objec-fill w-full h-[34rem] rounded-3xl"
          />
        </div>
        <div className=" flex flex-col min-[400px]:mb-10  md:mb-0 h-full items-center md:px-20 lg:px-20 min-[400px]:px-0 ">
          <div className=" w-full flex flex-col justify-center items-center">
            <p className=" text-4xl text-button font-bold text-right">
              Event Planning
            </p>

            <p className="text-center mb-5">Welcome to Event Planning</p>
            {register == false ? (
              <div className=" flex flex-row bg-[#C6DCFF] justify-around items-center p-2 rounded-3xl w-2/3">
                <button className=" bg-button  py-2 text-white rounded-3xl transition-all w-full">
                  Login
                </button>
                <button
                  className=" py-2 transition-all w-full"
                  onClick={(event) => buttonRegister(true)}
                >
                  Register
                </button>
              </div>
            ) : (
              <div className=" flex flex-row bg-[#C6DCFF] justify-around items-center p-2 rounded-3xl w-2/3">
                <button
                  className=" py-2 transition-all w-full"
                  onClick={(event) => buttonRegister(false)}
                >
                  Login
                </button>
                <button className=" bg-button  py-2 text-white rounded-3xl transition-all w-full">
                  Register
                </button>
              </div>
            )}
          </div>
          <div className=" flex flex-col justify-center px-10">
            <p className=" mt-5">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
            {register == false ? (
              <form
                onSubmit={(e) => handleLogin(e)}
                className=" transition-all"
              >
                <Input
                  label="Email"
                  type="text"
                  placeholder="Enter your Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter your Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className=" flex justify-end transition-all">
                  <button className=" bg-button px-10 py-2 text-white rounded-3xl transition-all mt-5">
                    Login
                  </button>
                </div>
              </form>
            ) : (
              <form
                onSubmit={(e) => handleSubmit(e)}
                className=" transition-all"
              >
                <Input
                  label="Email"
                  type="text"
                  placeholder="Enter your Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  label="Username"
                  type="text"
                  placeholder="Enter your Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                  label="Phone"
                  type="text"
                  placeholder="Enter your Phone Number"
                  onChange={(e) => setPhone(e.target.value)}
                />
                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter your Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className=" flex justify-end transition-all">
                  <button className=" bg-button px-10 py-2 text-white rounded-3xl transition-all mt-5">
                    Register
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
