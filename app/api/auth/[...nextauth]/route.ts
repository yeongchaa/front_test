import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

interface UserWithToken {
  id: string;
  email: string;
  token: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "input email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        if (!credentials) {
          return null;
        }

        try {
          const res = await axios.post(
            "http://api4adc.cafe24app.com/api/auth/login",
            {
              email: credentials.email,
              password: credentials.password,
            }
          );

          if (res.data.token) {
            const user: UserWithToken = {
              id: res.data.user.id,
              email: res.data.user.email,
              token: res.data.token,
            };
            return user;
          } else {
            return null;
          }
        } catch (error: any) {
          if (axios.isAxiosError(error) && error.response) {
            // 반환 메세지 전달
            throw new Error(
              error.response.data.message ||
                "아이디 혹은 비밀번호가 잘못되었습니다."
            );
          } else {
            throw new Error("Internal server error");
          }
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const userWithToken = user as UserWithToken;
        token.id = userWithToken.id;
        token.email = userWithToken.email;
        token.accessToken = userWithToken.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
