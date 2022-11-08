import clsx from "clsx";
import MatchName from "../../components/base/Table/MatchName";
import MatchPredict from "../../components/base/Table/MatchPredict";
import { getDateTime } from "../../utils";
import styles from "./historyTable.module.scss";

type HistoryTableTypes = {
  headings: Array<any>;
  dataTable: Array<any>;
  tableLoading: boolean;
  isWhoWinTable: boolean;
};

const HistoryTable = (props: HistoryTableTypes) => {
  const { tableLoading, isWhoWinTable, headings, dataTable } = props;

  const renderLoading = () => {
    return <div className="">Loading ... </div>;
  };

  const renderClaimButton = () => (
    <button className="bg-black text-white px-5 rounded-xl py-2">
      Claim token
    </button>
  );

  if (tableLoading) renderLoading();

  return (
    <div className="mt-3 border w-full overflow-x-auto">
      <div
        id="match-score"
        className={clsx(
          "flex bg-gray-400 p-5 font-semibold min-w-fit",
          isWhoWinTable ? styles.whoWinRow : styles.matchScoreRow,
        )}
      >
        {headings.map((heading) => (
          <div key={heading}>{heading}</div>
        ))}
      </div>

      {dataTable.map((rowData) => (
        <div
          key={rowData.id}
          className={clsx(
            "flex  items-center px-5 py-2 border hover:bg-yellow-200 min-w-fit",
            isWhoWinTable ? styles.whoWinRow : styles.matchScoreRow,
          )}
        >
          {!isWhoWinTable && (
            <>
              <MatchName team1={rowData.team1} team2={rowData.team2} />
              <div>
                {rowData.home_score}:{rowData.away_score}
              </div>
              <div>{getDateTime(rowData.predict_time * 1000)}</div>
              <MatchPredict isCorrect={rowData.result} />
              <div>{rowData.winWhitelist ? "Yes" : "No"}</div>
              <div>${rowData.earnedReward}</div>
            </>
          )}
          {isWhoWinTable && (
            <>
              <MatchName team1={rowData.team1} team2={rowData.team2} />
              <div>{rowData.question}</div>
              <div>{rowData.answer}</div>
              <div>{rowData.datetime}</div>
              <MatchPredict isCorrect={rowData.result} />
              <div>{rowData.deposited} $BIRD</div>
              <div>{rowData.earned} $BIRD</div>
              <div>{rowData.amount} $BIRD</div>
              <div>
                {Number(rowData.amount) !== 0 &&
                  (rowData.isClaimed ? "Claimed" : renderClaimButton())}
              </div>
            </>
          )}
        </div>
      ))}
      <div></div>
    </div>
  );
};

export default HistoryTable;
