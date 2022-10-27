import FooterDefaultLayout from "../base/FooterDefaultLayout";
import HeaderDefaultLayout from "../base/HeaderDefaultLayout";
import MainDefaultLayout from "../base/MainDefaultLayout";

type LayoutProps = {
  children?: any;
};
const LandingLayout = (props: LayoutProps) => {
  const { children } = props;

  return (
    <>
      <HeaderDefaultLayout />
      <MainDefaultLayout>{children}</MainDefaultLayout>
      <FooterDefaultLayout />
    </>
  );
};

export default LandingLayout;
