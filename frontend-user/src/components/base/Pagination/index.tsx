import clsx from "clsx";
import styles from "./pagination.module.scss";
import { DOTS, usePagination } from "./usePagination";

const iconArrow = "/images/components/pagination/icon-previous.svg";
const arrowStyles =
  "bg-[#3A0013] w-10 h-10 rounded-md flex justify-center items-center";
const itemStyles = {
  unActiveStyle:
    "cursor-pointer text-black opacity-60 hover:text-main hover:opacity-90",
  activeStyles: "text-main cursor-default",
};
const dotStyles = "text-black opacity-60 cursor-default";

type PaginationProps = {
  onPageChange: (data: any) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
  className: string;
};

const Pagination = (props: PaginationProps) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  const lastPage =
    (paginationRange && paginationRange[paginationRange.length - 1]) || 1;

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || !paginationRange || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    if (currentPage < lastPage) onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  return (
    <ul
      className={clsx(
        styles.paginationContainer,
        className,
        "text-center text-xl select-none",
      )}
    >
      {/* Left navigation arrow */}
      <li
        className={clsx(
          styles.paginationItem,
          currentPage === 1 ? "opacity-60 cursor-default" : "cursor-pointer",
          "mr-2",
        )}
        onClick={onPrevious}
      >
        <div className={arrowStyles}>
          <img src={iconArrow} alt="" />
        </div>
      </li>
      {paginationRange?.map((pageNumber: any, i: number) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return (
            <li key={i} className={clsx(styles.paginationItem, dotStyles)}>
              &#8230;
            </li>
          );
        }

        // Render our Page Pills
        return (
          <li
            className={clsx(
              styles.paginationItem,
              "font-semibold transition",
              currentPage == pageNumber
                ? itemStyles.activeStyles
                : itemStyles.unActiveStyle,
            )}
            key={i}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      {/*  Right Navigation arrow */}

      <li
        className={clsx(
          styles.paginationItem,
          "ml-2",
          currentPage === lastPage
            ? "opacity-50 cursor-default"
            : "cursor-pointer",
        )}
        onClick={onNext}
      >
        <div className={clsx(arrowStyles, "rotate-180")}>
          <img src={iconArrow} alt="" />
        </div>
      </li>
    </ul>
  );
};

export default Pagination;
