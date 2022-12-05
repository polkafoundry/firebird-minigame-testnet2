import { Autoplay, Lazy, Navigation, Pagination } from "swiper";
import "swiper/css";
import { Swiper } from "swiper/react";

type BaseSwiperProps = {
  children: JSX.Element[];
  showNavigation?: boolean;
  showPagination?: boolean;
  handleSlideChange?: (data: any) => void;
  setSwiperRef?: any;
};

const BaseSwiper = (props: BaseSwiperProps) => {
  const {
    children,
    showPagination = false,
    showNavigation = false,
    handleSlideChange,
    setSwiperRef,
  } = props;
  const pagination = showPagination
    ? {
        clickable: true,
      }
    : false;
  return (
    <Swiper
      onSwiper={setSwiperRef}
      slidesPerView={1}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      loop
      lazy
      pagination={pagination}
      navigation={showNavigation}
      modules={[Lazy, Autoplay, Pagination, Navigation]}
      onSlideChangeTransitionEnd={handleSlideChange}
    >
      {children}
    </Swiper>
  );
};

export default BaseSwiper;
