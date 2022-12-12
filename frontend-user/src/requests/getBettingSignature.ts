import { sendPostRequest } from "./getMyHistory";

type DataBettingTypes = {
  _matchID: string | undefined;
  _wallet: string | undefined;
  _betType: string | undefined;
  _betPlace: string | undefined;
  _amount: string | undefined;
};

export const getBettingSignature = async (dataBetting: DataBettingTypes) => {
  const { _amount, _betPlace, _betType, _matchID, _wallet } = dataBetting;
  const data = {
    amount: _amount,
    bet_place: _betPlace,
    bet_type: _betType,
    match_id: _matchID,
    wallet: _wallet,
  };
  const signatureRes = await sendPostRequest("/user-betting", data);
  if (signatureRes?.status !== 200 || !signatureRes?.data) return;

  const rawSignature = signatureRes?.data;
  return {
    deadline: rawSignature?.deadline,
    v: rawSignature?.v,
    r: rawSignature?.r?.data,
    s: rawSignature?.s?.data,
  };
};
