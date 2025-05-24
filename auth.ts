import NextAuth from 'next-auth';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import client from './lib/mongoClient';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';

const config = {
  adapter: MongoDBAdapter(client),
  providers: [
    Credentials({
      credentials: {
        username: { label: 'Username' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize({ request }) {
        const response = await fetch(request);
        if (!response.ok) return null;
        return (await response.json()) ?? null;
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async session({ session, user, trigger, token }: any) {
      session.user.id = token.sub;
      session.user.role = token.role;
      session.user.username = token.username;
      if (trigger === 'update') {
        session.user.name = user.name;
      }
      return session;
    },
    async jwt({ token, user, trigger, session }: any) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      // if (session?.user.name && trigger === 'update') {
      //   token.name = session.user.name;
      // }

      return token;
    },
  },
};

export const { auth, handlers, signIn, signOut } = NextAuth(config);
