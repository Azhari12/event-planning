import { Input } from "@/components/Input";
import { FC, useState, useEffect } from "react";

const Auth: FC = () => {
  const [register, setRegister] = useState<boolean>(false);

  useEffect(() => {
    buttonRegister(register);
    console.log(register);
  }, [register]);

  function buttonRegister(bool: boolean) {
    return setRegister(bool);
  }

  return (
    <div className=" container mx-auto py-14 h-screen poppin ">
      <div className=" grid lg:grid-cols-2 sm:grid-cols-1 h-full">
        <div className="flex justify-center h-full max-h-[600px] min-[400px]:hidden sm:hidden lg:block">
          <img
            src="/event.jpg"
            alt=""
            className=" objec-fill w-full h-full rounded-3xl"
          />
        </div>
        <div className=" flex flex-col h-full items-center md:px-20 lg:px-20 min-[400px]:px-0 ">
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
              <form action="" className=" transition-all">
                <Input
                  label="Email"
                  type="text"
                  placeholder="Enter your Email"
                />
                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter your Password"
                />
                <div className=" flex justify-end transition-all">
                  <button className=" bg-button px-10 py-2 text-white rounded-3xl transition-all mt-5">
                    Login
                  </button>
                </div>
              </form>
            ) : (
              <form action="" className=" transition-all">
                <Input
                  label="Email"
                  type="text"
                  placeholder="Enter your Email"
                />
                <Input
                  label="Username"
                  type="text"
                  placeholder="Enter your Username"
                />
                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter your Password"
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
