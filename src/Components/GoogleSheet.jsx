import React, { useState } from "react";
import LeftPannel from "./LeftPannel";
import googleIcon from "../assets/googleIcon.png";
import { BackArrowIcon } from "../common/svg/IconPack";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import AddGoogleSheets from "./AddGoogleSheets";
import ShowSheetData from "./Modals/ShowSheetData";
import PostSheetData from "./Modals/PostSheetData";

const GoogleSheet = () => {
  const user = useSelector((state) => state.user);
  const [isModal, setIsModal] = useState(false);
  const [isPostModal, setPostModal] = useState(false);
  const [searchParams] = useSearchParams();
  const sheetId = searchParams.get("sheetId");
  const handleGoogleLogin = async () => {
    window.location.href = "http://localhost:3001/auth/google";
  };

  const navigate = useNavigate();
  const redirectToIntegration = () => {
    navigate("/site/integration");
  };

  const onToggleShowModal = () => {
    setIsModal(!isModal);
  };
  const onTogglePostModal = () => {
    setPostModal(!isPostModal);
  };
  return (
    <div>
      <div className="flex gap-6">
        <LeftPannel />
        {!sheetId ? (
          <div className=" w-[70%] p-[3rem]">
            <div className="flex justify-between">
              <div
                className="font-serif flex gap-2 cursor-pointer font-semibold text-[22px] "
                onClick={redirectToIntegration}
              >
                <BackArrowIcon /> Google Sheet
              </div>
              <div className="cursor-pointer">
                <div
                  className="flex gap-4 items-center shadow-lg hover:shadow-xl text-[20px] font-serif"
                  onClick={handleGoogleLogin}
                >
                  <div className="bg-white py-1 pl-2">
                    <img src={googleIcon} className="w-6 h-6" alt="" />
                  </div>
                  <div className="bg-[#1877D2] text-white py-1 px-1">
                    {user?.intergation ? "" : `Login with Google`}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <AddGoogleSheets />
            </div>
            <div className="bg-[] py-2 px-2">{user?.intergation?.email}</div>
          </div>
        ) : (
          <div className="mt-10 flex w-[70%] justify-between">
            <div className="font-serif font-medium cursor-pointer" onClick={onToggleShowModal}>get Sheet Data</div>
            <div className="font-serif font-medium cursor-pointer" onClick={onTogglePostModal}>Post data to Sheet</div>
          </div>
        )}
      </div>
      {isModal && (
        <ShowSheetData isModal={isModal} onToggleModal={onToggleShowModal} />
      )}
      {isPostModal && (
        <PostSheetData
          isModal={isPostModal}
          onToggleModal={onTogglePostModal}
        />
      )}
    </div>
  );
};

export default GoogleSheet;
