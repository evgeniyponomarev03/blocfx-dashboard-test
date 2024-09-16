// src/components/features/UserCards.tsx
import React, { useState } from "react";
import Image from "next/image";
import Icons from "@/assets/icons";
import { fetchUserCards } from "@/services/cardsServices";
import { UserCard } from "@/types/UserCard";
import withLoading from "@/HOC/withLoading";
import CURRENCIES from "@/constants/currencies";
import { formatBalance } from "@/utils/formatBalance";

const UserCards = ({
  data,
  error,
}: {
  data: UserCard[];
  error: string | null;
}) => {
  const [pickedCurrency, setPickedCurrency] = useState<null | UserCard>(null);
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="relative">
      <div className="balance py-5 flex items-center gap-4 flex-nowrap overflow-x-scroll">
        {pickedCurrency && (
          <div className="p-2 absolute left-0 right-0 top-5 bottom-5 bg-white rounded-md text-black">
            <button
              onClick={() => setPickedCurrency(null)}
              className="absolute right-2 top-2"
            >
              <Image width={20} height={20} src={Icons.Close} alt="close" />
            </button>
            <div className="flex gap-10">
              <div>
                <div className="flex items-center gap-2">
                  <Image
                    src={Icons[pickedCurrency.currency]}
                    alt="icon"
                    width={30}
                    height={30}
                    className="w-[30px] h-[30px]"
                  />
                  <p className="text-[15px]">{pickedCurrency.currency}</p>
                </div>
                <p className="text-[18spx] font-bold">
                  {CURRENCIES[pickedCurrency.currency]}{" "}
                  {formatBalance(pickedCurrency.balance) || 0}
                </p>
                <small className="text-sm">Total balance</small>
              </div>
              <div className="font-bold flex flex-col justify-center text-grey">
                <strong>IBAN: {pickedCurrency.iban || "-"}</strong>
                <strong>SWIFT: {pickedCurrency.swift || "-"}</strong>
              </div>
            </div>
          </div>
        )}
        {data.map((card: UserCard) => (
          <div
            key={card.id}
            onClick={() => setPickedCurrency(card)}
            className="card pt-2 pl-[14px] pr-[20px] pb-4 bg-white rounded-md text-[#51382F] min-w-[110px]"
          >
            <div className="flex items-center gap-2">
              <Image
                src={Icons[card.currency]}
                alt="icon"
                width={30}
                height={30}
                className="w-[30px] h-[30px]"
              />
              <p className="text-[15px]">{card.currency}</p>
            </div>
            <p className="text-[18spx] font-bold">
              {CURRENCIES[card.currency]} {card.balance}
            </p>
            <p className="text-[12px]">Total Balance</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default withLoading(UserCards, fetchUserCards);
