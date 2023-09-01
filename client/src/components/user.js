import React, { useEffect, useState } from 'react';
import MatchList from './matchList.js';
import Rank from './rank.js';
import { useParams } from 'react-router-dom';
import * as userService from '../services/user.js';

const UserPage = () => {
  const { region, userName } = useParams();

  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [matches, setMatches] = useState([]);
  const [matchInfoList, setMatchInfoList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch matches manually
  const fetchMatchesManually = async () => {
    try {
      setLoading(true);
      if (user && user.puuid) {
        const matchesData = await userService.fetchUserMatches(region, user.puuid);
        setMatches(matchesData.message);
      }
    } catch (error) {
      console.error('Error fetching matches:', error);
    } finally {
      setLoading(false);
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

      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [region, userName]);

  useEffect(() => {
    const fetchMatchInfo = async () => {
      try {
        setLoading(true);
        if (matches.length > 0) {
          const matchInfoData = await userService.fetchMatchInfo(region, matches);
          setMatchInfoList(matchInfoData);
        }
      } catch (error) {
        console.error('Error fetching match info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchInfo();
  }, [matches, region]);

  // useEffect(()=> {
  //   console.log(matchInfoList);
  // }, [matchInfoList]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <button onClick={fetchMatchesManually}>Fetch Matches</button>
          {user && <Rank summonerId={user.id} region={region} />}
          {matchInfoList && <MatchList userId={userId} matches={matchInfoList} loading={loading} />}
        </div>
      )}
    </div>
  );
};

export default UserPage;