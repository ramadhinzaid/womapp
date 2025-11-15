import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchUsers } from '../store/usersSlice';
import UserItem from '../components/UserItem';
import LoadingList from '../components/LoadingList';
import ErrorState from '../components/ErrorState';

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.users,
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleRetry = () => {
    dispatch(fetchUsers());
  };

  if (loading) {
    return <LoadingList />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={handleRetry} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={({ item }) => <UserItem user={item} />}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomePage;
