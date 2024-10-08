"use client";

import Container from "@/components/ui/Container";
import Image from "next/image";
import Icons from "@/assets/icons";
import mainImage from "@/assets/images/success.svg";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import Logo from "@/assets/images/logo.png";

export default function SuccessPage() {
  const router = useRouter();
  return (
    <section className="py-8">
      <Container>
        <div className="flex justify-end items-center flex-col">
          <Image
            width={51}
            height={71}
            className="mb-6 self-end w-[51px] h-[71px]"
            src={Logo}
            alt="blocfx"
            unoptimized
            priority
          />
          <Image
            src={mainImage}
            alt={"success-image"}
            width={260}
            height={260}
            unoptimized
            priority
          />
          <h1 className="text-6xl font-bold text-center mt-20">Congrats!</h1>
          <p className="text-center mt-12 opacity-40">
            Your funds will be processed and transferred within 72 hours.
          </p>
          <Button
            className="mt-12 bg-[#26273A] px-12 py-3 rounded-[50px]"
            onClick={() => router.push("/")}
          >
            Great!
          </Button>
        </div>
      </Container>
    </section>
  );
}
