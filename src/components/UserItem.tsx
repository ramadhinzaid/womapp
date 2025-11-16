import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { User } from '../types';

interface UserItemProps {
  user: User;
  onPress: () => void;
}

const UserItem: React.FC<UserItemProps> = ({ user, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
});

export default UserItem;
