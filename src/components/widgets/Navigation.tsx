"use client";

import Image from "next/image";
import Icons from "@/assets/icons";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Navigation = () => {
  const router = useRouter();
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div
      className={
        "w-full h-[10dvh] bg-white rounded-bl-2xl rounded-br-2xl py-5 px-8 absolute bottom-0 opacity-95 flex items-center gap-8 backdrop-blur-[2.5px]"
      }
    >
      <div
        className={
          "flex flex-col items-center justify-between h-full cursor-pointer"
        }
        onClick={() => router.push("/")}
      >
        <Image
          src={Icons.HomeIcon}
          alt={"Home"}
          width={20}
          height={20}
          className={"w-[20px] h-[20px]"}
        />
        <p className={"text-[12px]"}>Home</p>
      </div>
      <div
        className={
          "flex flex-col items-center justify-between h-full cursor-pointer"
        }
        onClick={toggleFullScreen}
      >
        <Image
          src={Icons.TransferIconBlack}
          alt={"transfer icon"}
          width={22}
          height={22}
          className={"w-[22px] h-[22px]"}
        />
        <p className={"text-[12px]"}>Transactions</p>
      </div>
      <div
        className={
          "flex flex-col items-center justify-between h-full cursor-pointer"
        }
        onClick={() => router.push("/")}
      >
        <Image
          src={Icons.ShowMore}
          alt={"show more"}
          width={20}
          height={20}
          className={"w-[20px] h-[20px]"}
        />
        <p className={"text-[12px]"}>More</p>
      </div>
    </div>
  );
};

export default Navigation;
