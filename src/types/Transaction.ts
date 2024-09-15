export interface Transaction {
  id: string;
  type: string;
  status: string;
  sum: number;
  currency: string;
  createdAt: string;
  userId: string;
}
