import { useEffect } from "react";

type HistoryTableTypes = {
  data: Array<any>;
  tableLoading: boolean;
};

const HistoryTable = (props: HistoryTableTypes) => {
  const { data = [], tableLoading } = props;

  useEffect(() => {
    console.log("dataTable", data);
  }, [data]);

  const renderLoading = () => {
    return <div className="">Loading ... </div>;
  };

  if (tableLoading) renderLoading();

  return <div>HistoryTable</div>;
};

export default HistoryTable;
