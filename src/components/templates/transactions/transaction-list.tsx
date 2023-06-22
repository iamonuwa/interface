import Table from "@/components/atoms/table";
import { useWallet } from "@/store/wallet";
import { shortenHex } from "@/utils";
import { TransactionResponse } from "@ethersproject/providers";
import { formatEther } from "@ethersproject/units";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

const TransactionList = () => {
  const { transactions } = useWallet();

  const columns = useMemo<ColumnDef<TransactionResponse>[]>(
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
        cell: (row) => shortenHex(row.renderValue() as any, 10),
        accessorKey: "to",
      },
      {
        header: "Amount",
        cell: (row) => formatEther((row.renderValue() as any) || "0") + "ETH",
        accessorKey: "value",
        enableSorting: true,
        sortingFn: (a, b) => {
          const aVal = parseFloat(a.id) || 0;
          const bVal = parseFloat(b.id) || 0;
          return aVal - bVal;
        },
      },
      {
        header: "Timestamp",
        cell: (row) => row.renderValue(),
        accessorKey: "timestamp",
        enableSorting: true,
        sortingFn: (a, b) => {
          const aVal = parseFloat(a.id) || 0;
          const bVal = parseFloat(b.id) || 0;
          return aVal - bVal;
        },
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
