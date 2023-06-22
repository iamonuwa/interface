import { useWallet } from "@/store/wallet";
import { formatEther } from "@ethersproject/units";
import { useForm } from "react-hook-form";

const WalletInfo = () => {
  const { balance, account, fetchBalance, fetchTransactions } = useWallet();
  const { register, handleSubmit } = useForm({
    mode: "all",
  });

  const getWalletInformation = async (data: any) => {
    await fetchBalance(data.wallet);
    await fetchTransactions(data.wallet);
  };

  return (
    <div className="flex flex-col items-center space-y-10 p-4">
      <form
        className="flex flex-col md:flex-row md:space-x-2 w-full space-y-2 md:space-y-0"
        onSubmit={handleSubmit(getWalletInformation)}
      >
        <input
          type="text"
          autoFocus
          id="wallet"
          {...register("wallet", { required: true })}
          className="block w-full h-12 px-3 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-xl sm:leading-6"
          placeholder="Enter your wallet address"
        />
        <button
          type="submit"
          className="rounded-md md:w-96 bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Load Wallet Information
        </button>
      </form>
      <h1 className="text-4xl font-semibold leading-6 text-white dark:text-gray-900">
        {account}
      </h1>
      {account && (
        <p className="text-xl text-gray-400 dark:text-gray-400">
          Wallet Balance: {formatEther(balance)} ETH (0.00 USD)
        </p>
      )}
    </div>
  );
};

export default WalletInfo;
