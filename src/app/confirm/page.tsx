"use client";
import { useLayoutEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Container from "@/components/ui/Container";
import Loading from "@/components/widgets/Loading";

export default function Confirm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const code = searchParams.get("code");

  useLayoutEffect(() => {
    document.title = "Autorization...";
    (async () => {
      try {
        await signIn("credentials", {
          code,
          redirect: false,
        });
        router.push("/");
      } catch {
        alert("Failed to authorize.");
      }
    })();
  }, []);

  return (
    <div className="w-full h-[100dvh] mx-auto bg-black flex justify-center items-center">
      <Container>
        <Loading />
      </Container>
    </div>
  );
}
