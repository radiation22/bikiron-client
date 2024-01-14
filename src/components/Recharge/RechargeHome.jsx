import React, { useState } from "react";
import AgentNav from "../Navbar/AgentNav";
import recharge from "../../assets/recharge.png";
// Import the popup component
import Recharge from "./Recharge";

const RechargeHome = () => {
  const [isRechargeModalOpen, setIsRechargeModalOpen] = useState(false);
  const openRechargeModal = () => {
    setIsRechargeModalOpen(true);
  };

  const closeModal = () => {
    setIsRechargeModalOpen(false);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div>
      <AgentNav></AgentNav>
      <div onClick={handleRefresh} className="text-center my-3">
        <button className="bg-green-500 px-6 text-white py-1 rounded-xl ">
          Refresh
        </button>
      </div>
      <div className="flex gap-5 justify-center mt-5">
        <div
          className="border bg-[#9DDE2A] w-[160px] p-5 rounded-lg cursor-pointer"
          onClick={openRechargeModal}
        >
          <img src={recharge} alt="" />
          <p className="text-white font-bold text-center text-lg">
            মোবাইল রিচার্জ
          </p>
        </div>
        <div className="border bg-[#9DDE2A] w-[160px] p-5 rounded-lg cursor-pointer">
          <img src={recharge} alt="" />
          <p className="text-white font-bold text-center text-lg">
            পেমেন্ট নিন
          </p>
        </div>
      </div>

      {isRechargeModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay" onClick={closeModal}></div>
          <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="modal-content py-4 text-left px-6">
              <div className="flex justify-between items-center pb-3">
                <p className="text-2xl font-bold"></p>
                <button
                  className="modal-close-button rounded-full cursor-pointer z-50 bg-red-400 px-3 py-1 text-white"
                  onClick={closeModal}
                >
                  X
                </button>
              </div>
              <div>
                <Recharge></Recharge>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RechargeHome;
