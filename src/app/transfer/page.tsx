import { Metadata } from "next";
import TransferPage from "@/components/features/TransferPage";

export const metadata: Metadata = {
  title: "TRANSFER",
};

export default function Transfer() {
  return (
    <>
      <main>
        <TransferPage />
      </main>
    </>
  );
}
