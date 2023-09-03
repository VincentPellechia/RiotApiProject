import * as api from './api';

export const fetchUserData = async (region, userName) => {
  try {
    const response = await api.getUser(region, userName);
    return response;
    // Process and return user data
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const fetchUserMatches = async (region, userId) => {
  try {
    const response = await api.getMatches(region, userId);
    return response;
    // Process and return user data
  } catch (error) {
    console.error('Error fetching user matches:', error);
    throw error;
  }
};

export const fetchMatchInfo = async (region, matches) => {
  try {
    if (matches.length > 0) {
      const matchInfoData = await Promise.all(
        matches.map(async (match) => {
          const matchInfo = await api.getMatchInfo(region, match);
          return matchInfo;
        })
      );

      return matchInfoData;
    }
  } catch (error) {
    console.error('Error fetching match info:', error);
    throw error;
  }
};

export const fetchRank = async (region, userId) => {
    try {
      const response = await api.fetchRank(region, userId);
      return response;
      // Process and return user data
    } catch (error) {
      console.error('Error fetching user matches:', error);
      throw error;
    }
  };
