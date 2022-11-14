import FooterDefaultLayout from "../base/FooterDefaultLayout";
import HeaderDefaultLayout from "../base/HeaderDefaultLayout";
import MainDefaultLayout from "../base/MainDefaultLayout";

type LayoutProps = {
  children?: any;
  hasBackgroundImg?: boolean;
};
const DefaultLayout = (props: LayoutProps) => {
  const { children, hasBackgroundImg } = props;

  return (
    <>
      <HeaderDefaultLayout />
      <MainDefaultLayout>{children}</MainDefaultLayout>
      <FooterDefaultLayout hasBackgroundImg={hasBackgroundImg} />
    </>
  );
};

export default DefaultLayout;
