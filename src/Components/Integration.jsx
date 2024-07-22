import React from 'react'
import googlesheetIcon from '../assets/googlesheets-logo.png'
import { useNavigate } from 'react-router-dom';
import LeftPannel from './LeftPannel';
const Integration = () => {
    const navigate = useNavigate();

    const redirectToGoogleSheet = () => {
        navigate('/integration/google-sheet')
    }
  return (
    <div className="flex w-full h-[100vh]">
      <LeftPannel />
      <div className="">
          <div className="flex flex-col p-[3rem]">
            <div className="font-serif font-semibold text-[22px] ">
              Integration
            </div>
            <div
              className="font-serif pt-10 pl-4 font-medium items-center text-[20px] flex gap-4 cursor-pointer"
              onClick={redirectToGoogleSheet}
            >
              <img src={googlesheetIcon} className="w-8 h-10" alt="" />
              Google Sheet
            </div>
          </div>
      </div>
    </div>
  );
}

export default Integration