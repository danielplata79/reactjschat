import React, { useEffect, useState } from 'react';
import { firestore } from './firebase';

const UserList = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = await firestore.collection('users').get();
      setUsers(usersCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchUsers();
  }, []);

  return (
    <div>
      {users.map(user => (
        <div key={user.id} onClick={() => onSelectUser(user)}>
          {user.name}
        </div>
      ))}
    </div>
  );
};

export default UserList;
