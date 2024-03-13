import React, { useState } from "react";
import { toast } from "react-toastify";
import { Registration } from "../../../service/service";

const RegisterComponent = (props) => {
  const { toogleRegister } = props;
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (
      e.target.email.value &&
      e.target.password.value &&
      e.target.name.value
    ) {
      setLoading(true);
      const data = {
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value,
      };

      const response = await Registration(data);

      if (response && response.isSuccess) {
        toast.success("Registration Success! Please Login", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000,
        });
        toogleRegister();
      } else {
        toast.error(`${response?.data?.toString()}!`, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000,
        });
      }

      setLoading(false);
    }
  };

  return (
    <div className="bg-conic-to-r from-red-900 via-violet-200 to-orange-500 w-96 shadow-xl rounded p-5">
      <h1 className="text-3xl font-medium">Register</h1>
      <p className="text-sm">Enter all the information and get started!</p>
      <form className="space-y-5 mt-5" onSubmit={handleRegister}>
        <input
          type="text"
          required
          autocomplete="name"
          name="name"
          className="w-full h-10 border border-gray-800 rounded px-3"
          placeholder="Full Name"
        />
        <input
          type="text"
          required
          autocomplete="email"
          name="email"
          className="w-full h-10 border border-gray-800 rounded px-3"
          placeholder="Email"
        />
        <input
          type="password"
          required
          autocomplete="password"
          name="password"
          className="w-full h-10 border border-gray-800 rounded px-3"
          placeholder="Password"
        />

        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={loading}
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <svg
              className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
          {loading ? "LOADING" : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterComponent;
