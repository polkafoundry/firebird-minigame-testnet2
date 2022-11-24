import { useWeb3React } from "@web3-react/core";
import React, { useContext, useEffect, useState } from "react";
import { WalletContext } from "../../contexts/WalletContext";
import useProviderConnects from "../../hooks/useProviderConnects";

const LoginPage = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const { connectedAccount, tryActivate } = useContext(WalletContext);

  useEffect(() => {
    console.log(connectedAccount);
  }, [connectedAccount]);

  const handleUserLogin = async () => {
    setLoading(true);
    try {
      tryActivate && tryActivate();
    } catch (error) {
      console.log("tryActivate ERR:", error);
    }
    setLoading(false);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col max-w-[500px]">
        <div className="text-48/60">Connect Your Wallet</div>
        <div className="text-center mt-10">
          <p>Connect to continue signing in!</p>
        </div>
        <button
          onClick={handleUserLogin}
          disabled={loading}
          className="h-14 text-white mt-10 flex justify-center items-center w-full bg-main rounded-xl uppercase font-semibold"
        >
          Connect Wallet
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
