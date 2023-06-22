import Layout from "@/components/templates/layout";
import WalletInformation from "@/components/templates/wallet-info";
import TransactionList from "@/components/templates/transactions/transaction-list";
import { useEffect } from "react";
import { useWallet } from "@/store/wallet";

export default function Transactions() {
  const { initialize } = useWallet();

  useEffect(() => {
    initialize("0x8c1fFf7558B7920b6eC3FbB27d21D40E42678E22");
  }, [initialize]);

  return (
    <Layout>
      <div className="flex flex-col space-y-12">
        <WalletInformation />
        <TransactionList />
      </div>
    </Layout>
  );
}
