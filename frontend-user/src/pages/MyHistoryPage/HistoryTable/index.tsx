import clsx from "clsx";
import DefaultLoading from "../../../components/base/DefaultLoading";
import MatchName from "../../../components/base/Table/MatchName";
import MatchPredict from "../../../components/base/Table/MatchPredict";
import { BET_PLACE, BET_TYPE } from "../../../constants";
import {
  convertHexToNumberFormat,
  formatCurrency,
  getDateTime,
  getImgSrc,
} from "../../../utils";
import ClaimTokenRow from "../ClaimTokenRow";
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
    result_num > 0 ? convertHexToNumberFormat(result_num) : "0";

  const getAnswerText = (rowData: any) => {
    switch (rowData.bet_place) {
      case BET_PLACE.HOME: {
        return rowData.home_name;
      }
      case BET_PLACE.DRAW: {
        return "Draw";
      }
      case BET_PLACE.AWAY: {
        return rowData.away_name;
      }
      case BET_PLACE.UNDER: {
        return "Lower";
      }
      case BET_PLACE.OVER: {
        return "Higher";
      }
      default: {
        return "N/A";
      }
    }
  };

  return (
    <div className="bg-white w-full overflow-x-auto">
      <div
        id="match-score"
        className={clsx(
          "flex items-center text-16/20 bg-[#3A0013] rounded-t-lg text-white p-5 font-semibold font-tthoves min-w-fit",
          isWhoWinTable ? styles.whoWinRow : styles.matchScoreRow,
        )}
      >
        {headings.map((heading) => (
          <div key={heading}>{heading}</div>
        ))}
      </div>

      <div className="relative flex flex-col w-full min-h-[300px]">
        {tableLoading && <DefaultLoading />}

        {dataTable.map((rowData) => (
          <div
            key={rowData?.id}
            className={clsx(
              "flex items-center px-5 py-2 border-t hover:bg-yellow-200 font-inter text-14/24  min-w-fit",
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
                  <MatchPredict isCorrect={rowData.result} />
                ) : (
                  <div className="font-tthoves font-semibold">Waiting...</div>
                )}
                <div>{rowData.final_winner === account ? "Yes" : "No"}</div>
                <div>
                  $
                  {rowData.final_winner === account
                    ? formatCurrency(rowData.rewards)
                    : 0}
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
                <div className="capitalize">
                  {getAnswerText(rowData).toLowerCase()}
                </div>
                {rowData.is_calculated ? (
                  <MatchPredict isCorrect={rowData.result === "win"} />
                ) : (
                  <div className="font-tthoves font-semibold">Waiting...</div>
                )}
                <div>{convertHexToNumberFormat(rowData.bet_amount)}</div>
                <div>{getEarnedAmount(rowData.result_num)}</div>
                <div>{convertHexToNumberFormat(rowData.total_claim)}</div>
                <ClaimTokenRow
                  account={account}
                  data={rowData}
                  isCorrect={rowData.result === "win"}
                />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryTable;
