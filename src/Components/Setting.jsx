import React from "react";
import LeftPannel from "./LeftPannel";
import { useSelector } from "react-redux";

const Setting = () => {
  const  user  = useSelector((state) => state.user);
  return (
    <div className="flex gap-6">
      <LeftPannel />
      <p className="pt-10 w-[70%] py-2 font-serif font-medium px-2 rounded-md">
        <span className="font-serif text-[#5263ff] font-bold pr-2">AccessToken:  </span>
        {user?.accessToken}
      </p>
    </div>
  );
};

export default Setting;
