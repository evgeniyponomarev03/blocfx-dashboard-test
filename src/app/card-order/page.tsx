import { Metadata } from "next";
import OrderCardPage from "@/components/features/OrderCardPage";

export const metadata: Metadata = {
  title: "ORDER CARD",
};

export default function OrderCard() {
  return (
    <>
      <main>
        <OrderCardPage />
      </main>
    </>
  );
}
