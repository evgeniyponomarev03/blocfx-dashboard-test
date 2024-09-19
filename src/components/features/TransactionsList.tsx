// src/components/features/Transactions.tsx
import { useMemo } from "react";
import Image from "next/image";
import { fetchTransactions } from "@/services/transactionServices";
import { Transaction } from "@/types/Transaction";
import { formatDate } from "@/utils/formatDate";
import { getCurrencySymbol } from "@/utils/getCurrencySymbol";
import withLoading from "@/HOC/withLoading";
import Icons from "@/assets/icons";

const TransactionIconsMap = {
  CashOut: Icons.Exchange,
  CashIn: Icons.CashIn,
  TransferToCard: Icons.TransferTransaction,
};

const TransactionsList = ({
  data,
  error,
  pickedCurrency,
}: {
  pickedCurrency: undefined | string;
  data: Transaction[];
  error: string | null;
}) => {
  const filteredData = useMemo(() => {
    if (!pickedCurrency) return data;

    return data.filter(
      (transaction) => transaction.currency === pickedCurrency
    );
  }, [pickedCurrency, data]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="overflow-scroll w-full h-full">
      {filteredData.map((transaction: Transaction) => (
        <div key={transaction.id} className="pt-2 px-5 mb-2">
          <div className="flex justify-between items-center gap-2 font-bold text-lg pb-1">
            <Image
              width={52}
              height={52}
              src={
                TransactionIconsMap[
                  transaction.type as keyof typeof TransactionIconsMap
                ]
              }
              alt={transaction.type}
            />
            <div className="mr-auto">
              <h2>{transaction.type}</h2>
              <div className="flex justify-between font-thin text-sm">
                <h2>{formatDate(transaction.createdAt)}</h2>
              </div>
            </div>
            <div className="ml-auto flex flex-col items-end">
              <p>
                {getCurrencySymbol(transaction.currency)} {transaction.sum}
              </p>
              <span
                className={`bg-${transaction.status.toLowerCase()} text-sm px-1 rounded-md text-${transaction.status.toLowerCase()}Text`}
              >
                {transaction.status.toLowerCase()}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default withLoading(TransactionsList, fetchTransactions);
