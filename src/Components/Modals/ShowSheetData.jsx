import React, { useEffect } from "react";

import Modal from "react-modal";
import { cashoutModalcss } from "../../helpers/modalCSS";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const ShowSheetData = ({ isModal, onToggleModal }) => {
  const [searchParams] = useSearchParams();
  const sheetId = searchParams.get("sheetId");
  let sheetData = "";
  const getSheetData = async () => {
    const res = await fetch(`http://localhost:3001/sheets/${sheetId}`, {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    console.log(data);
    sheetData = data.values;
    console.log(sheetData)
    if(data.status != 200){
        toast.error(data.message)
    }
  };
  useEffect(() => {
    getSheetData();
  }, []);
  return (
    <Modal
      isOpen={isModal}
      onRequestClose={onToggleModal}
      ariaHideApp={false}
      style={cashoutModalcss}
    >
      <div className="bg-[#FFFFFF] border-[1px] overflow-hidden rounded-[17px] px-[50px] py-[30px] relative">
        <div className="relative z-[20]">
          <div className="font-bold font-serif mb-3 text-[22px]">
            Google Sheet data
          </div>
          <div>
            {/* {sheetData?.map((row, idx) => {
              return (
                <div key={idx}>
                  {row?.map((col, idx) => (
                    <div key={idx} className="font-serif px-2">{col}</div>
                  ))}
                  <div>-----</div>
                </div>
              );
            })} */}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ShowSheetData;
