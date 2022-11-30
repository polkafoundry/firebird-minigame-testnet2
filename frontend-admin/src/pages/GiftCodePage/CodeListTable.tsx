import clsx from "clsx";
import moment from "moment";
import { platforms } from "../../constants";
import { formatCurrency } from "../../utils";
import styles from "./codeList.module.scss";

const headingTable = [
  "Code",
  "Apply Start Time",
  "Apply End Time",
  "Use / Max Quota",
  "$BIRD / code",
  "Type",
  "Action",
];

const CodeListTable = ({ dataTable, loading }: any) => {
  console.log(loading);

  const handleViewCode = (id: number) => {
    console.log("id", id);
  };

  const displayDateTiemFormat = (dateTime: any) => {
    return dateTime
      ? moment(new Date(dateTime * 1000)).format("Do MMM YY, HH:mm")
      : "N/A";
  };

  return (
    <div className="mt-3 border-black border w-full max-w-scren mx-auto">
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
        <>
          {dataTable?.map((item: any) => (
            <div
              key={item?.id}
              className={clsx(
                "flex border-t px-3 py-2.5 border-black text-14/20 font-inter md:px-[30px]",
                styles.tableRow,
              )}
            >
              <div>{item?.code}</div>
              <div>{displayDateTiemFormat(item?.create_time)}</div>
              <div>{displayDateTiemFormat(item?.expried_time)}</div>
              <div>{`${item?.total - item?.remaining}/${item?.total}`}</div>
              <div>{formatCurrency(item?.rewards)}</div>
              <div>
                {item?.platform
                  ? platforms.find(
                      (platform: any) => platform?.value === item.platform,
                    )?.label
                  : "N/A"}
              </div>
              <div>
                <div className="flex" onClick={() => handleViewCode(item?.id)}>
                  View
                </div>
              </div>
            </div>
          ))}
        </>
      </div>
    </div>
  );
};

export default CodeListTable;
