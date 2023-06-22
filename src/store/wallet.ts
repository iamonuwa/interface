import { fetchAPI } from '@/libs/fetch';
import { BigNumberish } from '@ethersproject/bignumber';
import { EtherscanProvider, TransactionResponse } from '@ethersproject/providers';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface ITransaction {
    blockHash: string;
    blockNumber: string;
    confirmations: string;
    contractAddress: string;
    cumulativeGasUsed: string;
    from: string;
    gas: string;
    gasPrice: string;
    gasUsed: string;
    hash: string;
    input: string;
    isError: string;
    nonce: string;
    timeStamp: string;
    to: string
    transactionIndex: string
    txreceipt_status: string
    value: string
}

interface IWallet {
    transactions: Array<TransactionResponse>;
    transaction: TransactionResponse | null;
    balance: BigNumberish
    account: string
}

interface WalletState extends IWallet {
    fetchTransactions: (wallet: string) => Promise<void>;
    fetchBalance: (wallet: string) => Promise<void>;
    fetchTransaction: (txHash: string) => Promise<void>;
}

const defaults: IWallet = {
    transactions: [],
    transaction: null,
    balance: "0",
    account: "",
}

const STORE_NAME = "wallet";
const etherscan_api_key = process.env.NEXT_ETHERSCAN_API_KEY as string;

const useWalletStore = create<WalletState>()(
    devtools(
        persist(
            (set, _) => ({
                ...defaults,
                fetchTransactions: async (wallet: string) => {
                    const provider = new EtherscanProvider("homestead", etherscan_api_key)
                    const data = await provider.getHistory(wallet)
                    set({ transactions: data })
                },
                fetchBalance: async (wallet: string) => {
                    const provider = new EtherscanProvider("homestead", etherscan_api_key)
                    const balance = await provider.getBalance(wallet)
                    set({ balance, account: wallet })
                },
                fetchTransaction: async (txHash: string) => {
                    const provider = new EtherscanProvider("homestead", etherscan_api_key)
                    const transaction = await provider.getTransaction(txHash);
                    set({ transaction });
                },
            }),
            {
                name: STORE_NAME,
            },
        ),
    )
);

export const useWallet = () => useWalletStore(state => ({
    transactions: state.transactions,
    transaction: state.transaction,
    balance: state.balance,
    account: state.account,
    fetchTransaction: state.fetchTransaction,
    fetchBalance: state.fetchBalance,
    fetchTransactions: state.fetchTransactions,
}));
