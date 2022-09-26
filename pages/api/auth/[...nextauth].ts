import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {},
        password: {},
      },
      authorize(credentials) {
        if (
          credentials?.username === "jsmith" &&
          credentials?.password === "secret"
        ) {
          return {
            id: 1,
            username: "jsmith",
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    session({ session }) {
      delete session.user?.image;
      delete session.user?.email;
      delete session.user?.name;
      return session;
    },
  },
};

export default NextAuth(authOptions);
