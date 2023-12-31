import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../../utils/axios";
import AuthContext from "../../context/AuthContext";

function Signup() {
  const { register, handleSubmit } = useForm();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    // console.log(data);
    try {
      const response = await axiosInstance.post("/signup", data);
      if (response.data.success) {
        const notify = () => toast.success("Signup successfully");
        notify();
        localStorage.setItem("token", response.data.token);
        login(response.data.user);
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.log(error);
      const notify = () => toast.error(error.response.data.message);
      notify();
    }
  };

  return (
    <section className="flex justify-center pt-12 mb-12">
      <div className="border p-4 rounded shadow-md">
        <div className="mb-8 my-4">
          <h2 className="text-3xl font-bold text-center">
            <span className="text-[#5273df]">Task Management App</span>
          </h2>
        </div>
        <h1 className="text-2xl font-bold text-[#5e5d5d]">Sign Up</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="text-[#9796A1] w-[400px] flex flex-col mt-3"
        >
          <div className="my-2">
            <label className="text-left" htmlFor="fullname">
              Name
            </label>
            <br />
            <input
              {...register("name", { required: true })}
              className="focus:ring-1 focus:outline-none focus:ring-[#5273df] w-full h-12 rounded-lg pl-3 text-black border mt-2"
              type="text"
              placeholder="Your full name"
            />
          </div>
          <div className="my-2">
            <label className="text-left" htmlFor="email">
              E-mail
            </label>
            <br />
            <input
              {...register("email", { required: true })}
              className="focus:ring-1 focus:outline-none focus:ring-[#5273df] w-full h-12 rounded-lg pl-3 text-black border mt-2"
              type="email"
              placeholder="Your email"
            />
          </div>
          <div className="my-2">
            <label className="text-left" htmlFor="password">
              Password
            </label>
            <br />
            <input
              {...register("password", { required: true })}
              className="focus:ring-1 focus:outline-none focus:ring-[#5273df] w-full h-12 rounded-lg pl-3 text-black border mt-2"
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="flex justify-center mt-8">
            <input
              className="uppercase bg-[#5273df] hover:bg-[#3e56a3] font-medium text-white rounded-full w-1/2 py-[10px] cursor-pointer transition-all duration-500 ease-in-out"
              type="submit"
              value="Sign Up"
            />
          </div>
        </form>
        <p className="my-4 text-center">
          Already have an account?{" "}
          <Link className="text-[#496bda]" to="/login">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Signup;
