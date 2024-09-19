"use client";
import Images from "@/assets/images";
import api from "@/axios/api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Card = ({ fullScreen }: { fullScreen: boolean }) => {
  const [cardData, setCardData] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const result = await api.get("/users/cards/plastic-card");

      setCardData(result.data);
    })();
  }, []);

  const getContent = () => {
    console.log({ cardData: cardData?.data?.status });
    if (!cardData) return null;

    switch (cardData.data.status) {
      case "NoCard":
        return (
          <Link
            href="/card-order"
            className="absolute left-1/2 bottom-12 -translate-x-1/2 font-bold spacing tracking-[2px] shadow-md p-2 w-2/3 rounded-xl text-center"
          >
            Order your card
          </Link>
        );
      case "Done":
        return (
          <strong className="absolute left-1/2 bottom-12 -translate-x-1/2 font-bold spacing tracking-[2px] shadow-md p-2 w-3/4 rounded-xl text-center">
            {cardData.data.cardNumber
              .replace(/\D/g, "")
              .replace(/(.{4})/g, "$1 ")
              .trim()}
          </strong>
        );
      case "InProgress":
        return (
          <strong className="absolute left-1/2 bottom-12 -translate-x-1/2 font-bold spacing tracking-[2px] shadow-md p-2 w-3/4 rounded-xl text-center">
           Your card in progress.
          </strong>
        );
    }
  };
  return (
    <div
      className={`h-[183px] w-[284px] mx-auto z-10 transition-all duration-500  ${
        fullScreen ? "static opacity-0" : "relative"
      }`}
    >
      <Image
        className="object-cover"
        src={Images.Card}
        alt="card"
        width={284}
        height={183}
        unoptimized
      />
      {getContent()}
    </div>
  );
};

export default Card;
