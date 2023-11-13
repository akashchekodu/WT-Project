import { useState } from "react";
import Login from "../Authentication/login/login";
import SignUp from "../Authentication/signup/signup";

const LoginSignup = () => {
  const [isLogin, setisLogin] = useState(true);
  return (
    <>
      {isLogin && <Login toggle={setisLogin} />}
      {!isLogin && <SignUp toggle={setisLogin} />}
    </>
  );
};

export default LoginSignup;
