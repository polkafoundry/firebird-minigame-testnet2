import { useWeb3React } from "@web3-react/core";
import clsx from "clsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import { displayWalletAddress } from "../../../utils";
import NavLeft from "./NavLeft";

const LeftDefaultLayout = () => {
  const { account } = useWeb3React();

  const [smallLeft, setSmallLeft] = useState<boolean>(false);

  return (
    <div
      className={clsx(
        "w-fit min-h-screen relative bg-[#202020] text-white py-5 px-[14px] transition-all duration-500",
        smallLeft ? "min-w-[100px]" : "min-w-[316px]",
      )}
    >
      <div className="flex items-center mb-6">
        <div className="flex items-center">
          <Link to={"/profile"}>
            <img
              className="w-12 h-12 mr-3 object-cover"
              src={"/images/logo.svg"}
              alt=""
            />
          </Link>
          {!smallLeft && (
            <div className={smallLeft ? "w-0" : "min-w-[180px]"}>
              <div className="break-normal">
                {account ? displayWalletAddress(account) : "admin"}
              </div>
              <div className="flex items-center tracking-wider text-[#9a9a9a] whitespace-nowrap">
                Verified Profile
                <img
                  className="ml-2"
                  src={"/images/icon-verified.svg"}
                  alt=""
                />
              </div>
            </div>
          )}
        </div>
        <div
          className={clsx(
            "ml-auto p-0 w-10 h-10 text-[#9a9a9a] duration-500 flex justify-center items-center cursor-pointer",
            smallLeft && "rotate-180",
          )}
          onClick={() => setSmallLeft(!smallLeft)}
          color="inherit"
        >
          <img src="/images/icon-double-arrow-left.svg" alt="" />
        </div>
      </div>
      <NavLeft smallLeft={smallLeft} />

      {!smallLeft && (
        <div className="text-12/16 text-center absolute left-0 bottom-4 w-full text-[#8d8d8d]">
          Copyright @Firebird 2022. All rights reserved.
        </div>
      )}
    </div>
  );
};

export default LeftDefaultLayout;
