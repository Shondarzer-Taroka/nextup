import React from 'react';

interface ToGetallUsers {
    name: string;
    email: string;
    photo?: string;
    description?: string;
    hobby?: string
}

const getUsers = async (): Promise<ToGetallUsers[]> => {
    const res = await fetch('http://localhost:3000/api/users')
    const data = await res.json()
    return data
}

const ToGetallUser = async () => {

    let users: ToGetallUsers[] = []
    try {
        const data = await getUsers()
        users = data
        console.log(19, users);
    } catch (error) {
        console.log(error);

    }


    return (
        <div>
            {
                users.length > 0 && <h1>{users.length}</h1>
            }
        </div>
    );
};

export default ToGetallUser;