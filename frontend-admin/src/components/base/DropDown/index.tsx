import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment } from "react";

type DropDownItemProps = {
  label: string;
  value: any;
};

type DropDownProps = {
  items?: DropDownItemProps[];
  label?: any;
  selectedValue?: any;
  onChange: (data: any) => void;
  className?: string;
  itemsClassName?: string;
  bgColor?: "black" | "white";
};

const DropDown = (props: DropDownProps) => {
  const {
    items = [],
    label,
    selectedValue,
    onChange,
    className,
    itemsClassName,
    bgColor = "white",
  } = props;
  const selectedItem = items.find((item) => item.value === selectedValue);
  const backgroundColor = bgColor === "black" ? "bg-black" : "bg-white";
  const textColor = bgColor === "black" ? "text-white" : "text-black";
  const activeStyle =
    bgColor === "black" ? "bg-white text-black" : "bg-white text-red";

  return (
    <Menu
      as="div"
      className={clsx(
        "relative inline-block text-left rounded-[4px] font-inter",
        textColor,
        className,
      )}
    >
      {({ open }) => (
        <>
          <div
            className={clsx(
              open ? "rounded-t-[4px]" : "rounded-[4px]",
              backgroundColor,
            )}
          >
            <Menu.Button className="inline-flex w-full justify-between items-center px-3 py-1.5 text-14/24 rounded-b-lg overflow-hidden">
              {selectedItem?.label || label}
              <img
                className={clsx("cursor-pointer w-2 h-2", open && "rotate-180")}
                src={
                  bgColor === "black"
                    ? "/images/icon-arrow-down-white.svg"
                    : "/images/icon-dropdown.svg"
                }
                alt=""
              />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              className={clsx(
                "absolute right-0 left-0 z-10 origin-top-right overflow-hidden shadow-md rounded-b-[4px]",
                itemsClassName,
                backgroundColor,
                textColor,
              )}
            >
              <ul>
                {items.map((item) => (
                  <Menu.Item key={item.label}>
                    {({ active }) => (
                      <li
                        className={clsx(
                          "block px-3 py-1.5 text-14/24 cursor-pointer hover:bg-black text-white",
                          item.value === selectedItem?.value
                            ? "bg-black text-white pointer-events-none"
                            : active
                            ? activeStyle
                            : textColor,
                        )}
                        onClick={() => {
                          onChange(item.value);
                        }}
                      >
                        {item.label}
                      </li>
                    )}
                  </Menu.Item>
                ))}
              </ul>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export default DropDown;
