import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

function equalizeLength(num1: number, num2: number) {
  let str1 = num1.toString();
  let str2 = num2.toString();

  if (str1.length > str2.length) {
    str1 = str1.slice(0, str2.length);
  } else if (str2.length > str1.length) {
    str2 = str2.slice(0, str1.length);
  }

  return [parseInt(str1, 10), parseInt(str2, 10)];
}

export const options: NextAuthOptions = {
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email:",
          type: "text",
          placeholder: "Email",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "Your password",
        },
      },
      async authorize(credentials): Promise<any> {
        const { email, password } = credentials || {};

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          }
        );
        const data = await response.json();

        if (data) {
          return {
            accessToken: data.data.tokens.accessToken,
            refreshToken: data.data.tokens.refreshToken,
            user: data.data.user,
          };
        }

        throw new Error("Could not authenticate you.");
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token, account }) {
      if (user) {
        token.accessToken = user?.accessToken;
        token.refreshToken = user?.refreshToken;
        return token;
      }

      const [now, exp] = equalizeLength(Date.now(), token.exp);

      if (now > exp) {
        const { accessToken, refreshToken } = await refreshAccessToken({
          refreshToken: token.refreshToken,
        });
       
        token.accessToken = accessToken;
        token.refreshToken = refreshToken;
        return token;
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;

      return session;
    },
  },
};

async function refreshAccessToken(token: { refreshToken: string }) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.refreshToken}`,
        },
      }
    );
    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      accessToken: refreshedTokens.data.tokens.accessToken,
      refreshToken: refreshedTokens.data.tokens.refreshToken,
    };
  } catch (error) {
    console.error("Refresh access token error:", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
