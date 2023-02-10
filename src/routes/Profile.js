import { useState, useContext } from "react";
import Form from "../components/Form";
import { AuthContext } from "../components/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [edit, setEdit] = useState(false);

  return (
    <section>
      Profile
      {edit ? (
        <>
          <Form user={user} formType={"edit"} setEdit={setEdit} />
        </>
      ) : (
        <ul>
          <li>Name : {user && user.username}</li>
          <li>Email : {user && user.email} </li>
          <li>Profile Image : {user && user.profileImg}</li>
          <button onClick={() => setEdit(true)}>Edit</button>
        </ul>
      )}
    </section>
  );
};

export default Profile;
