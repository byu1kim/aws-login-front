import { useState, useContext } from "react";
import Form from "../components/Form";
import { AuthContext } from "../components/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [edit, setEdit] = useState(false);
  console.log(user);
  return (
    <section>
      <h1 className="text-center text-rose-500 p-3 text-2xl">Profile</h1>
      {edit ? (
        <>
          <Form user={user} formType={"edit"} />
        </>
      ) : (
        <ul className="mx-auto flex flex-col m-5 p-5">
          <li>Name : {user && user.username}</li>
          <li>Email : {user && user.email} </li>
          <li>
            Profile Image : <img src={user && user.profileImg} alt="Profile" />
          </li>
          <button
            onClick={() => setEdit(true)}
            className="bg-rose-200 w-40 m-3 mx-auto hover:cursor-pointer hover:bg-rose-400"
          >
            Edit
          </button>
        </ul>
      )}
    </section>
  );
};

export default Profile;
