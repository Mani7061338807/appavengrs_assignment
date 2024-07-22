import React, { useState } from 'react'
import Modal from "react-modal";
import { cashoutModalcss } from '../../helpers/modalCSS';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const PostSheetData = (isModal,onToggleModal) => {
    const [data,setData] = useState('');
    const [searchParams] = useSearchParams();
    const sheetId = searchParams.get('sheetId');
  const addDataTosheet = async () => {
    const res = await fetch(`http://localhost:3001/sheets/${sheetId}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: data,
      }),
    });
    const response = await res.json();
    if (response) {
      toast.success("data added to the sheet!");
      onToggleModal();
    }
    console.log(response);
  };
  return (
    <Modal
      isOpen={isModal}
      onRequestClose={onToggleModal}
      ariaHideApp={false}
      style={cashoutModalcss}
    >
      <div className="bg-[#FFFFFF] border-[1px] overflow-hidden rounded-[17px] px-[50px] py-[30px] relative">
        <div className="absolute translate-x-[50%] translate-y-[60%] bottom-0 right-0  w-[350px] h-[300px] bg-[#FFFFFF30] blur-[65px]"></div>
        <div className="absolute translate-x-[-70%] translate-y-[-60%] top-0 left-0  w-[350px] h-[300px] bg-[#FFFFFF30] blur-[65px]"></div>
        <div className="relative z-[20]">
          <div className="font-bold font-serif mb-3 text-[22px]">
            Google Sheet
          </div>

          <div className="my-4">
            <label htmlFor="worksheetName" className="font-serif font-medium">
              Worksheet Name
            </label>
            <input
              type="text"
              name="data"
              id="data"
              onChange={(e) => setData(e.target.value)}
              value={data}
              className="w-full py-3 mt-2 font-serif bg-transparent px-5 border-[1px] border-[gray] rounded-[8px] focus:outline-[#5263ff] hover:border-[#5263ff] "
            />
          </div>

          <div
            className="bg-[#5263FF] mx-auto cursor-pointer flex justify-center items-center text-white font-sans h-12 w-44 rounded-[10px]"
            onClick={addDataTosheet}
          >
            Send Data
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default PostSheetData