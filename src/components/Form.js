import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

// Handle forms : Sing Up, Edit Profile
const Form = ({ formType }) => {
  const navigate = useNavigate();
  const { token, user, updateToken } = useContext(AuthContext);

  // Form inputs
  const [email, setEmail] = useState(user ? user.email : "");
  const [password, setPassword] = useState();
  const [profileImg, setProfileImg] = useState();
  const [username, setUsername] = useState(user ? user.username : "");

  // Get the token from local storage
  const authHeader = { Authorization: `Bearer ${token}` };

  // Pass the form data to POST(Signup), PUT(Edit profile)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profileImg", profileImg);

    // Case 1. Sign up
    if (formType === "signup") {
      const signupUser = await axios.post("/api/signup", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(signupUser.data);
      updateToken(signupUser.data);

      // Case 2. Edit Profile
    } else {
      console.log(authHeader);
      const updatedUser = await axios.put("/api/updateProfile", formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      updateToken(updatedUser.data);
      navigate("/profile");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 flex flex-col mx-auto max-w-xl bg-gray-200">
      <label htmlFor="username">Name</label>
      <input
        type="text"
        name="username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        required
      />
      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        disabled={formType === "signup" ? "" : true}
        required
      />

      {formType === "signup" ? (
        <>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} required />
        </>
      ) : (
        ""
      )}

      <label htmlFor="profileImg">Profile Photo</label>
      <input type="file" name="profileImg" onChange={(e) => setProfileImg(e.target.files[0])} />
      <button type="submit" className="bg-rose-200 w-40 m-3 mx-auto hover:cursor-pointer hover:bg-rose-400">
        {formType === "signup" ? "SingUp" : "Edit"}
      </button>
    </form>
  );
};

export default Form;
