'use client';

import { useState } from 'react';
import { createUser } from '@/lib/actions/mongo.action';

const CreateUserForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    try {
      const user = await createUser({ name, email });
      setMessage(`User created: ${user.name} (${user.email})`);
      setName('');
      setEmail('');
    } catch {
      setMessage('Error creating user.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm">
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border px-2 py-1 rounded w-full"
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border px-2 py-1 rounded w-full"
        />
      </label>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Create User
      </button>
      {message && <div className="mt-2 text-sm">{message}</div>}
    </form>
  );
};

export default CreateUserForm;
