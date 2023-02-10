import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

// Handle forms : Sing Up, Edit Profile
const Form = ({ formType, setEdit }) => {
  const navigate = useNavigate();
  const { token, user, updateToken, setLoading } = useContext(AuthContext);

  const [email, setEmail] = useState(user ? user.email : "");
  const [password, setPassword] = useState();
  const [profileImg, setProfileImg] = useState();
  const [username, setUsername] = useState(user ? user.username : "");

  // Get the token from local storage
  const authHeader = { Authorization: `Bearer ${token}` };

  // Pass the form data to POST(Signup), PUT(Edit profile)
  const handleSubmit = async (e) => {
    e.preventDefault(); // necessary
    const formData = new FormData();

    // Case 1. Sign up
    if (formType === "signup") {
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("profileImg", profileImg);

      await axios.post("/api/signup", formData, {
        header: { "Content-Type": "multipart/form-data" },
      });

      //fectch ( same as axios... and then add body:JOSN.stringfiy(Pemail, password {)}).then(res=>res.json())
      // axios returns data. you have to refer the retunrn axios result.data

      // Case 2. Edit Profile
    } else {
      const updatedUser = await axios.put("/api/username", { username: username }, { headers: authHeader });

      updateToken(updatedUser.data);
      if (updatedUser.data) {
        //        setLoading(true);
        navigate("/profile");
      }

      //setUser(updatedUser.data);
      //   if (profileImg) {
      //     await axios.post("/api/signup", formData, {
      //       header: {
      //         headers: authHeader,
      //         "Content-Type": "multipart/form-data",
      //       },
      //     });
      //   }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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

      <label htmlFor="profileImg">Email</label>
      <input type="file" name="profileImg" onChange={(e) => setProfileImg(e.target.files[0])} />
      <button type="submit">{formType === "signup" ? "SingUp" : "Edit"}</button>
    </form>
  );
};

export default Form;
