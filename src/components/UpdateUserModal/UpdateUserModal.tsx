'use client'
import React, { useState } from 'react';

interface UpdateUserModalProps {
    user: {
        _id: string;
        name: string;
        email: string;
        photo?: string;
        hobby?: string;
        description?: string
    },
    onClose: () => void;
    onUpdate: (updatedUser: any) => void
}

const UpdateUserModal: React.FC<UpdateUserModalProps> = ({ user, onClose, onUpdate }) => {
    const [updatedUser, setUpdatedUser] = useState(user);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUpdatedUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        onUpdate(updatedUser);
        onClose();
    };
    return (
        <div>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                    <h2 className="text-lg font-bold mb-4">Update User</h2>
                    <div className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            value={updatedUser.name}
                            onChange={handleChange}
                            placeholder="Name"
                            className="w-full p-2 border rounded-lg"
                        />
                        <input
                            type="email"
                            name="email"
                            value={updatedUser.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="w-full p-2 border rounded-lg"
                        />
                        <input
                            type="text"
                            name="photo"
                            value={updatedUser.photo || ""}
                            onChange={handleChange}
                            placeholder="Photo URL"
                            className="w-full p-2 border rounded-lg"
                        />
                        <textarea
                            name="description"
                            value={updatedUser.description || ""}
                            onChange={handleChange}
                            placeholder="Description"
                            className="w-full p-2 border rounded-lg"
                        />
                        <input
                            type="text"
                            name="hobby"
                            value={updatedUser.hobby || ""}
                            onChange={handleChange}
                            placeholder="Hobby"
                            className="w-full p-2 border rounded-lg"
                        />
                    </div>
                    <div className="flex justify-end mt-4 gap-2">
                        <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg">Cancel</button>
                        <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Update</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateUserModal;