import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import { RootState } from '../store';
import { RootStackParamList } from '../navigation/AppNavigator';

type UserDetailScreenRouteProp = RouteProp<RootStackParamList, 'UserDetail'>;

interface UserDetailScreenProps {
  route: UserDetailScreenRouteProp;
}

const UserDetailScreen: React.FC<UserDetailScreenProps> = ({ route }) => {
  const { id } = route.params;
  const user = useSelector((state: RootState) =>
    state.users.users.find(u => u.id === id)
  );

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>User not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{user.name}</Text>
        <Text style={styles.subtitle}>@{user.username}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <Text style={styles.text}>Email: {user.email}</Text>
          <Text style={styles.text}>Phone: {user.phone}</Text>
          <Text style={styles.text}>Website: {user.website}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Address</Text>
          <Text style={styles.text}>{user.address.street}, {user.address.suite}</Text>
          <Text style={styles.text}>{user.address.city}, {user.address.zipcode}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Company</Text>
          <Text style={styles.text}>{user.company.name}</Text>
          <Text style={styles.text}>"{user.company.catchPhrase}"</Text>
          <Text style={styles.text}>Business: {user.company.bs}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  card: {
    backgroundColor: 'white',
    margin: 16,
    padding: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 4,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default UserDetailScreen;
