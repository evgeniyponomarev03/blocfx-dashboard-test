import { useRouter } from "next/navigation";

export const useGoHome = (): (() => void) => {
  const router = useRouter();
  return () => {
    router.push("/");
  };
};

export const useGoTransfer = (): (() => void) => {
  const router = useRouter();
  return () => {
    router.push("/transfer");
  };
};
