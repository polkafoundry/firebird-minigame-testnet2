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
  bgColor?: "black" | "orange";
};

const DropDown = (props: DropDownProps) => {
  const {
    items = [],
    label,
    selectedValue,
    onChange,
    className,
    itemsClassName,
    bgColor = "orange",
  } = props;
  const selectedItem = items.find((item) => item.value === selectedValue);
  const backgroundColor = bgColor === "black" ? "bg-black" : "bg-orange-200";
  const textColor = bgColor === "black" ? "text-white" : "text-gray-700";
  const activeStyle =
    bgColor === "black" ? "bg-white text-black" : "bg-white text-gray-900";

  return (
    <Menu
      as="div"
      className={clsx(
        "relative inline-block text-left",
        backgroundColor,
        textColor,
        className,
      )}
    >
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="inline-flex w-full justify-between items-center rounded-xl px-3 py-2.5 text-base font-semibold">
              {selectedItem?.label || label}
              <img
                className={clsx("cursor-pointer", open && "rotate-180")}
                src={
                  bgColor === "black"
                    ? "/images/icon-arrow-down-white.svg"
                    : "/images/icon-arrow-down.svg"
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
                "absolute right-0 left-0 z-10 mt-2 origin-top-right overflow-hidden",
                itemsClassName,
                backgroundColor,
                textColor,
              )}
            >
              <ul className="py-1">
                {items
                  .filter((item) => item.value !== selectedItem?.value)
                  .map((item) => (
                    <Menu.Item key={item.label}>
                      {({ active }) => (
                        <li
                          className={clsx(
                            active ? activeStyle : textColor,
                            "block px-4 py-2 text-sm cursor-pointer hover:text-birdRed",
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
