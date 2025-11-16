import axios from 'axios';
import { User } from '../types';

// import { API_BASE_URL } from 'react-native-dotenv';

const USERS_URL = `https://jsonplaceholder.typicode.com/users`;

export const fetchUsersAPI = async (): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>(USERS_URL);
    if (response.status === 200) {
      return response.data;
    } else if (response.status !== 200 && response.data) {
      throw response.data;
    } else {
      throw 'unknown error';
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
