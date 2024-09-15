import { Metadata } from "next";
import MainPage from "@/components/features/MainPage";

export const metadata: Metadata = {
  title: "BLOCFX DASHBOARD",
  robots: {
    index: false,
  },
};

export default function HomePage() {
  return (
    <>
      <MainPage />
    </>
  );
}
