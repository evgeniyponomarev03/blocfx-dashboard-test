import React from "react";
import Container from "@/components/ui/Container";
import Image from "next/image";
import Logo from "@/assets/images/Logo.svg";

export default function LoadingPage() {
  return (
    <div
      className={
        "w-full h-[100dvh] mx-auto bg-black flex justify-center items-center"
      }
    >
      <Container>
        <Image
          src={Logo}
          alt={"loading"}
          width={500}
          height={500}
          className={"animate-pulse"}
          unoptimized
          priority
        />
      </Container>
    </div>
  );
}
