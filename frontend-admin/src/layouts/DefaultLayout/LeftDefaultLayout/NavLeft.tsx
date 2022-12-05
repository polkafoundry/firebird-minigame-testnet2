import clsx from "clsx";
import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { ROUTES_URL } from "../../../constants";
import { WalletContext } from "../../../contexts/WalletContext";
import styles from "./nav.module.scss";

const nav = [
  {
    title: "Dashboard",
    part: ROUTES_URL.DASHBOARD,
  },
  {
    title: "Gift Code",
    part: ROUTES_URL.GIFT_CODE,
  },
];

const navStyles = {
  linkItemNavLeft:
    "flex items-center rounded-xl min-h-[74px] px-5 text-16/20 text-[#8d8d8d] duration-300 no-underline cursor-pointer",
};

const NavLeft = (props: any) => {
  const { smallLeft } = props;
  const { logout } = useContext(WalletContext);
  const [navLeft] = React.useState(nav);
  const location = useLocation();

  const logoutUser = () => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm("Do you want logout?")) {
      return false;
    }

    logout && logout();
  };

  return (
    <ul className="w-full list-none p-0">
      {navLeft.map((item, index) => {
        return (
          <li
            key={index}
            className={clsx(
              "w-full mb-1",
              location?.pathname === item.part && "active",
            )}
          >
            <Link
              to={item.part}
              className={clsx(
                navStyles.linkItemNavLeft,
                location?.pathname === item.part &&
                  "bg-[rgba(255,255,255,0.1)] text-white duration-300",
              )}
            >
              <i className={clsx(smallLeft && " m-auto", styles.icons)}></i>
              {!smallLeft && item.title}
            </Link>
          </li>
        );
      })}

      <li className="w-full mb-1">
        <div onClick={logoutUser} className={navStyles.linkItemNavLeft}>
          <img
            src="/images/icon-disconnect.svg"
            alt=""
            className={clsx(smallLeft && " m-auto", "mr-5")}
          />
          {!smallLeft && "Disconnect"}
        </div>
      </li>
    </ul>
  );
};

export default NavLeft;
