import React, { useState } from "react";
import SheetCreateModal from "./Modals/SheetCreateModal";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const AddGoogleSheets = () => {
  const integration = useSelector((state) => state.user.integration);

  const navigate = useNavigate();
  const redirectToSheet = (id) => {
    navigate(`/integration/google-sheet?sheetId=${id}`);
  };
  const [isModal, setIsModal] = useState(false);
  const onToggleModal = () => {
    setIsModal(!isModal);
  };
  return (
    <div className="mt-10">
      <button
        onClick={onToggleModal}
        className="font-serif text-white mb-4 font-medium px-2 rounded-md bg-[#5263ff] py-2 cursor-pointer"
      >
        Add Sheet
      </button>
      {integration && (
        <div>
          {integration.googleSheets?.map((sheet, idx) => {
            return (
              <div
                key={idx}
                className="bg-[#F7F9F8] flex items-center py-2 px-2 cursor-pointer rounded-sm font-serif"
                onClick={() => redirectToSheet(sheet?.spreadsheetId)}
              >
                {sheet?.spreadsheetId}
              </div>
            );
          })}
        </div>
      )}
      {<SheetCreateModal isModal={isModal} onToggleModal={onToggleModal} />}
    </div>
  );
};

export default AddGoogleSheets;
