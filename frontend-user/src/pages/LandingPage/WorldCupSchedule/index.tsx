import { useEffect, useState } from "react";
import DropDown from "../../../components/base/DropDown";
import useFetch from "../../../hooks/useFetch";
import { useMyWeb3 } from "../../../hooks/useMyWeb3";
import MatchListRight from "./MatchListRight";
import MatchListTable from "./MatchListTable";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const queryString = require("query-string");

const predictedOptions = [
  { label: "Predicted: All", value: 0 },
  { label: "Predicted: Yes", value: 1 },
  { label: "Predicted: No", value: 2 },
];

const statusOptions = [
  { label: "Status: All", value: 0 },
  { label: "Status: 1", value: 1 },
  { label: "Status: 2", value: 2 },
];

type FilterTypes = {
  predicted: number;
  status: number;
  page: number;
  size: number;
  wallet_address: string;
};

const WorldCupSchedule = () => {
  const { account } = useMyWeb3();

  // all state here

  const [filter, setFilter] = useState<FilterTypes>({
    predicted: 0,
    status: 0,
    page: 1,
    size: 20,
    wallet_address: "",
  });

  const { data, loading } = useFetch(
    "/match/get-list-match?" + queryString.stringify({ ...filter }),
  );

  useEffect(() => {
    console.log("fetching", data);
  }, [loading]);

  useEffect(() => {
    if (!account) return;

    setFilter((prevFilter: FilterTypes) => ({
      ...prevFilter,
      wallet_address: account,
    }));
  }, [account]);

  const handleChangePredicted = (value: any) => {
    setFilter((prevFilter: FilterTypes) => ({
      ...prevFilter,
      predicted: value,
    }));
  };

  const handleChangeStatus = (value: any) => {
    setFilter((prevFilter: FilterTypes) => ({
      ...prevFilter,
      status: value,
    }));
  };

  return (
    <div className="flex flex-col py-20">
      <p className="m-0 text-4xl font-semibold text-center">
        2022 Qatar World Cup Schedule
      </p>
      <div className="w-[55%] mt-10">
        <div className="flex justify-between items-center">
          <span className="text-2xl font-semibold">Match List (GMT +7)</span>
          <div>
            <DropDown
              label="Predicted"
              items={predictedOptions}
              selectedValue={filter.predicted}
              onChange={handleChangePredicted}
              className="bg-orange-200 w-[160px] rounded-xl border"
              itemsClassName="bg-orange-200 rounded-xl"
            />
            <DropDown
              label="Status"
              items={statusOptions}
              selectedValue={filter.status}
              onChange={handleChangeStatus}
              className="bg-orange-200 w-[160px] rounded-xl border ml-5"
              itemsClassName="bg-orange-200 rounded-xl"
            />
          </div>
        </div>
      </div>

      <div className="flex mt-5 relative">
        <div className="w-[55%] sticky top-10 h-fit">
          <MatchListTable />
        </div>
        <div className="w-[45%]">
          <MatchListRight matchDetail={{}} />
        </div>
      </div>
    </div>
  );
};

export default WorldCupSchedule;
