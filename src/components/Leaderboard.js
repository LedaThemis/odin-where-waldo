import { useState, useEffect } from 'react';

import '../styles/Leaderboard.css';
import { getHumanReadableTime } from '../helpers/utils';
import { fetchLeaderboard } from '../helpers/db';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    (async () => {
      const fetchedLeaderboard = await fetchLeaderboard();

      setLeaderboardData(fetchedLeaderboard);
    })();
  }, []);

  return (
    <div id="leaderboard--container">
      <p id="leaderboard--title">Leaderboard</p>
      <table id="leaderboard">
        <thead>
          <tr>
            <th>Name</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map(({ id, name, seconds }) => {
            return (
              <tr key={`${id}-row`}>
                <td key={`${id}-name`}>{name}</td>
                <td key={`${id}-time`}>{getHumanReadableTime(seconds)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
