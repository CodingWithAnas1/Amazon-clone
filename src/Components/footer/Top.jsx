import React from "react";

const Top = () => {
  return (
    <div className="w-full bg-white py-6">
      <div className="w-full border-t-[1px] border-b-[1px] py-8">
        <div className="w-64 mx-auto text-center ">
          <p className=" text-sm">See Personalised Recommendations</p>
          <button className="w-full bg-yellow-300 rounded-md py-1 font-semibold cursor-pointer hover:bg-yellow-500 active:bg-yellow-700 my-[1px]">
            Sign in
          </button>
          <p className="text-xs font-semibold">
            New Customer?{" "}
            <span className="font-normal ml-1 cursor-pointer text-blue-600">
              Start here.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Top;
