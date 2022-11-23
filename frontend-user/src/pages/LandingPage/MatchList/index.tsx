import { Dialog } from "@headlessui/react";
import clsx from "clsx";
import moment from "moment";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { MATCH_STATUS, rounds } from "../../../constants";
import useFetch from "../../../hooks/useFetch";
import { useMyWeb3 } from "../../../hooks/useMyWeb3";
import { getImgSrc, groupArrayById } from "../../../utils";
import HeadingPrimary from "../components/HeadingPrimary";
import MatchListRight from "./MatchListRight";
import MatchListTable from "./MatchListTable";
import styles from "./schedule.module.scss";

export type FilterTypes = {
  is_completed_bet: string;
  match_status: string;
  page: number;
  size: number;
  round_name: typeof rounds[keyof typeof rounds];
  wallet_address: string;
};

const initFilter = {
  is_completed_bet: "",
  match_status: "",
  page: 1,
  size: 20,
  wallet_address: "",
  round_name: rounds[0].value,
};

const MatchList = () => {
  const { account, isWrongChain } = useMyWeb3();

  const [selectedMatchId, setSelectedMatchId] = useState<number | undefined>();
  const [open, setOpen] = useState<boolean>(false);

  const [dataTable, setDataTable] = useState<any[]>([]);
  const [filter, setFilter] = useState<FilterTypes>(initFilter);
  const [roundTitle, setRoundTitle] = useState<string>("-");

  const { data, loading } = useFetch<any>(
    "/match/get-list-match?" + queryString.stringify({ ...filter }),
  );

  useEffect(() => {
    const rawData = data?.data?.data.map((item: any) => {
      return {
        ...item,
        dateString: moment(new Date(item?.start_time * 1000)).format(
          "MMM DD - dddd",
        ),
        homeTeam: {
          name: item?.home_name,
          icon: getImgSrc(item?.home_icon),
        },
        awayTeam: {
          name: item?.away_name,
          icon: getImgSrc(item?.away_icon),
        },
      };
    });
    const groupData = groupArrayById(rawData, "dateString");

    const newTableData = [];
    for (const [key, value] of Object.entries(groupData)) {
      newTableData.push({
        date: key,
        matches: value,
        ended:
          value &&
          Array.isArray(value) &&
          value[value.length - 1].match_status === MATCH_STATUS.FINISHED,
      });
    }
    const title = getRoundTitle([...newTableData]);
    setRoundTitle(title);

    // sort for date
    newTableData.sort((a: any, b: any) => {
      if (!a.ended && !b.ended)
        return new Date(b.date).valueOf() - new Date(a.date).valueOf();
      if (a.ended && b.ended)
        return new Date(a.date).valueOf() - new Date(b.date).valueOf();
      return a === b ? 0 : a ? -1 : 1;
    });

    setDataTable(newTableData);
  }, [data]);

  useEffect(() => {
    if (!account) return;

    setFilter((prevFilter: FilterTypes) => ({
      ...prevFilter,
      wallet_address: account,
    }));
  }, [account]);

  const getDate = (date: string) => {
    const REGEX_DATE = /(\w.*) -/g;
    if (!date) return "";
    const str = date.match(REGEX_DATE);
    return str ? str[0].slice(0, str.length - 2) : "";
  };

  function getRoundTitle(dataTable: any) {
    if (!dataTable) return "-";

    const lastIndex = dataTable.length - 1;
    const startDate = getDate(dataTable[0]?.date);
    const endDate = getDate(dataTable[lastIndex]?.date);

    return `${startDate} - ${endDate}`;
  }

  const handleChangePredicted = (value: any) => {
    setFilter((prevFilter: FilterTypes) => ({
      ...prevFilter,
      is_completed_bet: value,
    }));
  };

  const handleChangeStatus = (value: any) => {
    setFilter((prevFilter: FilterTypes) => ({
      ...prevFilter,
      match_status: value,
    }));
  };

  const handleSelectMatch = (id: number) => {
    setSelectedMatchId(id);

    if (document.body.clientWidth < 960) {
      setOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <div className="flex flex-col pt-20">
      <HeadingPrimary title="Match List" />
      <div
        id="match-list"
        className="max-w-screen-main px-5 main:px-20 mx-auto w-full"
      >
        <div
          className={clsx(
            "flex flex-col mt-5 relative bg-[#F2F2F2]",
            "md:flex-row",
          )}
        >
          <div
            className={clsx(
              styles.scrollLayout,
              "w-full h-fit ",
              "md:w-[44%] md:sticky md:top-10",
            )}
          >
            <MatchListTable
              selectedMatchId={selectedMatchId}
              handleSelectMatch={handleSelectMatch}
              dataTable={dataTable}
              loading={loading}
              filter={filter}
              roundTitle={roundTitle}
              setFilter={setFilter}
              handleChangePredicted={handleChangePredicted}
              handleChangeStatus={handleChangeStatus}
            />
          </div>
          <div className={"w-full hidden md:block md:w-[56%] md:ml-6"}>
            <MatchListRight
              account={account}
              isWrongChain={isWrongChain}
              matchId={selectedMatchId}
            />
          </div>

          <Dialog
            open={open}
            onClose={handleCloseDialog}
            className="relative z-50 md:hidden"
          >
            <div className="fixed inset-0 flex items-center justify-center p-7">
              <div className="fixed inset-0 bg-black/80" aria-hidden="true" />
              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                  <Dialog.Panel className="w-full h-auto relative m-auto bg-[#F2F2F2] rounded-[12px]">
                    <MatchListRight
                      account={account}
                      isWrongChain={isWrongChain}
                      matchId={selectedMatchId}
                    />
                    <img
                      src="/images/icon-close.svg"
                      alt=""
                      className="absolute top-4 right-4 cursor-pointer w-6 h-6"
                      onClick={handleCloseDialog}
                    />
                  </Dialog.Panel>
                </div>
              </div>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default MatchList;
