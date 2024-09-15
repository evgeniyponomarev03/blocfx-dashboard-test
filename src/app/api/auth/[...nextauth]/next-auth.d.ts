import { DefaultUser } from "next-auth";

type UserData = {
  accessToken: string;
  refreshToken: string;
};

declare module "next-auth" {
  interface User extends DefaultUser {
    accessToken: string;
    refreshToken: string;
    user: UserData;
  }

  interface Session {
    accessToken: string;
    refreshToken: string;
    user: any;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    user: any;
    exp: number;
  }
}
