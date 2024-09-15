// src/components/features/Transactions.tsx
import React from "react";
import { fetchTransactions } from "@/services/transactionServices";
import { Transaction } from "@/types/Transaction";
import { formatDate } from "@/utils/formatDate";
import { getCurrencySymbol } from "@/utils/getCurrencySymbol";
import withLoading from "@/HOC/withLoading";

const TransactionsList = ({
  data,
  error,
}: {
  data: Transaction[];
  error: string | null;
}) => {
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="overflow-scroll w-full h-full">
      {data.map((transaction: Transaction) => (
        <div key={transaction.id} className="transaction-item pt-2 px-5 mb-2">
          <div className="flex justify-between items-center font-bold text-lg pb-1">
            <h2>{transaction.type}</h2>
            <p>
              {getCurrencySymbol(transaction.currency)} {transaction.sum}
            </p>
          </div>
          <div className="flex justify-between font-thin text-sm">
            <h2>{formatDate(transaction.createdAt)}</h2>
            <span
              className={`bg-${transaction.status.toLowerCase()} px-1 rounded-md text-${transaction.status.toLowerCase()}Text`}
            >
              {transaction.status.toLowerCase()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default withLoading(TransactionsList, fetchTransactions);
