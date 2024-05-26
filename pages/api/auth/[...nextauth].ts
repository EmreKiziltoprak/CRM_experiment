import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"; 

export const authOptions: NextAuthOptions = {
  providers: [
    
  ],
  callbacks: {
    async session({ session, token }) {
      // token.sub => next-auth tarafından sağlanan benzersiz kullanıcı ID'si
      if (session.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
  },
  secret: "env.NEXTAUTH_SECRET",
};

export default NextAuth(authOptions);
