import { fetchAPI } from '@/libs/fetch';
import { JsonRpcProvider, TransactionResponse } from '@ethersproject/providers';
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
    transactions: Array<ITransaction>;
    transaction: TransactionResponse | null;
    balance: string
    account: string
}

interface WalletState extends IWallet {
    initialize: (wallet: string) => Promise<void>;
    loadTransaction: (txHash: string) => Promise<void>;
}

const buildTransactionURI = (wallet: string) => `https://api.etherscan.io/api?module=account&action=txlist&address=${wallet}&startblock=0&endblock=99999999&sort=asc`
const buildWalletURI = (wallet: string) => `https://api.etherscan.io/api?module=account&action=balance&address=${wallet}&tag=latest`

const defaults: IWallet = {
    transactions: [],
    balance: "0",
    account: "",
    transaction: null,
}

const STORE_NAME = "wallet";

const useWalletStore = create<WalletState>()(
    devtools(
        persist(
            (set, get) => ({
                ...defaults,
                initialize: async (wallet: string) => {
                    const etherscan_api_key = process.env.NEXT_ETHERSCAN_API_KEY as string;
                    const [transactions, balance] = await Promise.all([
                        await fetchAPI(`${buildTransactionURI(wallet)}?apikey=${etherscan_api_key}`, {}),
                        await fetchAPI(`${buildWalletURI(wallet)}&apikey=${etherscan_api_key}`, {}),
                    ])
                    set({ transactions: transactions.data.result, balance: balance.data.result, account: wallet })
                },
                loadTransaction: async (txHash: string) => {
                    const provider = new JsonRpcProvider(
                        "https://mainnet.infura.io/v3/8365ba3a83054a92bac3585c1ecaa139", {
                        chainId: 1,
                        name: "mainnet",
                    }
                    );
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
    initialize: state.initialize,
    transactions: state.transactions,
    balance: state.balance,
    account: state.account,
    loadTransaction: state.loadTransaction,
    transaction: state.transaction,
}));
