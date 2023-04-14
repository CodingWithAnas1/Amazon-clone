import React, { useState } from "react";
import Slider from "react-slick";
import {
  banner1,
  banner2,
  banner3,
  banner4,
  banner5,
  banner6,
} from "../../assets";

const Banner = () => {
  const [active, setActive] = useState(0);
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (prev, next) => {
      setActive(next);
    },
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          top: "70%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "240px",
        }}
      >
        <ul
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {" "}
          {dots}{" "}
        </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={
          i === active
            ? {
                width: "30px",
                height: "30px",
                color: "white",
                background: "#131921",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                border: "1px #f3a847 solid",
              }
            : {
                cursor: "pointer",
              }
        }
      >
        {i + 1}
      </div>
    ),
  };

  return (
    <div className="w-full">
      <div className="w-full h-full relative">
        <Slider {...settings}>
          <div>
            <img className="h-52 md:h-auto" src={banner1} alt="banner" />
          </div>
          <div>
            <img className="h-52 md:h-auto" src={banner2} alt="banner" />
          </div>
          <div>
            <img className="h-52 md:h-auto" src={banner3} alt="banner" />
          </div>
          <div>
            <img className="h-52 md:h-auto" src={banner4} alt="banner" />
          </div>
          <div>
            <img className="h-52 md:h-auto" src={banner5} alt="banner" />
          </div>
          <div>
            <img className="h-52 md:h-auto" src={banner6} alt="banner" />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Banner;
