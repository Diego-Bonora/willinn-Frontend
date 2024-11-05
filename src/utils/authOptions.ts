import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await fetch(
            "https://uat.zonamerica.com:5009/users/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
            }
          );

          const data = await response.json();

          if (response.ok && data) {
            return {
              id: data.id || data.token, // Next-Auth requires an id field
              name: data.name,
              email: credentials?.email,
              accessToken: data.token,
            };
          }

          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Attach accessToken to the session
      session.accessToken = token.accessToken as string;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login", // Custom login page path
  },
};
