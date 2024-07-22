import React from "react";
import { useNavigate } from "react-router-dom";

const LeftPannel = () => {
  const navigate = useNavigate();
  const redirectToSetting = () => {
    navigate("/site/setting");
  };
  const redirectToIntegration = () => {
    navigate("/site/integration");
  };
  
  return (
    <div className="w-[200px] h-[100vh] flex flex-col items-center pt-10 gap-6 bg-[#91A1D0]">
      <div
        className="cursor-pointer font-serif text-[22px]"
        onClick={() => redirectToSetting()}
      >
        Setting
      </div>
      <div
        className="cursor-pointer font-serif text-[22px]"
        onClick={() => redirectToIntegration()}
      >
        Integration
      </div>
    </div>
  );
};

export default LeftPannel;
