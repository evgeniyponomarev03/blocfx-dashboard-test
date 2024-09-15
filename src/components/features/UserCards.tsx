// src/components/features/UserCards.tsx
import React from "react";
import Image from "next/image";
import Icons from "@/assets/icons";
import { fetchUserCards } from "@/services/cardsServices";
import { UserCard } from "@/types/UserCard";
import withLoading from "@/HOC/withLoading";

const UserCards = ({
  data,
  error,
}: {
  data: UserCard[];
  error: string | null;
}) => {
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="balance py-5 flex items-center gap-4 flex-nowrap overflow-x-scroll">
      {data.map((card: UserCard) => (
        <div
          key={card.id}
          className="card pt-2 pl-[14px] pr-[20px] pb-4 bg-white rounded-md text-[#51382F] min-w-[110px]"
        >
          <div className="flex items-center gap-2">
            <Image
              src={Icons[card.currency as keyof typeof Icons]}
              alt="icon"
              width={30}
              height={30}
              className="w-[30px] h-[30px]"
            />
            <p className="text-[15px]">{card.currency}</p>
          </div>
          <p className="text-[18spx] font-bold">
            {card.currency} {card.balance}
          </p>
          <p className="text-[12px]">Total Balance</p>
        </div>
      ))}
    </div>
  );
};

export default withLoading(UserCards, fetchUserCards);
