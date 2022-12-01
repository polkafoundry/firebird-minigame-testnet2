import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import DropDown from "../../components/base/DropDown";
import { platforms, PLATFORM } from "../../constants";
import { WalletContext } from "../../contexts/WalletContext";
import useFetch from "../../hooks/useFetch";
import DefaultLayout from "../../layouts/DefaultLayout";
import CodeListTable from "./CodeListTable";

export type FilterTypes = {
  search: string;
  codeType: typeof PLATFORM[keyof typeof PLATFORM];
  page: number;
  size: number;
};

const GiftCodePage = () => {
  const { connectedAccount } = useContext(WalletContext);

  const [filter, setFilter] = useState<FilterTypes>({
    codeType: "",
    size: 20,
    page: 1,
    search: "",
  });

  const [dataTable, setDataTable] = useState<any[]>([]);
  const {
    data: response,
    loading,
    mutate,
  } = useFetch<any>(
    `/code/get-avaiable-code?platfrom=${filter.codeType}`,
    true,
    true,
    connectedAccount,
  );

  useEffect(() => {
    if (!response) return;
    if (response.status !== 200) {
      toast.error(response.message || "Fail to load list code");
      return;
    }

    setDataTable(response.data?.data);

    console.log("data", response);
  }, [response]);

  useEffect(() => {
    const getData = setTimeout(async () => {
      // setLoading(true);
      // const res = await getListCode();
      // console.log("Res", res);
      // setLoading(false);
      mutate(undefined, false);

      return () => clearTimeout(getData);
    }, 500);
  }, [filter]);

  const handleChangeStatus = (value: any) => {
    setFilter((prevFilter: FilterTypes) => ({
      ...prevFilter,
      codeType: value,
    }));
  };

  const handleSearch = (e: any) => {
    setFilter((prevFilter: FilterTypes) => ({
      ...prevFilter,
      search: e.target.value,
    }));
  };

  return (
    <DefaultLayout>
      <div className="flex w-full h-full min-h-screen">
        <div className="flex flex-col w-full max-w-screen-main mx-auto pt-10 pb-20">
          <p className="m-0 text-32/40 font-semibold">Code List</p>

          <div className="flex mt-10">
            <div className="">
              <DropDown
                label="Status"
                items={platforms}
                selectedValue={filter.codeType}
                onChange={handleChangeStatus}
                className="w-[200px] text-14/24 border border-black"
                itemsClassName=""
                bgColor="white"
              />
            </div>

            <div className="flex rounded-md items-center px-4 border border-black w-[250px] ml-5">
              <input
                type="text"
                className="outline-none w-full h-full rounded-md bg-inherit"
                placeholder="Search code"
                onChange={handleSearch}
              />
              <img src="/images/icon-search.svg" alt="" />
            </div>
          </div>

          <CodeListTable dataTable={dataTable} loading={loading} />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default GiftCodePage;
