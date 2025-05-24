'use server';

import connectDB from '../database';
import User from '@/models/User';

export async function createUser(userData: { name: string; email: string }) {
  await connectDB();
  const user = new User(userData);
  await user.save();
  console.log('User created:', user);
  return user;
}
