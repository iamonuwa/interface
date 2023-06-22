import Table from "@/components/atoms/table";
import { useWallet } from "@/store/wallet";
import { shortenHex } from "@/utils";
import { TransactionResponse } from "@ethersproject/providers";
import { formatEther } from "@ethersproject/units";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import Link from "next/link";

const TransactionList = () => {
  const { transactions } = useWallet();

  const columns = useMemo<ColumnDef<TransactionResponse>[]>(
    () => [
      {
        header: "Block Number",
        cell: (row) => row.renderValue(),
        accessorKey: "blockNumber",
        enableSorting: false,
      },
      {
        header: "From",
        cell: (row) => shortenHex(row.renderValue() as any, 6),
        accessorKey: "from",
        enableSorting: false,
      },
      {
        header: "To",
        cell: (row) => shortenHex(row.renderValue() as any, 6),
        accessorKey: "to",
        enableSorting: false,
      },
      {
        header: "Amount",
        cell: (row) => formatEther((row.renderValue() as any) || "0") + "ETH",
        accessorKey: "value",
        enableSorting: true,
      },
      {
        header: "Timestamp",
        cell: (row) =>
          new Date((Number(row.renderValue()) * 1000) as any).toLocaleString(),
        accessorKey: "timestamp",
        enableSorting: true,
      },
      {
        header: "Link",
        accessorKey: "hash",
        enableSorting: false,
        // @ts-ignore
        cell: (row) =>
          row.getValue() && (
            <Link href={`/transactions/${row.getValue()}`}>See details</Link>
          ),
      },
    ],
    []
  );

  return (
    <div className="px-4">
      {transactions.length > 0 ? (
        <div className="flex flex-col overflow-x-auto">
          <div className="sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-x-auto">
                <Table columns={columns} data={transactions} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-base text-white text-center">
          Enter an address to get information about the wallet
        </p>
      )}
    </div>
  );
};

export default TransactionList;
