import clsx from "clsx";
import MatchName from "../../components/base/Table/MatchName";
import MatchPredict from "../../components/base/Table/MatchPredict";
import { BET_PLACE, BET_TYPE } from "../../constants";
import { convertHexToStringNumber, getDateTime, getImgSrc } from "../../utils";
import styles from "./historyTable.module.scss";

type HistoryTableTypes = {
  headings: Array<any>;
  dataTable: Array<any>;
  tableLoading: boolean;
  isWhoWinTable: boolean;
  account: string;
};

const HistoryTable = (props: HistoryTableTypes) => {
  const { tableLoading, isWhoWinTable, headings, dataTable, account } = props;

  const renderLoading = () => {
    return <div className="">Loading ... </div>;
  };

  const renderClaimButton = () => (
    <button className="bg-black text-white px-5 rounded-xl py-2">
      Claim token
    </button>
  );

  const getQuestionByBetType = (betType: string) => {
    switch (betType) {
      case BET_TYPE.ODD_EVEN_HALF_TIME: {
        return "Who win 1st half";
      }
      case BET_TYPE.ODD_EVEN_FULL_TIME: {
        return "Who win full match";
      }
      case BET_TYPE.OVER_UNDER_HALF_TIME: {
        return "1st half total goals";
      }
      case BET_TYPE.OVER_UNDER_FULL_TIME: {
        return "Full match total goals";
      }
      default: {
        return "N/A";
      }
    }
  };

  const getEarnedAmount = (result_num: any) =>
    result_num > 0 ? convertHexToStringNumber(result_num) : "0";

  const getAnswerText = (rowData: any) => {
    const isCorrectAnswer = rowData.result === "win";
    switch (rowData.bet_place) {
      case BET_PLACE.HOME: {
        return isCorrectAnswer ? rowData.home_name : rowData.away_name;
      }
      case BET_PLACE.DRAW: {
        return "Draw";
      }
      case BET_PLACE.AWAY: {
        return isCorrectAnswer ? rowData.away_name : rowData.home_name;
      }
      case BET_PLACE.UNDER: {
        return isCorrectAnswer ? "Higher" : "Lower";
      }
      case BET_PLACE.OVER: {
        return isCorrectAnswer ? "Lower" : "Higher";
      }
      default: {
        return "N/A";
      }
    }
  };

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

      {dataTable.map((rowData, index) => (
        <div
          key={rowData.match_id + index}
          className={clsx(
            "flex items-center px-5 py-2 border hover:bg-yellow-200 min-w-fit",
            isWhoWinTable ? styles.whoWinRow : styles.matchScoreRow,
          )}
        >
          {!isWhoWinTable && (
            <>
              <MatchName
                team1={{
                  name: rowData.home_name,
                  icon: getImgSrc(rowData.home_icon),
                }}
                team2={{
                  name: rowData.away_name,
                  icon: getImgSrc(rowData.away_icon),
                }}
              />
              <div>
                {rowData.home_score}:{rowData.away_score}
              </div>
              <div>{getDateTime(rowData.created_at)}</div>
              {rowData.match_predicted ? (
                <div>Waiting...</div>
              ) : (
                <MatchPredict isCorrect={rowData.result} />
              )}
              <div>{rowData.final_winner === account ? "Yes" : "No"}</div>
              <div>
                ${rowData.final_winner === account ? rowData.rewards : 0}
              </div>
            </>
          )}
          {isWhoWinTable && (
            <>
              <MatchName
                team1={{
                  name: rowData.home_name,
                  icon: getImgSrc(rowData.home_icon),
                }}
                team2={{
                  name: rowData.away_name,
                  icon: getImgSrc(rowData.away_icon),
                }}
              />
              <div>{getQuestionByBetType(rowData.bet_type)}</div>
              <div>{getAnswerText(rowData)}</div>
              <div>{getDateTime(rowData.created_at)}</div>
              <MatchPredict result={rowData.result} />
              <div>{convertHexToStringNumber(rowData.bet_amount)} $BIRD</div>
              <div>{getEarnedAmount(rowData.result_num)} $BIRD</div>
              <div>{convertHexToStringNumber(rowData.total_claim)} $BIRD</div>
              <div>
                {rowData.total_claim > 0 &&
                  (rowData.has_claim ? "Claimed" : renderClaimButton())}
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
