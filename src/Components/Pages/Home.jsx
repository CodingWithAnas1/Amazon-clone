import React from "react";
import Banner from "../home/Banner";
import Products from "../home/Products";

const Home = () => {
  return (
    <div>
      <Banner />
      <div className="w-full py-10 -mt-14 lg:-mt-32">
        <Products />
      </div>
    </div>
  );
};

export default Home;
