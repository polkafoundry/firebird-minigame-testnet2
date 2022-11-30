import LeftDefaultLayout from "./LeftDefaultLayout";
import RightDefaultLayout from "./RightDefaultLayout";

const DefaultLayout = (props: any) => {
  return (
    <div className="flex">
      <LeftDefaultLayout />
      <RightDefaultLayout>{props.children}</RightDefaultLayout>
    </div>
  );
};

export default DefaultLayout;
