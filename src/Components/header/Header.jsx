import { useState } from "react";
import { logo } from "../../assets/index";
import { GoLocation } from "react-icons/go";
import { IoMdArrowDropdown } from "react-icons/io";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { allItems } from "../../constant/index";
import HeaderBottom from "./HeaderBottom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { setQuery, userLogout } from "../../redux/amazonSlice";

const Header = () => {
  const query = useSelector((state) => state.amazon.query);
  function onvaluechange(e) {
    // dispatch(setQuery((e.target.value = "")));
    dispatch(setQuery(e.target.value));
  }
  const auth = getAuth();
  const dispatch = useDispatch();
  const [showAll, setShowAll] = useState(false);
  const products = useSelector((state) => state.amazon.products);
  const userInfo = useSelector((state) => state.amazon.userInfo);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logout Successfully");
      dispatch(userLogout());
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="w-full sticky top-0 z-50">
      <div className="w-full bg-amazon_blue text-white px-4 py-3 flex items-center gap-4  relative">
        <Link to="/">
          <div className="headerHover">
            <img className="w-24 mt-2" src={logo} alt="logo" />
          </div>
        </Link>

        <div className="headerHover hidden mdl:inline-flex">
          <GoLocation size={22} />
          <p className="text-sm text-lightText flex flex-col">
            Deliver to{" "}
            <span className="text-sm font-semibold -mt-1 text-whiteText">
              Oman
            </span>
          </p>
        </div>

        <div className="h-10 rounded-md lgl:flex flex-grow items-center relative hidden">
          <span
            onClick={() => setShowAll(!showAll)}
            className="w-14 h-full bg-gray-200 hover:bg-gray-300 border-2 cursor-pointer duration-300 text-sm text-amazon_blue flex items-center justify-center rounded-tl-md rounded-bl-md"
          >
            All <span></span>
            <IoMdArrowDropdown />
          </span>
          {showAll && (
            <div>
              <ul className="absolute w-56 h-80 top-10 left-0 overflow-y-scroll overflow-x-hidden bg-white border-[1px] border-amazon_blue text-black p-2 flex flex-col gap-1 z-10">
                {allItems.map((item, index) => (
                  <li
                    key={index}
                    className="hover:border-b-[1px] hover:border-amazon_blue cursor-pointer duration-200 border-b-transparent text-sm tracking-wide"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <input
            className="h-full text-base text-amazon_blue flex flex-grow outline-none border-none px-2"
            type="text"
            value={query}
            onChange={onvaluechange}
          />
          <span className="w-12 h-full flex items-center justify-center bg-amazon_yellow hover:bg-[#f3a847] duration-300 text-amazon_blue cursor-pointer rounded-tr-md rounded-br-md">
            <AiOutlineSearch size={20} />
          </span>
        </div>

        <Link to="/login">
          <div className="flex flex-col items-start justify-center headerHover text-sm">
            {userInfo ? (
              <p className="text-sm text-gray-100 mdl:text-gray-100 font-medium">
                {userInfo.username}
              </p>
            ) : (
              <p className="text-xs text-white mdl:text-lightText font-light">
                Hellow, sign in
              </p>
            )}
            <p className="hidden mdl:flex gap-1 items- -mt-1 font-semibold">
              Accounts & Lists{" "}
              <span>
                <IoMdArrowDropdown />
              </span>
            </p>
          </div>
        </Link>

        <div className="hidden mdl:flex flex-col items-start justify-center headerHover">
          <p className="text-xs text-lightText font-light">Returns</p>
          <p className="flex gap-1 items- -mt-1 font-semibold text-sm">
            & Orders
          </p>
        </div>

        <Link to="/cart">
          <div className="flex items-start justify-center headerHover relative">
            <AiOutlineShoppingCart size={19} />
            <p className=" text-xs font-semibold mt-4 text-whiteText">Cart </p>
            <span className="absolute top-0 left-6 font-semibold text-xs p-1 h-4 bg-[#f3a847] rounded-full flex items-center justify-center text-amazon_blue ">
              {products.length}
            </span>
          </div>
        </Link>
        {userInfo && (
          <div onClick={handleLogout} className="headerHover">
            <div className="flex flex-col items-center">
              <FiLogOut size={17} />
              <p className="text-xs">Log out</p>
            </div>
          </div>
        )}
      </div>

      <HeaderBottom />
    </div>
  );
};

export default Header;
