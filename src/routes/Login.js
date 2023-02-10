import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../components/AuthContext";
import Profile from "../routes/Profile";

const Login = () => {
  const { token, updateToken } = useContext(AuthContext);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await axios.post("/api/login", {
      email: email,
      password: password,
    });

    updateToken(data.data);
  };

  if (!token) {
    return (
      <section>
        <h1>LogIn</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Log In</button>
        </form>
      </section>
    );
  } else {
    return <Profile />;
  }
};

export default Login;
