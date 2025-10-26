import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { api } from "@/services/api";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        // Registrar usuario OAuth en tu backend si es nuevo
        await api.post("/auth/oauth-register", {
          email: user.email,
          name: user.name,
          image: user.image,
        });
      } catch (err) {
        console.error("Error registrando usuario OAuth:", err);
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
  },
  session: { strategy: "jwt" },
});

export { handler as GET, handler as POST };
