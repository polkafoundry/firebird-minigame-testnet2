import { HISTORY_NAV_VALUES } from "../../../constants";

const Statistics = (props: any) => {
  const { data, navActived } = props;

  return (
    <div className="grid grid-cols-5 gap-7 mt-10">
      <div className="flex flex-col bg-gray-100 rounded-md min-h-[80px] justify-center items-center">
        <span className="">Prediction times</span>
        <span className="text-xl font-semibold">{data.prediction_times}</span>
      </div>
      <div className="flex flex-col bg-gray-100 rounded-md min-h-[80px] justify-center items-center">
        <span className="">Correct answer</span>
        <span className="text-xl font-semibold">{data.correct_answers}</span>
      </div>
      <div className="flex flex-col bg-gray-100 rounded-md min-h-[80px] justify-center items-center">
        <span className="">Win rate</span>
        <span className="text-xl font-semibold">{data.win_rate}</span>
      </div>
      {navActived === HISTORY_NAV_VALUES.GOALS ? (
        <>
          <div className="flex flex-col bg-gray-100 rounded-md min-h-[80px] justify-center items-center">
            <span className="">Total $BIRD earned</span>
            <span className="text-xl font-semibold">{data.earned}</span>
          </div>
          <div className="flex flex-col bg-gray-100 rounded-md min-h-[80px] justify-center items-center">
            <span className="">Current rank</span>
            <span className="text-xl font-semibold">{data.current_rank}</span>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col bg-gray-100 rounded-md min-h-[80px] justify-center items-center">
            <span className="">Win whitelist times</span>
            <span className="text-xl font-semibold">{data.win_whitelist}</span>
          </div>
          <div className="flex flex-col bg-gray-100 rounded-md min-h-[80px] justify-center items-center">
            <span className="">Total $ earned</span>
            <span className="text-xl font-semibold">{data.earned}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default Statistics;
