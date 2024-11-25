// import React from 'react';

// interface User{
//     _id:string;
//     name:string;
//     email:string;
//     photo?:string;
//     hobby?:string;
//     description?:string
// }

// interface UserProps{
//     users:User[];
// }

// const User:React.FC <UserProps> = ({users}) => {
   
//     return (
//         <div>
//             <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
//                 <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">All Users</h2>
//                 {users.length > 0 ? (
//                     <ul className="space-y-4">
//                         {users.map((user) => (
//                             <li key={user._id} className="p-4 border rounded-lg shadow-md hover:bg-gray-100">
//                                 <h3 className="text-lg font-bold text-gray-700">{user.name}</h3>
//                                 <p className="text-gray-600">Email: {user.email}</p>
//                                 {user.photo && <img src={user.photo} alt={user.name} className="mt-4 w-24 h-24 rounded-lg" />}
//                                 {user.description && <p className="text-gray-600 mt-2">Description: {user.description}</p>}
//                                 {user.hobby && <p className="text-gray-600 mt-2">Hobby: {user.hobby}</p>}
//                                 <div className='flex gap-2'>
//                                     <button className='bg-red-500 px-4 py-2 rounded-lg'>delete</button>
//                                     <button className='bg-green-300 px-4 py-2 rounded-lg'>update</button>
//                                 </div>

//                             </li>
//                         ))}
//                     </ul>
//                 ) : (
//                     <p className="text-gray-600 text-center">No users found</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default User;


'use client'
import React, { useState } from "react";
import UpdateUserModal from "../UpdateUserModal/UpdateUserModal";


interface User {
  _id: string;
  name: string;
  email: string;
  photo?: string;
  description?: string;
  hobby?: string;
}

interface UserProps {
  users: User[];
}

const User: React.FC<UserProps> = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleUpdate = (user: User) => {
    setSelectedUser(user); // Set the selected user
  };

  const handleUpdateSubmit = (updatedUser: User) => {
    console.log("Updated User:", updatedUser);
    // Update user logic here (e.g., API call)
  };

  return (
    <div>
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">All Users</h2>
        {users.length > 0 ? (
          <ul className="space-y-4">
            {users.map((user) => (
              <li key={user._id} className="p-4 border rounded-lg shadow-md hover:bg-gray-100">
                <h3 className="text-lg font-bold text-gray-700">{user.name}</h3>
                <p className="text-gray-600">Email: {user.email}</p>
                {user.photo && (
                  <img
                    src={user.photo}
                    alt={user.name}
                    className="mt-4 w-24 h-24 rounded-lg"
                  />
                )}
                {user.description && (
                  <p className="text-gray-600 mt-2">Description: {user.description}</p>
                )}
                {user.hobby && <p className="text-gray-600 mt-2">Hobby: {user.hobby}</p>}
                <div className="flex gap-2">
                  <button className="bg-red-500 px-4 py-2 rounded-lg">delete</button>
                  <button
                    onClick={() => handleUpdate(user)}
                    className="bg-green-300 px-4 py-2 rounded-lg"
                  >
                    update
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-center">No users found</p>
        )}
      </div>

      {/* Show the modal if a user is selected */}
      {selectedUser && (
        <UpdateUserModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onUpdate={handleUpdateSubmit}
        />
      )}
    </div>
  );
};

export default User;
