import React, { useEffect, useState } from 'react';
import MatchList from './matchList.js';
import Rank from './rank.js';
import { useParams } from 'react-router-dom';
import * as userService from '../services/user';

const UserPage = () => {
  const { region, userName } = useParams();

  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [matches, setMatches] = useState([]);
  const [matchInfoList, setMatchInfoList] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingMatches, setLoadingMatches] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoadingUser(true);
        const response = await fetch(`http://localhost:8000/getUser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ region, userName }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }

        const data = await response.json();
        setUser(data.user);
        setUserId(data.user.puuid);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoadingUser(false);
      }
    };

    const fetchMatches = async () => {
      try {
        setLoadingMatches(true);
        if (userId) {
          const matchesResponse = await fetch(`http://localhost:8000/getMatches`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ region, userId }),
          });

          if (!matchesResponse.ok) {
            throw new Error('Failed to fetch user matches');
          }

          const matchesData = await matchesResponse.json();
          setMatches(matchesData.message);
        }
      } catch (error) {
        console.error('Error fetching matches:', error);
      } finally {
        setLoadingMatches(false);
      }
    };

    //fetchUser();
    //fetchMatches();
  }, [region, userName, userId]);

  useEffect(() => {
    const fetchMatchInfo = async () => {
      try {
        setLoadingMatches(true);
        if (matches.length > 0) {
          const matchInfoData = await Promise.all(
            matches.map(async (match) => {
              const matchResponse = await fetch(`http://localhost:8000/getMatchInfo`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ region, match }),
              });

              if (!matchResponse.ok) {
                throw new Error(`Failed to fetch match info for matchId: ${match}`);
              }

              const matchInfo = await matchResponse.json();
              return matchInfo.message;
            })
          );

          setMatchInfoList(matchInfoData);
        }
      } catch (error) {
        console.error('Error fetching match info:', error);
      } finally {
        setLoadingMatches(false);
      }
    };

    fetchMatchInfo();
  }, [matches, region]);

  /*useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user]);*/

  return (
    <div>
      {loadingUser || loadingMatches ? (
        <p>Loading...</p>
      ) : (
        <div>
          {user && <Rank summonerId={user.id} region={region} />}
          <MatchList userId={userId} matches={matchInfoList} loading={loadingMatches} />
        </div>
      )}
    </div>
  );
};

export default UserPage;



/* In case chat gpt goes down this way a recommended way to build userPage

import React, { useEffect, useState } from 'react';
import MatchList from './MatchList';
import Rank from './Rank';
import { useParams } from 'react-router-dom';
import * as userService from '../services/user';

const UserPage = () => {
  const { region, userName } = useParams();

  const [user, setUser] = useState(null);
  const [matches, setMatches] = useState([]);
  const [matchInfoList, setMatchInfoList] = useState([]);
  const [loading, setLoading] = useState(true);

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

        const userData = await userService.fetchUserData(region, userName);
        setUser(userData.user);

        if (userData.user.puuid) {
          const matchesData = await userService.fetchUserMatches(region, userData.user.puuid);
          setMatches(matchesData.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [region, userName]);

  useEffect(() => {
    // Similar logic for fetching match info
  }, [matches, region]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <button onClick={fetchMatchesManually}>Fetch Matches</button>
          {user && <Rank summonerId={user.id} region={region} />}
          <MatchList userId={user?.puuid} matches={matchInfoList} loading={loading} />
        </div>
      )}
    </div>
  );
};

export default UserPage;

*/