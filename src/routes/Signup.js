import Form from "../components/Form";

const Signup = () => {
  // localStorage.clear();
  return (
    <section>
      <h1 className="text-center text-rose-500 p-3 text-2xl">SignUp</h1>
      <Form formType={"signup"} />
    </section>
  );
};

export default Signup;
