//configuracion de autenticacion

// src/lib/auth.ts
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID! as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET! as string ,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Permitir solo redirecciones a rutas internas
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    async session({ session, token }) {
      // Añadir ID de usuario a la sesión
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};