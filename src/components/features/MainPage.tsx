"use client";

import Image from "next/image";
import User from "@/assets/images/user.png";
import Icons from "@/assets/icons";
import TransactionsList from "@/components/features/TransactionsList";
import UserCards from "@/components/features/UserCards";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Navigation from "../widgets/Navigation";

export default function MainPage() {
  const router = useRouter();
  const { data } = useSession();
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div className={"container-main max-w-[390px] mx-auto min-h-dvh relative"}>
      <div
        className={
          "black-part w-full h-[40vh] bg-black rounded-tl-2xl rounded-tr-2xl text-white pt-5 px-2.5"
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

          <div className={"user-name"}>
            <p className={"text-lg"}>{data?.user.fullName}</p>
          </div>
        </div>
        <p className={"px-2 font-thin text-[12px]"}>Quick Actions</p>
        <div className={"buttons px-2 py-1 flex items-center gap-3.5"}>
          <button
            className={
              "bg-grey py-2 px-5 rounded-[12px] flex items-center gap-2 font-thin text-[16px]"
            }
            onClick={() => router.push("/transfer")}
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
              "bg-grey py-2 px-5 rounded-[12px] flex items-center gap-2 font-thin text-[16px]"
            }
            onClick={() => router.push("/transfer")}
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
        className={`bg-white rounded-2xl absolute bottom-0 mx-auto text-[#26273A] transition-all duration-300 overflow-hidden select-none cursor-all-scroll 
        ${
          isFullScreen
            ? "w-full h-[100svh] absolute top-0 left-0 rounded-none"
            : "w-[350px] h-[60svh] left-5"
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
      <Navigation />
    </div>
  );
}
