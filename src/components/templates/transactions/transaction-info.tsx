import Container from "@/components/atoms/container";
import { useWallet } from "@/store/wallet";
import { TransactionResponse } from "@ethersproject/providers";
import { formatEther } from "@ethersproject/units";
import { FC } from "react";

interface TransactionInfoProps {}

const TransactionInfo: FC<TransactionInfoProps> = () => {
  const { transaction } = useWallet();
  const {
    chainId,
    confirmations,
    data,
    from,
    gasLimit,
    hash,
    nonce,
    value,
    wait,
    accessList,
    blockHash,
    blockNumber,
    gasPrice,
    maxFeePerGas,
    maxPriorityFeePerGas,
    timestamp,
    to,
    type,
  } = transaction as TransactionResponse;
  return (
    <>
      <div className="flex flex-col space-y-4">
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
        <div className="flex items-center space-x-4">
          <h4 className="text-xl text-gray-400 dark:text-gray-400">Amount</h4>
          <p className="text-xl text-gray-400 dark:text-gray-400">
            {value.toString()}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <h4 className="text-xl text-gray-400 dark:text-gray-400">
            Transaction timestamp
          </h4>
          <p className="text-xl text-gray-400 dark:text-gray-400">
            {timestamp}
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <h4 className="text-xl text-gray-400 dark:text-gray-400">Chain ID</h4>
          <p className="text-xl text-gray-400 dark:text-gray-400">{chainId}</p>
        </div>
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

        <a
          className="text-xl text-gray-400 dark:text-gray-400 hover:underline"
          href={`https://etherscan.io/tx/${hash}`}
        >
          See on Etherscan
        </a>
      </div>
    </>
  );
};

export default TransactionInfo;
