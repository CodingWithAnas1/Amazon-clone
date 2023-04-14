import React, { useEffect, useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItem,
  resetCart,
  increaseQuantity,
  decreamentQuantity,
} from "../../redux/amazonSlice";
import { cart2 } from "../../assets";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();

  const product = useSelector((state) => state.amazon.products);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let total = 0;
    product.map((item) => {
      total = total + item.price * item.quantity;
      return setTotal(total.toFixed(2));
    });
  }, [product]);
  return (
    <div className="w-full bg-gray-100 md:p-4 p-2">
      {product.length > 0 ? (
        <div className="max-w-7xl mx-auto h-auto grid grid-cols-1 md:grid-cols-5 lg:gap-8 gap-4">
          <div className="w-full bg-white px-2 md:px-4 h-full md:col-span-4">
            <div className="flex items-center justify-between border-b-[1px] border-gray-400 py-3 font-mono">
              <h2 className=" text-2xl md:text-3xl font-semibold">
                Shopping Cart
              </h2>
              <h4 className="text-lg md:text-xl">Subtitle</h4>
            </div>

            <div>
              {product.map((item) => (
                <div
                  key={item.id}
                  className="w-full border-b-[1px] border-gray-300 p-2 md:p-4 flex md:items-center md:gap-6 gap-2 md:justify-between items-start"
                >
                  <div className=" w-2/6 md:w-1/6 ">
                    <img
                      className="w-full  object-contain"
                      src={item.image}
                      alt={item.title}
                    />
                  </div>
                  <div className="w-5/6">
                    <h2 className=" text-sm md:text-lg font-semibold">
                      {item.title}
                    </h2>
                    <p className="md:pr-10  text-xs md:text-sm">
                      {item.description.substring(0, 200)}
                    </p>
                    <p className=" text-sm md:text-base">
                      Unit Price{" "}
                      <span className="font-semibold">${item.price}</span>
                    </p>
                    <div className="bg-[#F0F2f2] flex justify-center items-center gap-1 md:gap-2  w-24 py-1 text-center drop-shadow-lg rounded-md text-xs md:text-base">
                      <p className="text-sm md:text-base">Qty:</p>
                      <p
                        className="cursor-pointer bg-gray-200 px-1 rounded-md hover:bg-red-400 duration-300"
                        onClick={() => dispatch(decreamentQuantity(item.id))}
                      >
                        -
                      </p>
                      <p className="mx-1">{item.quantity}</p>
                      <p
                        className="cursor-pointer bg-gray-200 px-1 rounded-md hover:bg-green-400 duration-300"
                        onClick={() => dispatch(increaseQuantity(item.id))}
                      >
                        +
                      </p>
                    </div>
                    <button
                      onClick={() => dispatch(deleteItem(item.id))}
                      className="bg-red-500 px-4 md:px-8 py-1 rounded-lg text-white mt-2 hover:bg-red-700 duration-300 text-xs md:text-base"
                    >
                      Delete Item
                    </button>
                  </div>
                  <div className="my-auto md:mt-0 ">
                    <p className="font-semibold">
                      ${(item.quantity * item.price).toFixed(1)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => dispatch(resetCart())}
              className="md:px-10 md:py-2 py-1 w-28 md:w-auto bg-red-500 hover:bg-red-700 text-white rounded-lg text-md md:text-lg tracking-wide my-2 mx-auto"
            >
              Clear Cart
            </button>
          </div>

          <div className=" w-72 mx-auto md:w-full bg-white h-52 md:h-60 col-span-1 flex items-center justify-center p-4 flex-col md:sticky lg:top-32 drop-shadow-sm">
            <div>
              <p className="flex gap-2 text-xs  ">
                <span className="bg-white text-green-500 rounded-full">
                  <AiFillCheckCircle size={18} />
                </span>
                Your order qualifies for FREE Shipping Choose this option at
                checkout, See details....
              </p>
            </div>
            <div>
              <p className="font-semibold px-10 py-1 flex items-center justify-between gap-2 md:gap-1 lg:gap-2 md:text-xs text-base">
                Total:{" "}
                <span className="text-lg md:text-sm font-bold">${total}</span>
              </p>
            </div>
            <button className="w-full font-medium  bg-gradient-to-tr from-yellow-400 to-yellow-200 border-[1px] border-gray-400 hover:from-yellow-300 hover:to-yellow-500 py-1.5 rounded-md mt-2 lg:text-sm md:text-xs">
              Proceed to Pay
            </button>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ y: 70, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex justify-center items-center gap-6"
        >
          <div>
            <img
              className="w-80 rounded-lg p-4 mx-auto"
              src={cart2}
              alt="emptycartimg"
            />
          </div>
          <div className="flex w-52 p-4 bg-white flex-col items-center rounded-md drop-shadow-lg">
            <h1 className="font-bold text-sm md:text-lg">
              Your Cart feels lonely.
            </h1>
            <p className="text-xs md:text-sm text-center my-2 md:my-0">
              Your Shopping cart lives to serve. Give it purpose - fill it with
              books, electronics, videos, etc. and make it happy.
            </p>
            <Link to="/">
              <button className="w-48 bg-gradient-to-tr from-yellow-300 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-sm py-2 border-[1px] border-gray-400 mt-4 rounded-md font-semibold">
                Continue Shopping
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;
