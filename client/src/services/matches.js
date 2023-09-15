import * as api from "../utils/api";

export const fetchUserMatchesFromAPI = async (region, userId) => {
  try {
    const response = await api.getMatchesFromAPI(region, userId);
    return response;
    // Process and return user data
  } catch (error) {
    console.error("Error fetching user matches:", error);
    throw error;
  }
};

export const fetchMatchesInfoFromAPI = async (region, matches) => {
  try {
    if (matches.length > 0) {
      const matchInfoData = await api.getMatchesInfoFromAPI(region, matches);
      return matchInfoData;
    }
  } catch (error) {
    console.error("Error fetching match info:", error);
    throw error;
  }
};

export const fetchUserMatchesFromDatabase = async (region, userName) => {
  try {
    const response = await api.getMatchesFromDatabase(region, userName);
    return response;
    // Process and return user data
  } catch (error) {
    console.error("Error fetching user matches:", error);
    throw error;
  }
};

export const fetchMatchesInfoFromDatabase = async (region, matches) => {
  try {
    if (matches.length > 0) {
      const matchInfoData = await api.getMatchesInfoFromDatabase(
        region,
        matches
      );

      return matchInfoData;
    }
  } catch (error) {
    console.error("Error fetching match info:", error);
    throw error;
  }
};
