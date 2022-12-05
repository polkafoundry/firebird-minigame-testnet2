import React from "react";

const RightDefaultLayout: React.FC<any> = (props: any) => {
  return (
    <div className="flex-1 px-[60px] py-30px] bg-[#f9f9f9]">
      {props.children}
    </div>
  );
};

export default RightDefaultLayout;
