import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { WalletContext } from "../../contexts/WalletContext";
import useFetch from "../../hooks/useFetch";
import { displayWalletAddress } from "../../utils";

const LoginPage = () => {
  const navigate = useNavigate();

  const { connectedAccount, tryActivate, logout, setIsAuth } =
    useContext(WalletContext);
  const [loading, setLoading] = useState<boolean>(false);

  const { data: response } = useFetch<any>(
    "/dashboard?startTime=1661252949&endTime=1669050000",
    !!connectedAccount,
    false,
    connectedAccount,
  );

  useEffect(() => {
    if (response && response?.status === 200) {
      setIsAuth && setIsAuth(true);
      navigate("/dashboard");
    }
  }, [response]);

  const handleUserLogin = async () => {
    setLoading(true);
    try {
      tryActivate && tryActivate();
    } catch (error) {
      console.log("tryActivate ERR:", error);
    }
    setLoading(false);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col max-w-[500px]">
        <div className="text-48/60">Connect Your Wallet</div>
        <div className="text-center mt-10 text-18/24">
          {connectedAccount ? (
            <div className="flex flex-col">
              <p className="text-green-600 font-semibold">
                Connected: {displayWalletAddress(connectedAccount)}
              </p>
              {!response?.data && (
                <p className="text-red-400 font-semibold">
                  You do not have permission to view this
                </p>
              )}
            </div>
          ) : (
            <p>Connect to continue signing in!</p>
          )}
        </div>
        {connectedAccount ? (
          <button
            onClick={logout}
            className="h-14 text-white mt-10 flex justify-center items-center w-full bg-red-500 rounded-xl uppercase font-semibold"
          >
            Disconnect
          </button>
        ) : (
          <button
            onClick={handleUserLogin}
            disabled={loading}
            className="h-14 text-white mt-10 flex justify-center items-center w-full bg-orange-500 rounded-xl uppercase font-semibold"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
