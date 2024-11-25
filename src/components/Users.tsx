import React from 'react';
import User from './User/User';

interface User {
  _id: string;
  name: string;
  email: string;
  photo?: string;
  description?: string;
  hobby?: string;
}

const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch('http://localhost:3000/api/users', {
    cache: 'no-store', // Ensures fresh data on every request
  });

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  return response.json();
};

const Users = async () => {
  let users: User[] = [];
  try {
    users = await fetchUsers();
  } catch (error) {
    const err = error as Error
    return (
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Error</h2>
        <p className="text-red-500 text-center">Failed to load users.{err.message}</p>
      </div>
    );
  }


  return (
<section>
  <User users={users}/>
</section>
  );
};

export default Users;
