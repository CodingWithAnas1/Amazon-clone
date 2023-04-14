import React, { useState } from "react";
import { logo2 } from "../../assets/index";
import { IoMdArrowDropdown } from "react-icons/io";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { RotatingLines } from "react-loader-spinner";

const Register = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const initialState = {
    name: "",
    email: "",
    password: "",
    cpassword: "",
  };
  const [state, setState] = useState(initialState);

  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorCpassword, setErrorCpassword] = useState("");

  const [firebaseError, setFirebaseError] = useState("");

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const { name, email, password, cpassword } = state;

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
    if (name) {
      setErrorName("");
    }
    if (email) {
      setErrorEmail("");
    }
    if (password) {
      setErrorPassword("");
    }
    if (cpassword) {
      setErrorCpassword("");
    }
    setFirebaseError("");
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name) {
      setErrorName("Enter your name");
    }
    if (!email) {
      setErrorEmail("Enter your email");
    }
    if (!password) {
      setErrorPassword("Enter you password");
    } else if (password.length < 6) {
      setErrorPassword("Password must be at least 6 characters");
    }
    if (password !== cpassword) {
      setErrorCpassword("Password not match");
    }
    if (
      name &&
      email &&
      password &&
      password.length >= 6 &&
      cpassword &&
      cpassword === password
    ) {
      try {
        setLoading(true);
        await createUserWithEmailAndPassword(auth, email, password);

        await updateProfile(auth.currentUser, {
          displayName: name,
          photoURL:
            "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80",
        });

        setLoading(false);
        setSuccessMsg("Account created successfully");
      } catch (error) {
        setLoading(true);
        if (error.message === "Firebase: Error (auth/email-already-in-use).") {
          setFirebaseError("Email already exist");
        } else {
          console.log(error.message);
        }
        setLoading(false);
      }

      setState({ name: "", email: "", password: "", cpassword: "" });
      setFirebaseError("");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full bg-gray-100 pb-10">
        <form
          onSubmit={handleRegister}
          className="w-[360px] mx-auto flex flex-col items-center"
        >
          <Link to="/">
            <img className="w-32 py-4" src={logo2} alt="" />
          </Link>
          <div className="w-full border border-zinc-200 p-6">
            <h2 className="font-sans text-3xl font-medium mb-4">
              Create Account
            </h2>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Name</p>
                <input
                  className="w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleChange}
                />
                {errorName && (
                  <p className="text-xs text-red-600 font-semibold flex items-center gap-2 -mt-1.5">
                    <span className="italic font-bold">!</span>
                    {errorName}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">
                  Email or mobile phone number
                </p>
                <input
                  className="w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={handleChange}
                />
                {errorEmail && (
                  <p className="text-xs text-red-600 font-semibold flex items-center gap-2 -mt-1.5">
                    <span className="italic font-bold ">!</span>
                    {errorEmail}
                  </p>
                )}
                {firebaseError && (
                  <p className="text-xs text-red-600 font-semibold flex items-center gap-2 -mt-1.5">
                    <span className="italic font-bold">!</span>
                    {firebaseError}
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
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Re-enter Password</p>
                <input
                  className="w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                  type="password"
                  name="cpassword"
                  value={cpassword}
                  onChange={handleChange}
                />
                {errorCpassword && (
                  <p className="text-xs text-red-600 font-semibold flex items-center gap-2 -mt-1.5">
                    <span className="italic font-bold">!</span>
                    {errorCpassword}
                  </p>
                )}

                <p className="text-xs text-gray-600">
                  Password must be at least 6 characters
                </p>
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
            <Link to="/login">
              <div className="flex items-center gap-1 text-xs text-gray-600 mt-4 cursor-pointer group">
                <p className="text-black">Already have an account?</p>
                <span className="text-blue-600 group-hover:underline group-hover:text-orange-700 underline-offset-1">
                  Sign in
                </span>
                <IoMdArrowDropdown
                  size={20}
                  style={{ transform: "rotate(-90deg)" }}
                />
              </div>
            </Link>
            <div className="flex items-center text-xs text-gray-600  cursor-pointer group -mt-1">
              <p className="text-black">Buying for work?</p>
              <span className="text-blue-600 group-hover:underline group-hover:text-orange-700 underline-offset-1 ml-[2px]">
                Create a free business account
              </span>
              <IoMdArrowDropdown
                size={20}
                style={{ transform: "rotate(-90deg)" }}
              />
            </div>
          </div>
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

export default Register;
