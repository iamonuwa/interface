import { useWallet } from "@/store/wallet";
import { formatEther } from "@ethersproject/units";

const WalletInfo = () => {
  const { balance, account } = useWallet();
  return (
    <div className="flex flex-col space-y-10">
      <h1 className="text-4xl font-semibold leading-6 text-white dark:text-gray-900">
        {account}
      </h1>
      <p className="text-xl text-gray-400 dark:text-gray-400">
        Wallet Balance: {formatEther(balance)} ETH (0.00 USD)
      </p>
    </div>
  );
};

export default WalletInfo;
