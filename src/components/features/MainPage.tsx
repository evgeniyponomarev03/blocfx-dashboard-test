"use client";

import Image from "next/image";
import User from "@/assets/images/user.png";
import Icons from "@/assets/icons";
import TransactionsList from "@/components/features/TransactionsList";
import UserCards from "@/components/features/UserCards";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Navigation from "../widgets/Navigation";
import Card from "../widgets/Card";

export default function MainPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => setIsFullScreen((prev) => !prev);

  return (
    <div className="container-main max-w-[390px] mx-auto min-h-dvh flex flex-col relative">
      <div className="black-part w-full h-[50svh] bg-black rounded-tl-2xl rounded-tr-2xl text-white pt-3 px-2.5 flex-shrink-0">
        <div className="user-info flex justify-between gap-2 px-2 items-center">
          <div className="flex items-center gap-2">
            <div className="w-[52px] h-[52px] flex items-center justify-center border border-[#ffffff20] rounded-full">
              <Image
                src={User}
                alt="user"
                className="w-[36px] h-[36px] rounded-full"
                priority
                unoptimized
              />
            </div>
            <div className="user-name">
              <p className="text-lg">{session?.user.fullName || "User"}</p>
            </div>
          </div>
          <button
            title="sign out"
            onClick={() =>
              signOut().then(() => router.push("https://www.blocfx.eu/"))
            }
            className="p-2 rounded-full border border-grey"
          >
            <Image width={20} height={20} src={Icons.Quit} alt="sign out" />
          </button>
        </div>

        <p className="px-2 font-thin text-[12px]">Quick Actions</p>

        <div className="buttons px-2 py-1 flex items-center gap-3.5">
          <ActionButton
            icon={Icons.Transfer}
            label="Transfer"
            onClick={() => router.push("/transfer")}
          />
          <ActionButton
            icon={Icons.Star}
            label="Transactions"
            onClick={toggleFullScreen}
          />
        </div>

        <UserCards />
        <Card fullScreen={isFullScreen} />
      </div>

      {/* White section */}
      <div
        className={`bg-white w-[350px] rounded-2xl absolute bottom-0 left-0 text-[#26273A] transition-all duration-300 overflow-hidden select-none
    ${
      isFullScreen
        ? "w-[390px] h-[100svh] top-0 rounded-none z-100"
        : "max-h-[calc(50svh-100px)] left-5 "
    }`}
      >
        <div className="w-full flex items-center justify-between py-3 border-b border-[#00000010] px-5">
          <p>Recent transactions</p>
          <button
            className="border border-[#E0E8F299] py-1 px-3 rounded-md"
            onClick={toggleFullScreen}
          >
            {isFullScreen ? "Close" : "View all"}
          </button>
        </div>
        <TransactionsList />
      </div>
      <Navigation toggleFullScreen={toggleFullScreen} />
    </div>
  );
}

function ActionButton({
  icon,
  label,
  onClick,
}: {
  icon: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      className="bg-grey py-2 px-5 rounded-[12px] flex items-center gap-2 font-thin text-[16px]"
      onClick={onClick}
    >
      <Image src={icon} alt="icon" width={12} height={12} />
      {label}
    </button>
  );
}
