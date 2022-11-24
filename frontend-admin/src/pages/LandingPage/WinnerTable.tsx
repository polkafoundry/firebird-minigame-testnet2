import clsx from "clsx";
import moment from "moment";
import styles from "./landing.module.scss";

const headingTable = ["No", "Match Name", "Match Time", "Final Winner"];

const WinnerTable = ({ dataTable, loading }: any) => {
  console.log(dataTable);

  const getMatchName = (rowData: any) => {
    const match = rowData?.match;
    return `${match?.home_name || "N/A"} vs ${match?.away_name || "N/A"}`;
  };

  const getMatchTime = (rowData: any) => {
    const startTime = new Date(rowData?.match?.start_time * 1000);
    return moment(startTime).format("HH:mm, Do MMM YY");
  };

  return (
    <div className="mt-3 border-black border w-full max-w-screen-2md mx-auto">
      <div
        className={clsx(
          "flex items-center px-3 py-3 text-10/14 font-bold uppercase rounded-t-[4px]",
          "md:px-[30px] md:text-12/18",
          styles.tableRow,
        )}
      >
        {headingTable.map((heading) => (
          <div key={heading} className="opacity-70 text-left">
            {heading}
          </div>
        ))}
      </div>

      <div className="relative min-h-[300px]">
        {!loading && (
          <>
            {dataTable?.map((item: any, index: number) => (
              <div
                key={item?.id}
                className={clsx(
                  "flex border-t px-3 py-2.5 border-black text-14/20 font-inter md:px-[30px]",
                  styles.tableRow,
                )}
              >
                <div>{index + 1}</div>
                <div>{getMatchName(item)}</div>
                <div>{getMatchTime(item)}</div>
                <div>{item?.final_winner || "No winner"}</div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default WinnerTable;
