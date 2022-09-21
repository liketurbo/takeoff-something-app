import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/signin",
  },
  providers: [],
  callbacks: {
    session({ session }) {
      delete session.user?.image;
      return session;
    },
    signIn() {
      return true;
    },
  },
};

export default NextAuth(authOptions);
