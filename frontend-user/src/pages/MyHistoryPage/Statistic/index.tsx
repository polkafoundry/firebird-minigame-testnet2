import { HISTORY_NAV_VALUES } from "../../../constants";

const boxStyles = {
  title: "font-inter text-14/24",
  number: "font-tthoves text-32/40 font-semibold",
  box: "flex flex-col text-white bg-[#3A0013] rounded-lg min-h-[84px] justify-center items-center",
};

const Statistics = (props: any) => {
  const { data, navActived } = props;

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-center items-center gap-4 mt-4 md:mt-6">
      <div className={boxStyles.box}>
        <span className={boxStyles.title}>Prediction times</span>
        <span className={boxStyles.number}>{data.prediction_times}</span>
      </div>
      <div className={boxStyles.box}>
        <span className={boxStyles.title}>Correct answer</span>
        <span className={boxStyles.number}>{data.correct_answers}</span>
      </div>
      <div className={boxStyles.box}>
        <span className={boxStyles.title}>Win rate</span>
        <span className={boxStyles.number}>{data.win_rate}</span>
      </div>
      {navActived === HISTORY_NAV_VALUES.GOALS ? (
        <>
          <div className={boxStyles.box}>
            <span className={boxStyles.title}>Total $BIRD earned</span>
            <span className={boxStyles.number}>{data.earned}</span>
          </div>
          <div className={boxStyles.box}>
            <span className={boxStyles.title}>Current rank</span>
            <span className={boxStyles.number}>{data.current_rank}</span>
          </div>
        </>
      ) : (
        <>
          <div className={boxStyles.box}>
            <span className={boxStyles.title}>Win whitelist times</span>
            <span className={boxStyles.number}>{data.win_whitelist}</span>
          </div>
          <div className={boxStyles.box}>
            <span className={boxStyles.title}>Total $ earned</span>
            <span className={boxStyles.number}>{data.earned}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default Statistics;
