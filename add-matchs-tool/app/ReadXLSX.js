var XLSX = require("xlsx");

const matchData = async () => {
  var workbook = await XLSX.readFile("./data/round_table_matchs1.xlsx");
  var sheet_name_list = workbook.SheetNames;
  var xlData = await XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  var matchInfo = [];

  for (let i = 0; i < xlData.length; i++) {
    let mData = {
      mID: xlData[i]?.match_id,
      mSta: [
        Math.round(xlData[i]?.ou_ht_over * 1000),
        Math.round(xlData[i]?.ou_ht_ratio * 1000),
        Math.round(xlData[i]?.ou_ht_under * 1000),
        Math.round(xlData[i]?.ou_ft_over * 1000),
        Math.round(xlData[i]?.ou_ft_ratio * 1000),
        Math.round(xlData[i]?.ou_ft_under * 1000),
        Math.round(xlData[i]?.odds_ht_home * 1000),
        Math.round(xlData[i]?.odds_ht_draw * 1000),
        Math.round(xlData[i]?.odds_ht_away * 1000),
        Math.round(xlData[i]?.odds_ft_home * 1000),
        Math.round(xlData[i]?.odds_ft_draw * 1000),
        Math.round(xlData[i]?.odds_ft_away * 1000),
      ],
      mInf: [
        xlData[i]?.ht_home_score,
        xlData[i]?.ht_away_score,
        xlData[i]?.ft_home_score,
        xlData[i]?.ft_away_score,
        xlData[i]?.start_time,
        xlData[i]?.home_name,
        xlData[i]?.home_icon.toString(),
        xlData[i]?.away_name,
        xlData[i]?.away_icon.toString(),
        xlData[i]?.stadium,
        xlData[i]?.round_name.toString(),
        xlData[i]?.is_half_time,
        xlData[i]?.is_full_time,
      ],
      sofaID: xlData[i]?.sofa_match_id,
    };
    matchInfo.push(mData);
  }
  console.log(matchInfo);
  return matchInfo;
};

const walletData = async () => {
  var workbook = await XLSX.readFile("./data/wallet.xlsx");
  var sheet_name_list = workbook.SheetNames;
  var xlData = await XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  var address = [];
  var private_key = [];
  for (let i = 0; i < xlData.length; i++) {
    address.push(xlData[i].address);
    private_key.push(xlData[i].private_key);
  }
  return { adds: address, prik: private_key };
};
module.exports = {
  matchData,
  walletData,
};
