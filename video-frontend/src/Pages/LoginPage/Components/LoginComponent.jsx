import jwtDecode from "jwt-decode";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Providers/AuthProvider";
import { Login } from "../../../service/service";
import setAuthToken from "../../../service/setAuthToken";
import queryString from "query-string";

const LoginComponent = (props) => {
  const { setUser } = useContext(AuthContext);
  const { history, location } = props;
  const [loading, setLoading] = useState(false);
  const { redirect } = queryString.parse(location.search);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (e.target.email.value && e.target.password.value) {
      setLoading(true);
      const data = {
        email: e.target.email.value,
        password: e.target.password.value,
      };

      try {
        const response = await Login(data);

        if (response && response.isSuccess) {
          toast.success("Login Success!", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 3000,
          });
          const token = response.data.token;
          localStorage.setItem("auth_token", token);
          setAuthToken(token);
          const user = jwtDecode(token);
          setUser(user);
          history.push(redirect ? redirect : "/");
        } else {
          toast.error(`${response.data.toString()}!`, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 3000,
          });
        }
      } catch (error) {
        toast.error(`Network Error!`, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000,
        });
      }

      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-sky-400 via-rose-400 to-lime-400 w-96 shadow-xl rounded p-5">
      <h1 className="text-3xl font-medium">Sign In</h1>
      <p className="text-sm">Enter your email and password!</p>
      <form className="space-y-5 mt-5" onSubmit={handleLogin}>
        <input
          type="text"
          autocomplete="email"
          name="email"
          className="w-full h-10 border border-gray-800 rounded px-3"
          placeholder="Email"
          required
        />
        <input
          type="password"
          autocomplete="password"
          name="password"
          className="w-full h-10 border border-gray-800 rounded px-3"
          placeholder="Password"
          required
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
          {loading ? "LOADING" : "Sign in"}
        </button>
      </form>
    </div>
  );
};

export default LoginComponent;
