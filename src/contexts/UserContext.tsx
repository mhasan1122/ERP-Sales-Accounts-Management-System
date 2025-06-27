import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface UserContextType {
  users: User[];
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
  getUserById: (id: string) => User | undefined;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUsers() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
}

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Admin User',
      email: 'admin@erp.com',
      role: 'admin',
      status: 'active',
      createdAt: '2024-01-01T00:00:00.000Z'
    },
    {
      id: '2',
      name: 'John Manager',
      email: 'john.manager@erp.com',
      role: 'manager',
      status: 'active',
      createdAt: '2024-01-15T00:00:00.000Z'
    },
    {
      id: '3',
      name: 'Sarah Sales',
      email: 'sarah.sales@erp.com',
      role: 'sales',
      status: 'active',
      createdAt: '2024-02-01T00:00:00.000Z'
    },
    {
      id: '4',
      name: 'Mike Johnson',
      email: 'mike.johnson@erp.com',
      role: 'sales',
      status: 'inactive',
      createdAt: '2024-01-20T00:00:00.000Z'
    }
  ]);

  const addUser = (userData: Omit<User, 'id' | 'createdAt'>) => {
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setUsers(prev => [...prev, newUser]);
  };

  const updateUser = (id: string, userData: Partial<User>) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, ...userData } : user
    ));
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  const getUserById = (id: string) => {
    return users.find(user => user.id === id);
  };

  const value = {
    users,
    addUser,
    updateUser,
    deleteUser,
    getUserById
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}
