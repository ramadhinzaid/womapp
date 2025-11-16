import React, {
  useEffect,
  useLayoutEffect,
  useState,
  useCallback,
} from 'react';
import { View, FlatList, StyleSheet, Button, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchUsers } from '../store/usersSlice';
import UserItem from '../components/UserItem';
import LoadingList from '../components/LoadingList';
import ErrorState from '../components/ErrorState';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

type HomePageNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

interface HomePageProps {
  navigation: HomePageNavigationProp;
}

const HomePage: React.FC<HomePageProps> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.users,
  );
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleLogout = useCallback(async () => {
    try {
      await AsyncStorage.removeItem('access_token');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (e) {
      console.error('Failed to remove access token.', e);
    }
  }, [navigation]);

  const headerRight = useCallback(
    () => <Button onPress={handleLogout} title="Logout" color="#f00" />,
    [handleLogout],
  );

  useLayoutEffect(() => {
    navigation.setOptions({ headerRight });
  }, [navigation, headerRight]);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers());
    }
  }, [dispatch, users.length]);

  const handleRetry = () => {
    dispatch(fetchUsers());
  };

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await dispatch(fetchUsers()).unwrap();
    } catch (e) {
      console.error('Failed to refresh users', e);
    } finally {
      setIsRefreshing(false);
    }
  }, [dispatch]);

  const handleUserPress = (id: number) => {
    navigation.navigate('UserDetail', { id });
  };

  if (loading && !isRefreshing) {
    return <LoadingList />;
  }

  if (error && users.length === 0) {
    return <ErrorState message={error} onRetry={handleRetry} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <UserItem user={item} onPress={() => handleUserPress(item.id)} />
        )}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={users.length === 0 && styles.emptyContainer}
        ListEmptyComponent={
          !loading && !error ? (
            <View style={styles.emptyStateContainer}>
              <Text style={styles.emptyStateText}>No users found.</Text>
            </View>
          ) : null
        }
        onRefresh={handleRefresh}
        refreshing={isRefreshing}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 18,
    color: '#888',
  },
});

export default HomePage;
