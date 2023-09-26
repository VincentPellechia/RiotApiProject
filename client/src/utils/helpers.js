// Data Formatting: Functions that format data into a specific structure or transform it in some way to meet the application's needs.

// Date and Time Utilities: Functions for working with dates and times, such as formatting dates, calculating time differences, or parsing date strings.

// String Manipulation: Functions for manipulating strings, such as string concatenation, trimming, or searching for substrings.

// Math Calculations: Utility functions for performing common mathematical calculations, like rounding numbers or generating random values.

// Validation: Functions for data validation, input validation, or checking if data meets certain criteria.

// API Requests: Helper functions for making API requests, handling responses, or encapsulating API-related logic.

// Authentication and Authorization: Utility functions related to user authentication and authorization, such as token validation or user role checks.

// Error Handling: Functions for handling errors and exceptions in a consistent way.

// Configuration: Helper functions for managing application configuration or environment variables.

// Logging: Functions for logging information, warnings, or errors.

// Helper functions to convert match duration/date to a readable format
export const formatMatchDuration = (duration) => {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes} minutes ${seconds} seconds`;
};

export const formatMatchDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
};

//Helper functions to format/determine averages
export const formatAverage = (value, decimalPlaces = 1) => {
  const floatValue = parseFloat(value);
  if (isNaN(floatValue)) {
    return ""; // Handle invalid input gracefully
  }
  return floatValue.toFixed(decimalPlaces);
};

export const getAverage = (wins, losses, decimalPlaces = 2) => {
  const parseWin = parseInt(wins);
  const parseLoss = parseInt(losses);
  if (isNaN(parseLoss) || isNaN(parseWin)) {
    return ""; // Handle invalid input gracefully
  }

  const avgValue = (parseWin / (parseWin + parseLoss)) * 100;
  return avgValue.toFixed(decimalPlaces);
};

// Helper function to format game type *more to come
export const formatGameType = (value) => {
  if (value === "CLASSIC") return "Ranked";
  return value;
};

// Helper functions to determine the background color based on win/loss
export const getBackgroundColor = (isWin) =>
  isWin ? "rgb(50,200,50)" : "rgb(200,50,50)";

export const getLightBackgroundColor = (isWin) =>
  isWin ? "rgb(100,255,100)" : "rgb(255,100,100)";
