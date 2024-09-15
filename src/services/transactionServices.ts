import { Transaction } from "@/types/Transaction";
import api from "@/axios/api";

export const fetchTransactions = async (): Promise<Transaction[]> => {
  const response = await api.get("/transactions");
  return response.data.data;
};
