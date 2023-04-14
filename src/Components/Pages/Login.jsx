import React, { useState } from "react";
import { logo2 } from "../../assets/index";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { RotatingLines } from "react-loader-spinner";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../redux/amazonSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth();

  const initialState = {
    email: "",
    password: "",
  };
  const [state, setState] = useState(initialState);

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  //firebase Error
  const [userEmailErr, setUserEmailErr] = useState("");
  const [userPassErr, setUserPassErr] = useState("");

  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const { email, password } = state;

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });

    if (email) {
      setErrorEmail("");
      setUserEmailErr("");
    }
    if (password) {
      setErrorPassword("");
      setUserPassErr("");
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email) {
      setErrorEmail("Enter your email");
    }
    if (!password) {
      setErrorPassword("Enter you password");
    }
    try {
      setLoading(true);
      if (email && password) {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        dispatch(
          setUserInfo({
            email: user.email,
            _id: user.uid,
            username: user.displayName,
            image: user.photoURL,
          })
        );
        setState({ email: "", password: "" });
        setLoading(false);
        setSuccessMsg("Logged in Successfully!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      setLoading(true);
      if (error.message === "Firebase: Error (auth/user-not-found).") {
        setUserEmailErr("Invalid email");
        console.log(error.message);
      } else if (error.message === "Firebase: Error (auth/wrong-password).") {
        setUserPassErr("Wrong password! try again");
      } else {
        console.log(error.message);
      }
    }
    setLoading(false);
  };

  return (
    <div className="w-full">
      <div className="w-full bg-gray-100 pb-10">
        <form
          onSubmit={handleLogin}
          className="w-[360px] mx-auto flex flex-col items-center"
        >
          <Link to="/">
            <img className="w-32 py-4" src={logo2} alt="" />
          </Link>
          <div className="w-full border border-zinc-200 p-6">
            <h2 className="font-sans text-3xl font-medium mb-4">Sign in</h2>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">
                  Email or mobile phone number
                </p>
                <input
                  className="w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
                {errorEmail && (
                  <p className="text-xs text-red-600 font-semibold flex items-center gap-2 -mt-1.5">
                    <span className="italic font-bold">!</span>
                    {errorEmail}
                  </p>
                )}
                {userEmailErr && (
                  <p className="text-xs text-red-600 font-semibold flex items-center gap-2 -mt-1.5">
                    <span className="italic font-bold">!</span>
                    {userEmailErr}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Password</p>
                <input
                  className="w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
                {errorPassword && (
                  <p className="text-xs text-red-600 font-semibold flex items-center gap-2 -mt-1.5">
                    <span className="italic font-bold">!</span>
                    {errorPassword}
                  </p>
                )}
                {userPassErr && (
                  <p className="text-xs text-red-600 font-semibold flex items-center gap-2 -mt-1.5">
                    <span className="italic font-bold">!</span>
                    {userPassErr}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="py-1.5 text-sm font-normal rounded-sm bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput"
              >
                Continue
              </button>
              {loading && (
                <div className="flex justify-center items-center">
                  <RotatingLines
                    strokeColor="#febd69"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="50"
                    visible={true}
                  />
                </div>
              )}

              {successMsg && (
                <div>
                  <motion.p
                    className="border-2 border-green-600 text-sm text-green-600 font-bold text-center py-[1px]"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {successMsg}
                  </motion.p>
                </div>
              )}
            </div>
            <p className="text-xs text-black leading-4 mt-4">
              By Continue, you agree to Amazon's{" "}
              <span className="text-blue-600">Contions of Use</span> and{" "}
              <span className="text-blue-600">Privacy Notice.</span>
            </p>
            <p className="flex items-center gap-3 text-xs text-gray-600 mt-4 cursor-pointer group">
              <IoMdArrowDropdown
                size={20}
                style={{ transform: "rotate(-90deg)" }}
              />
              <span className="text-blue-600 group-hover:underline group-hover:text-orange-700 underline-offset-1">
                Need help?
              </span>
            </p>
          </div>
          <div className="w-full text-xs text-gray-600 mt-4 flex items-center">
            <span className="w-1/3 h-[1px] bg-zinc-400 "></span>
            <span className="w-1/3 text-center">New to Amazon?</span>
            <span className="w-1/3 h-[1px] bg-zinc-400 "></span>
          </div>
          <Link to="/register" className="w-full">
            <button className="py-1.5 text-sm font-normal rounded-sm bg-gradient-to-t from-slate-200 to-slate-100 hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput w-full mt-2">
              Create your Amazon account
            </button>
          </Link>
        </form>
      </div>
      <div className="w-full bg-gradient-to-t from-white via-white to-zinc-200 flex flex-col justify-center items-center gap-4">
        <div className="flex items-center gap-6 pt-10">
          <p className="text-blue-600 hover:underline hover:text-orange-700 underline-offset-1 cursor-pointer">
            Condions to Use
          </p>
          <p className="text-blue-600 cursor-pointer hover:underline hover:text-orange-700 underline-offset-1">
            Privacy Notice
          </p>
          <p className="text-blue-600 cursor-pointer hover:underline hover:text-orange-700 underline-offset-1">
            Privacy Notice
          </p>
        </div>
        <p className="text-xs text-gray-600 pb-10">
          {" "}
          © 1996-2023, ReactBd.com, Inc. or it's affiliates
        </p>
      </div>
    </div>
  );
};

export default Login;
