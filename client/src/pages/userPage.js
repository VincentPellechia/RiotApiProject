import React, { useEffect, useState } from "react";
import MatchList from "../components/matchList";
import Rank from "../components/rank";
import Champions from "../components/champions";
import { useParams } from "react-router-dom";
import * as userService from "../services/user.js";
import * as matchesService from "../services/matches.js";
import "../styling/userPage.css";

const UserPage = () => {
  const { region, userName } = useParams();

  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [matches, setMatches] = useState([]);
  const [matchInfoList, setMatchInfoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMatches, setLoadingMatches] = useState(true);

  // Function to fetch matches from the database
  const fetchMatchesManually = async () => {
    try {
      setLoadingMatches(true);
      if (user && user.puuid) {
        const matchesData = await matchesService.fetchUserMatchesFromAPI(
          region,
          user.puuid
        );
        if (matchesData.message.length > 0) {
          await matchesService.fetchMatchesInfoFromAPI(
            region,
            matchesData.message
          );
        }
      }
    } catch (error) {
      console.error("Error fetching matches:", error);
    } finally {
      setLoadingMatches(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch user data using the service
        const userData = await userService.fetchUserData(region, userName);
        setUser(userData.user);
        setUserId(userData.user.puuid);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [region, userName]);

  useEffect(() => {
    // Check if there are matches in the database
    const fetchMatchesFromDatabase = async () => {
      try {
        setLoadingMatches(true);
        const matchesDataFromDatabase =
          await matchesService.fetchUserMatchesFromDatabase(region, user.puuid);
        const matchIdStrings = matchesDataFromDatabase.message.map(
          (item) => item.match_id
        );
        const matchesInfoFromDatabase =
          await matchesService.fetchMatchesInfoFromDatabase(
            region,
            matchesDataFromDatabase.message
          );
        setMatches(matchIdStrings);
        setMatchInfoList(matchesInfoFromDatabase);
        setLoadingMatches(false);
      } catch (error) {
        console.error("Error fetching matches from the database:", error);
      }
    };

    if (user && user.puuid) {
      fetchMatchesFromDatabase(); // Call this directly when user data is available
    }
  }, [region, user]);

  return (
    <div className="user-page">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <React.Fragment>
          <div className="rank-fetch">
            {user && <Rank summonerId={user.id} region={region} />}
            <button className="fetch-matches" onClick={fetchMatchesManually}>
              Update
            </button>
          </div>
          {loadingMatches ? (
            <p>Loading Matches ...</p>
          ) : (
            <div className="user-games-container">
              <div className="champions-container">
                {/* Champions component */}
                <Champions user={user} region={region} />
              </div>
              <div className="match-list-container">
                {/* MatchList component */}
                {matchInfoList && (
                  <MatchList
                    userId={userId}
                    matches={matchInfoList}
                    loading={loading}
                  />
                )}
              </div>
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default UserPage;
