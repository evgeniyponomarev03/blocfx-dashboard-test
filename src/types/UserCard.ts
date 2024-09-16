import CURRENCIES from "@/constants/currencies";

export interface UserCard {
  id: string;
  currency: keyof typeof CURRENCIES;
  balance: number;
  userId: string;
  iban: string | null;
  swift: string | null;
}
