import { useWallet } from "@/store/wallet";
import { TransactionResponse } from "@ethersproject/providers";
import { formatEther } from "@ethersproject/units";
import { FC } from "react";

interface TransactionInfoProps {}

const TransactionInfo: FC<TransactionInfoProps> = () => {
  const { transaction } = useWallet();
  if (!transaction) return null;
  const {
    confirmations,
    from,
    hash,
    value,
    blockNumber,
    gasPrice,
    timestamp,
    to,
  } = transaction as unknown as TransactionResponse;

  console.log(transaction);
  return (
    <div className="flex flex-col space-y-4 px-4">
      <div className="flex items-center space-x-4">
        <h4 className="text-xl text-gray-400 dark:text-gray-400">
          Block Number
        </h4>
        <p className="text-xl text-gray-400 dark:text-gray-400">
          {blockNumber}
        </p>
      </div>

      <div className="flex items-center space-x-4">
        <h4 className="text-xl text-gray-400 dark:text-gray-400">From</h4>
        <p className="text-xl text-gray-400 dark:text-gray-400">{from}</p>
      </div>

      <div className="flex items-center space-x-4">
        <h4 className="text-xl text-gray-400 dark:text-gray-400">To</h4>
        <p className="text-xl text-gray-400 dark:text-gray-400">{to}</p>
      </div>
      {timestamp && (
        <div className="flex items-center space-x-4">
          <h4 className="text-xl text-gray-400 dark:text-gray-400">
            Transaction timestamp
          </h4>
          <p className="text-xl text-gray-400 dark:text-gray-400">
            {timestamp}
          </p>
        </div>
      )}

      <div className="flex items-center space-x-4">
        <h4 className="text-xl text-gray-400 dark:text-gray-400">Amount</h4>
        <p className="text-xl text-gray-400 dark:text-gray-400">
          {formatEther(value)} ETH
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <h4 className="text-xl text-gray-400 dark:text-gray-400">
          Confirmations
        </h4>
        <p className="text-xl text-gray-400 dark:text-gray-400">
          {confirmations}
        </p>
      </div>

      <div className="flex items-center space-x-4">
        <h4 className="text-xl text-gray-400 dark:text-gray-400">Gas Used</h4>
        <p className="text-xl text-gray-400 dark:text-gray-400">
          {gasPrice?.toString()}
        </p>
      </div>

      <a
        className="text-xl text-gray-400 dark:text-gray-400 hover:underline"
        target="_blank"
        rel="noreferrer noopener"
        href={`https://etherscan.io/tx/${hash}`}
      >
        See on Etherscan
      </a>
    </div>
  );
};

export default TransactionInfo;
