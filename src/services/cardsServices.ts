import { UserCard } from "@/types/UserCard";
import api from "@/axios/api";

export const fetchUserCards = async (): Promise<UserCard[]> => {
  const response = await api.get("/users/cards");
  return response.data.data;
};
