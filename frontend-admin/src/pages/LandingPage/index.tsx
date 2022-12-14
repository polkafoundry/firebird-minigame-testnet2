import { useContext, useEffect, useState } from "react";
import { WalletContext } from "../../contexts/WalletContext";
import useFetch from "../../hooks/useFetch";
import DefaultLayout from "../../layouts/DefaultLayout";
import MainContent from "./MainContent";
import WinnerTable from "./WinnerTable";

const LandingPage = () => {
  const { connectedAccount } = useContext(WalletContext);

  const { data: response, loading } = useFetch<any>(
    "/dashboard",
    !!connectedAccount,
    false,
    connectedAccount,
  );
  const [statistics, setStatistics] = useState<any>();
  const [dataTable, setDataTable] = useState<any[]>([]);

  useEffect(() => {
    if (response && response?.status === 200) {
      const resData = response.data;
      const data = [
        {
          label: "Betting Tx",
          value: resData?.betting_tx,
        },
        {
          label: "Betting Users",
          value: resData?.betting_user,
        },
        {
          label: "Predict Tx",
          value: resData?.predict_tx,
        },
        {
          label: "Predict Users",
          value: resData?.predict_user,
        },
        {
          label: "Claim Tx",
          value: resData?.claim_tx,
        },
      ];
      setStatistics(data);
      setDataTable(resData?.predict_winner);
    }
  }, [response]);

  return (
    <DefaultLayout>
      <div className="flex w-full h-full min-h-screen">
        <div className="flex flex-col w-full max-w-screen-main mx-auto pb-20">
          <MainContent statistics={statistics} />

          <WinnerTable dataTable={dataTable} loading={loading} />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default LandingPage;
