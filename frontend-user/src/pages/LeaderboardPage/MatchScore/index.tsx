import clsx from "clsx";
import moment from "moment";
// import queryString from "query-string";
import { useEffect, useState } from "react";
import { rounds } from "../../../constants";
import useFetch from "../../../hooks/useFetch";
import { useMyWeb3 } from "../../../hooks/useMyWeb3";
import { getImgSrc, groupArrayById } from "../../../utils";
import HeadingPrimary from "../../LandingPage/components/HeadingPrimary";
import RewardBanner from "../RewardBanner";
import MatchListTable from "./MatchListTable";
import styles from "./matchScore.module.scss";
import WinnerMatch from "./WinnerMatch";

export type FilterTypes = {
  // is_completed_bet: string;
  // match_status: string;
  // page: number;
  // size: number;
  round_name: typeof rounds[keyof typeof rounds];
  // wallet_address: string;
};

const MatchScore = () => {
  const [selectedMatchId, setSelectedMatchId] = useState<number | undefined>();
  const [reward, setReward] = useState<string>("");
  const { account } = useMyWeb3();

  const [dataTable, setDataTable] = useState<any[]>([]);
  const [filter, setFilter] = useState<FilterTypes>({
    // is_completed_bet: "",
    // match_status: "",
    // page: 1,
    // size: 20,
    // wallet_address: "",
    round_name: rounds[0].value,
  });

  const { data, loading } = useFetch<any>(
    "/predict/predict-winner-count-by-match?round=" + filter.round_name,
  );

  useEffect(() => {
    // console.log("filter", filter);
    const rawData = data?.data?.map((item: any) => {
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
      });
    }
    setDataTable(newTableData);
  }, [data]);

  useEffect(() => {
    if (!account) return;

    setFilter((prevFilter: FilterTypes) => ({
      ...prevFilter,
      wallet_address: account,
    }));
  }, [account]);

  const handleSelectMatch = (id: number, reward: string) => {
    setSelectedMatchId(id);
    setReward(reward);
  };

  // const handleChangePredicted = (value: any) => {
  //   setFilter((prevFilter: FilterTypes) => ({
  //     ...prevFilter,
  //     is_completed_bet: value,
  //   }));
  // };

  // const handleChangeStatus = (value: any) => {
  //   setFilter((prevFilter: FilterTypes) => ({
  //     ...prevFilter,
  //     match_status: value,
  //   }));
  // };

  return (
    <div className="mt-20">
      <HeadingPrimary
        backroundTitle="Match Score"
        title="Match Score Prediction Winners"
      />
      <RewardBanner
        reward="$6,820"
        winner="64 winners"
        // redirectUrl={BASE_HREF + URLS.HOME + "#reward-distribution"}
      />

      <div
        className={clsx(
          "px-5 main:px-20 flex flex-col mt-8 relative",
          "md:flex-row",
        )}
      >
        <div
          className={clsx(
            styles.scrollLayout,
            "w-full h-fit",
            "md:w-[50%] md:sticky md:top-10",
          )}
        >
          <MatchListTable
            selectedMatchId={selectedMatchId}
            handleSelectMatch={handleSelectMatch}
            dataTable={dataTable}
            loading={loading}
            // filter={filter}
            setFilter={setFilter}
            // handleChangePredicted={handleChangePredicted}
            // handleChangeStatus={handleChangeStatus}
          />
        </div>
        <div
          className={clsx(
            "w-full md:w-[50%] max-h-screen overflow-y-auto",
            styles.scrollLayout,
          )}
        >
          <WinnerMatch
            matchId={selectedMatchId}
            reward={reward}
            account={account}
          />
        </div>
      </div>
    </div>
  );
};

export default MatchScore;
