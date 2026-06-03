import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { type IronManNominee } from '../../types/metrics';

const Leaderboard: React.FC = () => {
  const [nominees, setNominees] = useState<IronManNominee[]>([]);
  const [selectedTermId, setSelectedTermId] = useState<number>(1); // Defaults to Term 1
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        // Consumes the optimized JPQL aggregate endpoint from Module 3
        const response = await API.get<IronManNominee[]>(`/awards/term/${selectedTermId}/iron-man`);
        setNominees(response.data);
      } catch (error) {
        console.error('Error compiling the awards telemetry leaderboard.', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [selectedTermId]);

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      {/* Module Title Section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            🏆 Academy Analytics Scoreboard
          </h1>
          <p className="text-sm text-gray-400">Dynamic tracking for 3-term performance awards metrics</p>
        </div>

        {/* Term Selection Filter */}
        <div className="flex items-center gap-2">
          <label htmlFor="term-select" className="text-sm text-gray-400">Active Evaluation Period:</label>
          <select
            id="term-select"
            value={selectedTermId}
            onChange={(e) => setSelectedTermId(Number(e.target.value))}
            className="bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value={1}>Term 1 (Autumn)</option>
            <option value={2}>Term 2 (Spring)</option>
            <option value={3}>Term 3 (Summer Evaluation)</option>
          </select>
        </div>
      </div>

      {/* Analytics Card: Iron Man Nominations Block */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-xl mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">🛡️</span>
          <div>
            <h2 className="text-lg font-bold">"Iron Man" Award Standings</h2>
            <p className="text-xs text-gray-400">Minimum requirements: $\ge$ 90% Attendance & Peak Punctuality Rating</p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8 text-gray-400">Computing statistics backend-side...</div>
        ) : nominees.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No data points captured yet for this term evaluation loop.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400 font-semibold bg-gray-850">
                  <th className="p-3">Rank</th>
                  <th className="p-3">Player</th>
                  <th className="p-3 text-center">Sessions Logged</th>
                  <th className="p-3 text-center">Punctual Arrivals</th>
                  <th className="p-3 text-right">Attendance Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {nominees.map((player, index) => (
                  <tr key={player.playerProfileId} className="hover:bg-gray-750 transition-colors">
                    <td className="p-3 font-bold text-emerald-400">
                      #{index + 1}
                    </td>
                    <td className="p-3 font-medium">
                      {player.firstName} {player.lastName}
                    </td>
                    <td className="p-3 text-center text-gray-300">
                      {player.sessionsAttended} / {player.totalSessions}
                    </td>
                    <td className="p-3 text-center text-emerald-400/80">
                      ⏱️ {player.punctualityCount}
                    </td>
                    <td className="p-3 text-right font-semibold text-white">
                      {player.attendancePercentage.toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;