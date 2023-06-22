import Layout from "@/components/templates/layout";
import WalletInformation from "@/components/templates/wallet-info";
import TransactionList from "@/components/templates/transactions/transaction-list";

export default function Transactions() {
  return (
    <Layout>
      <div className="flex flex-col space-y-12">
        <WalletInformation />
        <TransactionList />
      </div>
    </Layout>
  );
}
