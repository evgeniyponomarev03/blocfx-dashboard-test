import { Metadata } from "next";
import Login from "@/components/features/LoginPage";

export const metadata: Metadata = {
  title: "LOGIN",
};

export default function LoginPage() {
  return (
    <>
      <main>
        <Login />
      </main>
    </>
  );
}
