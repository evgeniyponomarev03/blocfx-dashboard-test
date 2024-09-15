import { Roboto } from "next/font/google";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";
import { NextAuthProvider } from "@/providers/next-auth-provider";
import ReduxProvider from "@/redux/reduxProvider";
import "./globals.scss";

const roboto_init = Roboto({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700"],
}) as never;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${(roboto_init as NextFontWithVariable).variable}`}>
        <NextAuthProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
