// eslint-disable-next-line @typescript-eslint/no-var-requires
const CryptoJS = require("crypto-js");

export type LoggingDataProps = {
  status: "error" | "success";
  type: "predict" | "bet" | "claim";
  user_address: string;
  match_id: string | undefined;
  bet_type?: string | undefined;
  home_score?: number | undefined;
  away_score?: number | undefined;
  amount?: string | undefined;
  //   time: number; // seconds
  errorText?: string;
};

// Encrypt
export const encryptData = (data: LoggingDataProps) => {
  if (!data) return null;

  return CryptoJS.AES.encrypt(
    JSON.stringify({ ...data, time: Date.now() / 1000 }),
    process.env.REACT_APP_ENCRYPT_SECRET_KEY,
  ).toString();
};

// Decrypt
export const decryptData = (encryptData: any) => {
  if (!encryptData) return null;

  const bytes = CryptoJS.AES.decrypt(
    encryptData,
    process.env.REACT_APP_ENCRYPT_SECRET_KEY,
  );
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8) || "{}");
  return decryptedData;
};
