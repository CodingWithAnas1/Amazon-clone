import React from "react";

const MiddleList = ({ title, listItem }) => {
  return (
    <div>
      <h3 className="font-sans text-white text-base font-bold mb-3">{title}</h3>
      <ul className="flex flex-col gap-2">
        {listItem.map((item) =>
          item.listData.map((finalData, index) => (
            <li
              key={index}
              className="text-sm tracking-wide hover:text-gray-100 cursor-pointer hover:underline duration-150"
            >
              {finalData}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default MiddleList;
