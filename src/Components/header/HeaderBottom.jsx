import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { RiAccountCircleFill } from "react-icons/ri";
import SideNav from "./SideNav";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const HeaderBottom = () => {
  const userInfo = useSelector((state) => state.amazon.userInfo);
  const [sideBar, setSideBar] = useState(false);
  const ref = useRef();

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (e.target.contains(ref.current)) {
        setSideBar(false);
      }
    });
  }, []);

  return (
    <div className="w-full mdl:px-4 px-1 h-10 bg-amazon_light text-whiteText flex items-center">
      <ul className="flex items-center gap-2 text-sm tracking-wide">
        <li
          onClick={() => setSideBar(true)}
          className="headerHover flex items-center gap-2"
        >
          <AiOutlineMenu />
          All
        </li>
        <li className="headerHover hidden md:inline-flex">Today's Deals</li>
        <li className="headerHover hidden md:inline-flex">Customer Service</li>
        <li className="headerHover hidden md:inline-flex">Gift Cards</li>
        <li className="headerHover hidden md:inline-flex">Registry</li>
        <li className="headerHover hidden md:inline-flex">Sell</li>
      </ul>

      {sideBar && (
        <div className="w-full h-screen text-black fixed top-0 left-0 bg-amazon_blue bg-opacity-50 z-50">
          <div className="w-full h-full relative ">
            <motion.div
              ref={ref}
              initial={{ x: -500, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-[80%] md:w-[350px] h-full bg-white border border-black overflow-y-auto"
            >
              {userInfo ? (
                <div className="w-full bg-amazon_blue text-white py-2 px-6 flex items-center gap-4">
                  <img
                    className="rounded-full w-8 h-8 border-2 border-red-500 p"
                    src={userInfo.image}
                    alt="userimage"
                  />
                  <p>{userInfo.username}</p>
                </div>
              ) : (
                <div className="w-full bg-amazon_blue text-white py-2 px-6 flex items-center gap-4">
                  <RiAccountCircleFill size={23} />
                  <p>Hello, Sign in</p>
                </div>
              )}

              <SideNav
                title="Digital Content & Devices"
                one="Amazon Music"
                two="Kindle E-readers & Books"
                three="Amazon Appstore"
              />
              <SideNav
                title="Shop By Department"
                one="Electronics"
                two="Computers"
                three="Smart Home"
              />
              <SideNav
                title="Programs & Features"
                one="Gift Cards"
                two="Amazon Live"
                three="International Shopping"
              />
              <SideNav
                title="Help & Settings"
                one="Your Account"
                two="Customer Service"
                three="Contact Me"
              />
              <AiOutlineClose
                onClick={() => setSideBar(false)}
                className="rounded-sm cursor-pointer absolute w-6 h-6 top-0 left-[80%] md:left-[360px] text-amazon_blue bg-white flex items-center justify-center hover:text-white hover:bg-red-600 duration-300"
              />
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderBottom;
