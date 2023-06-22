import Table from "@/components/atoms/table";
import { ITransaction, useWallet } from "@/store/wallet";
import { formatEther } from "@ethersproject/units";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

const TransactionList = () => {
  const { transactions } = useWallet();

  const columns = useMemo<ColumnDef<ITransaction>[]>(
    () => [
      {
        header: "Block Number",
        cell: (row) => row.renderValue(),
        accessorKey: "blockNumber",
      },
      {
        header: "From",
        cell: (row) => row.renderValue(),
        accessorKey: "from",
      },
      {
        header: "To",
        cell: (row) => row.renderValue(),
        accessorKey: "to",
      },
      {
        header: "Amount",
        cell: (row) => formatEther((row.renderValue() as any) || "0") + "ETH",
        accessorKey: "value",
      },
      {
        header: "Transaction timestamp",
        cell: (row) => row.renderValue(),
        accessorKey: "timeStamp",
      },
      {
        header: "Link",
        accessorKey: "hash",
        // @ts-ignore
        cell: (row) =>
          row.getValue() && (
            <a href={`/transactions/${row.getValue()}`}>See details</a>
          ),
      },
    ],
    []
  );

  return (
    <>
      <Table columns={columns} data={transactions} />
    </>
  );
};

export default TransactionList;
