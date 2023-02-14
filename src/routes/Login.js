import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../components/AuthContext";

const Login = () => {
  const { updateToken } = useContext(AuthContext);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await axios.post("/api/login", {
      email: email,
      password: password,
    });

    if (data.data.message) {
      setMessage(data.data.message);
    } else {
      updateToken(data.data);
    }
  };

  return (
    <section>
      <h1 className="text-center text-rose-500 p-3 text-2xl">LogIn</h1>
      <form onSubmit={handleSubmit} className="p-5 flex flex-col mx-auto max-w-xl bg-gray-200">
        <label htmlFor="email">Email</label>
        <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="bg-rose-200 w-40 m-3 mx-auto hover:cursor-pointer hover:bg-rose-400">
          Log In
        </button>
      </form>
      <p className="text-red-600">{!!message && message}</p>
    </section>
  );
};

export default Login;
