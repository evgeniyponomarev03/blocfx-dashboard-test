"use client";

import React, { useState } from "react";
import Image from "next/image";
import User from "@/assets/images/user.png";
import Icons from "@/assets/icons";
import { useGoHome, useGoTransfer } from "@/utils/navigation";
import TransactionsList from "@/components/features/TransactionsList";
import UserCards from "@/components/features/UserCards";
import { useSession } from "next-auth/react";

export default function MainPage() {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const goToTransfer = useGoTransfer();
  const goHome = useGoHome();

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  // TODO: use the user data from the session to display the user name and avatar

  const { data } = useSession();
  console.log(data?.user);

  return (
    <div className={"container-main max-w-[390px] mx-auto min-h-dvh relative"}>
      <div
        className={
          "black-part w-full h-[40vh] bg-black rounded-tl-2xl rounded-tr-2xl text-white pt-10 px-2.5"
        }
      >
        <div className={"user-info flex gap-2 px-2 items-center"}>
          <div
            className={
              "w-[52px] h-[52px] flex items-center justify-center border-[1px] border-[#ffffff20] rounded-full"
            }
          >
            <Image
              src={User}
              className={"user-avatar w-[36px] h-[36px] rounded-full"}
              alt={"user"}
              priority
            />
          </div>

          {/*TODO: use the user data from the session to display the user name*/}

          <div className={"user-name"}>
            <p className={"text-lg"}>User 1</p>
          </div>
        </div>
        <p className={"px-2 font-thin text-[12px]"}>Quick Actions</p>
        <div className={"buttons px-2 py-1 flex items-center gap-3.5"}>
          <button
            className={
              "bg-grey py-3 px-5 rounded-[12px] flex items-center gap-2 font-thin text-[16px]"
            }
            onClick={goToTransfer}
          >
            <Image
              src={Icons.Transfer}
              alt={"icon"}
              width={12}
              height={12}
              className={"text-white w-[12px] h-[12px]"}
            />
            Transfer
          </button>
          <button
            className={
              "bg-grey py-3 px-5 rounded-[12px] flex items-center gap-2 font-thin text-[16px]"
            }
            onClick={toggleFullScreen}
          >
            <Image
              src={Icons.Star}
              alt={"icon"}
              width={12}
              height={12}
              className={"w-[12px] h-[12px]"}
            />
            Transactions
          </button>
        </div>
        <UserCards />
      </div>

      <div
        className={`content bg-white rounded-2xl mx-auto text-[#26273A] transition-all duration-300 overflow-hidden select-none cursor-all-scroll
        ${
          isFullScreen
            ? "w-full h-[100dvh] absolute top-0 mt-0 rounded-none"
            : "w-[350px] h-[64dvh] mt-[-40px]"
        }`}
      >
        <div
          className={
            "w-full flex items-center justify-between py-[18px] border-b-[1px] border-[#00000010] px-5"
          }
        >
          <p>Recent transations</p>
          <button
            className={"border-[1px] border-[#E0E8F299] py-1 px-3 rounded-md"}
            onClick={toggleFullScreen}
          >
            {isFullScreen ? "Close" : "View all"}
          </button>
        </div>

        <TransactionsList />
      </div>

      <div
        className={
          "w-full h-[10dvh] bg-white rounded-bl-2xl rounded-br-2xl py-5 px-8 absolute bottom-0 opacity-95 flex items-center gap-8 backdrop-blur-[2.5px]"
        }
      >
        <div
          className={
            "flex flex-col items-center justify-between h-full cursor-pointer"
          }
          onClick={goHome}
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
          onClick={goHome}
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
    </div>
  );
}
