import * as api from './api';

export const fetchUserData = async (region, userName) => {
  const response = await api.getUser(region, userName);
  // Process and return user data
};