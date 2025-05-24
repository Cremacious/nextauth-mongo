import NextAuth from 'next-auth';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import client from './lib/db';
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
  },
};

export const { auth, handlers, signIn, signOut } = NextAuth(config);
