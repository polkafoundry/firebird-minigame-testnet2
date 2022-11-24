import React, { useContext } from "react";
import { WalletContext } from "../../contexts/WalletContext";
import { displayWalletAddress } from "../../utils";

const Header = () => {
  const { connectedAccount, logout } = useContext(WalletContext);

  return (
    <div className="flex w-full justify-end items-center px-5 h-20 border-b border-b-gray-300">
      {displayWalletAddress(connectedAccount)}

      <button
        onClick={logout}
        className="h-10 text-white flex justify-center items-center w-fit bg-red-500 rounded-md uppercase font-semibold text-14/18 px-3 ml-5"
      >
        Disconnect
      </button>
    </div>
  );
};

export default Header;
