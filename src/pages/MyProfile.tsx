import withReactContent from "sweetalert2-react-content";
import Layout from "@/components/Layout";
import axios from "axios";
import { FC, useEffect, useState, FormEvent } from "react";
import { useCookies } from "react-cookie";
import Swal from "@/utils/Swal";
import { Input } from "@/components/Input";
import { useNavigate } from "react-router-dom";
interface userType {
  username?: string;
  email?: string;
  phone?: string;
  password?: string;
  image?: any;
}

const MyProfile: FC = () => {
  const MySwal = withReactContent(Swal);
  const [cookie, setCookie, removeCookie] = useCookies([
    "token",
    "uname",
    "image",
  ]);
  const getToken = cookie.token;
  const [data, setData] = useState<userType>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [objSubmit, setObjSubmit] = useState<Partial<userType>>({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [isEdit]);

  function fetchData() {
    axios({
      method: "get",
      url: `https://peterzalai.biz.id/users`,
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    })
      .then((res) => {
        const { data, message } = res.data;
        setData(data);
        setObjSubmit(data);
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

  function handleChange(value: string | File, key: keyof typeof objSubmit) {
    let temp = { ...data }; // duplikat state objSubmit yang nantinya akan dimutasi nilainya
    temp[key] = value;
    // temp["username"] = data.username;
    setObjSubmit(temp);
    console.log("temp", temp);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData();
    let key: keyof typeof objSubmit;
    // console.log(objSubmit);
    for (key in objSubmit) {
      formData.append(key, objSubmit[key]);
      console.log(key, objSubmit[key]);
    }
    console.log(formData);

    console.log(objSubmit);

    // axios
    //   .put("users", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //       Authorization: `Bearer ${getToken}`,
    //     },
    //   })
    axios({
      method: "put",
      url: `https://peterzalai.biz.id/users`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getToken}`,
      },
    })
      .then((response) => {
        const { message } = response.data;
        MySwal.fire({
          title: "Success",
          text: message,
          showCancelButton: false,
        });
        setCookie("image", data?.image);
        setIsEdit(false);
        setObjSubmit({});
      })
      .catch((error) => {
        const { data } = error.response;
        MySwal.fire({
          title: "Failed",
          text: data.message,
          showCancelButton: false,
        });
      })
      .finally(() => fetchData());
  }

  function handleDelete() {
    MySwal.fire({
      title: "Delete",
      text: "Are you sure delete this account?",
    }).then((result) => {
      if (result.isConfirmed) {
        axios({
          method: "delete",
          url: `https://peterzalai.biz.id/users`,
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
            }).then((result) => {
              if (result.isConfirmed) {
                removeCookie("image");
                removeCookie("token");
                removeCookie("uname");
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
  return (
    <Layout>
      <div className="flex flex-col md:p-10">
        <p className=" text-2xl font-bold text-button">My Profile</p>
        <div className="hero">
          <div className="hero-content flex-col lg:flex-row w-full justify-start items-start">
            <div className=" w-1/2 flex justify-center">
              <img
                src={data?.image}
                className="max-w-sm  rounded-lg shadow-2xl"
              />
            </div>
            {!isEdit ? (
              <div className=" w-full md: ml-10 h-full flex flex-col">
                <h1 className="text-5xl font-bold">{data?.username}</h1>
                <div className="flex-initial h-full">
                  <p className="pt-6">{data?.phone}</p>
                  <p className="">{data?.email}</p>
                </div>
                <div className="flex md: mt-5">
                  <button
                    className=" bg-button text-white p-3 text-lg font-semibold rounded-lg"
                    onClick={(e) => setIsEdit(true)}
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      handleDelete();
                    }}
                    className=" text-red-600 p-3 text-lg font-semibold border-2 border-red-600 md:ml-5 rounded-lg"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            ) : (
              <div className=" flex flex-col justify-center px-10 w-1/2">
                <form
                  className=" transition-all"
                  onSubmit={(event) => handleSubmit(event)}
                >
                  <Input
                    defaultValue={data?.email}
                    label="Email"
                    type="text"
                    placeholder="Enter your Email"
                    onChange={(event) =>
                      handleChange(event.target.value, "email")
                    }
                  />
                  <Input
                    defaultValue={data?.username}
                    label="Username"
                    type="text"
                    placeholder="Enter your Username"
                    onChange={(event) =>
                      handleChange(event.target.value, "username")
                    }
                  />
                  <Input
                    defaultValue={data?.phone}
                    label="Phone"
                    type="text"
                    placeholder="Enter your Phone Number"
                    onChange={(event) =>
                      setObjSubmit({ ...objSubmit, phone: event.target.value })
                    }
                  />
                  <Input
                    defaultValue={data?.phone}
                    label="Password"
                    type="password"
                    placeholder="Enter your Password"
                    onChange={(event) =>
                      handleChange(event.target.value, "password")
                    }
                  />
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
                        setData({
                          ...data,
                          image: URL.createObjectURL(
                            event.currentTarget.files[0]
                          ),
                        });
                        setObjSubmit({
                          ...objSubmit,
                          image: event.currentTarget.files[0],
                        });
                      }}
                    />
                  </div>
                  <div className="flex md: mt-5">
                    <button
                      className=" text-button p-3 text-lg font-semibold rounded-lg border-2"
                      onClick={(e) => setIsEdit(false)}
                    >
                      Back
                    </button>
                    <button className=" text-white bg-button p-3 text-lg font-semibold md:ml-5 rounded-lg">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyProfile;
