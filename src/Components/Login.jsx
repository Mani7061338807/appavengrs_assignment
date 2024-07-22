import React, { useEffect, useState } from "react";
import loginImage from "../assets/loginImage.png";
import googleIcon from "../assets/googleIcon.png";
import wave from "../assets/wave.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [isSubmited, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const email_  = useSelector((state) => state.email);
  if (email_) {
    navigate("/site");
  }
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setpassword(e.target.value);
  };
  const handleGoogleLogin = async () => {
    // const res = await axios.get("http://localhost:3001/auth/google");
    window.location.href = "http://localhost:3001/auth/google";
    // console.log(res);
  };

  const redirectToSignup = () => {
    navigate("/signup");
  };
  return (
    <div className=" flex h-[100vh] w-full flex-col">
      <div className="flex gap-10 items-center mx-auto  w-[90%] h-full">
        <div className="h-[100%] flex items-center">
          <img className="h-[60%] mb-14" src={loginImage} alt="" />
        </div>
        <div className="flex w-[50%] flex-col items-center cursor-pointer">
          <div className="flex mb-4 w-[60%] flex-col rounded-lg">
            <input
              type="text"
              placeholder="Email"
              className="px-4 py-6 font-serif rounded-tr-xl rounded-tl-xl outline-none bg-[#E1E9EE] text-gray"
              onChange={handleEmail}
            />
            <div className="w-full h-[1px] bg-[#d1d1d1]"></div>
            <input
              type="text"
              onChange={handlePassword}
              placeholder="Password"
              className="px-4 py-6 font-serif rounded-br-xl rounded-bl-xl outline-none bg-[#E1E9EE] text-gray"
            />
          </div>
          <div className="w-[60%] mb-4 flex justify-between">
            <div
              className="font-serif cursour-pointer"
              onClick={redirectToSignup}
            >
              Don't have an account?
            </div>
            <a className="font-serif cursour-pointer" href="/forgotpassword">
              Forget Passowrd
            </a>
          </div>
          <button
            className="text-center py-2 w-[60%] text-white font-serif mx-auto bg-[#6D62FF] rounded-lg"
            // onClick={submitDeatils}
            disabled={isSubmited}
          >
            {isSubmited ? "Please Wait..." : "Login"}
          </button>
          <div
            className="flex w-[60%] mt-6 justify-center items-center gap-4 border border-[#5263ff] rounded-lg px-2 py-2"
            onClick={handleGoogleLogin}
          >
            <img className="w-8 h-8" src={googleIcon} alt="" />
            <div className="font-serif text-center">Login with Google</div>
          </div>
        </div>
      </div>
      <img src={wave} className="absolute z-[-1] bottom-0" alt="" />
    </div>
  );
};

export default Login;
