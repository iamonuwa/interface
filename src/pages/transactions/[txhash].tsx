import Layout from "@/components/templates/layout";
import TransactionInfo from "@/components/templates/transactions/transaction-info";
import WalletInformation from "@/components/templates/wallet-info";
import { useWallet } from "@/store/wallet";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function TransactionDetails() {
  const { fetchTransaction } = useWallet();
  const router = useRouter();

  useEffect(() => {
    fetchTransaction(router.query.txhash as string);
  }, [fetchTransaction, router.query.txhash]);

  return (
    <Layout>
      <div className="flex flex-col space-y-12">
        <WalletInformation />
        <TransactionInfo />
      </div>
    </Layout>
  );
}
