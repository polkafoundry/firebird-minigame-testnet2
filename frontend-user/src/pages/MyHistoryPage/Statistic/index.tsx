import { HISTORY_NAV_VALUES } from "../../../constants";
import { formatCurrency } from "../../../utils";

const boxStyles = {
  title: "font-inter font-bold text-12/18 tracking-[1px] uppercase",
  number: "font-tthovesBold italic text-32/40 mt-1",
  box: "flex flex-col text-black py-3 justify-center items-center border-b border-r border-black",
};

const Statistics = (props: any) => {
  const { data, navActived, currentRank } = props;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-center items-center border-t border-l border-black mt-4 md:mt-6">
      <div className={boxStyles.box}>
        <span className={boxStyles.title}>Prediction times</span>
        <span className={boxStyles.number}>{data?.prediction_times || 0}</span>
      </div>
      <div className={boxStyles.box}>
        <span className={boxStyles.title}>Correct answer</span>
        <span className={boxStyles.number}>{data?.correct_answers || 0}</span>
      </div>
      <div className={boxStyles.box}>
        <span className={boxStyles.title}>Win rate</span>
        <span className={boxStyles.number}>{data?.win_rate || 0}</span>
      </div>
      {navActived === HISTORY_NAV_VALUES.GOALS ? (
        <>
          <div className={boxStyles.box}>
            <span className={boxStyles.title}>Total $BIRD earned</span>
            <span className={boxStyles.number}>
              {formatCurrency(data?.earned) || 0}
            </span>
          </div>
          <div className={boxStyles.box}>
            <span className={boxStyles.title}>Current rank</span>
            <span className={boxStyles.number}>#{currentRank || 0}</span>
          </div>
        </>
      ) : (
        <>
          <div className={boxStyles.box}>
            <span className={boxStyles.title}>Win whitelist times</span>
            <span className={boxStyles.number}>{data?.win_whitelist || 0}</span>
          </div>
          <div className={boxStyles.box}>
            <span className={boxStyles.title}>Total $ earned</span>
            <span className={boxStyles.number}>{data?.earned || 0}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default Statistics;
