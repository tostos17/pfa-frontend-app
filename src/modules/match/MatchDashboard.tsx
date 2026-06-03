import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { type MatchFixture, type GoldenBootNominee } from '../../types/match';

const MatchDashboard: React.FC = () => {
  const [fixtures, setFixtures] = useState<MatchFixture[]>([]);
  const [topScorers, setTopScorers] = useState<GoldenBootNominee[]>([]);
  const [activeTermId] = useState<number>(1); // Evaluates active term
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMatchData = async () => {
      setLoading(true);
      try {
        // Parallel API calls to fetch fixtures and top scorers
        const [fixturesRes, scorersRes] = await Promise.all([
          API.get<MatchFixture[]>(`/fixtures/term/${activeTermId}`),
          API.get<GoldenBootNominee[]>(`/match-analytics/term/${activeTermId}/golden-boot`)
        ]);
        
        setFixtures(fixturesRes.data);
        setTopScorers(scorersRes.data);
      } catch (error) {
        console.error('Failed to load pitch performance statistics.', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchData();
  }, [activeTermId]);

  if (loading) {
    return <div className="p-8 text-center text-white">Loading Matchday Metrics...</div>;
  }

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Left Column: Match Fixtures & Results Timeline */}
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Matchday Center</h1>
          <p className="text-sm text-gray-400">Schedule timelines and full competitive summaries</p>
        </div>

        <div className="space-y-4">
          {fixtures.map((match) => (
            <div key={match.id} className="bg-gray-800 border border-gray-700 rounded-xl p-5 shadow-md flex items-center justify-between">
              <div>
                <span className={`px-2 py-0.5 text-xs font-semibold rounded ${
                  match.venue === 'Home' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                }`}>
                  {match.venue}
                </span>
                <h3 className="text-lg font-bold mt-2">vs {match.opponentName}</h3>
                <p className="text-xs text-gray-400">{new Date(match.matchDate).toLocaleDateString()}</p>
              </div>

              {/* Dynamic Score display based on Match Status */}
              <div className="text-right">
                {match.status === 'PLAYED' ? (
                  <div className="flex items-center gap-3 text-xl font-extrabold bg-gray-900 px-4 py-2 rounded-lg border border-gray-700">
                    <span className="text-emerald-400">{match.academyScore}</span>
                    <span className="text-gray-500">:</span>
                    <span className="text-gray-300">{match.opponentScore}</span>
                  </div>
                ) : (
                  <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 rounded-full">
                    {match.status}
                  </span>
                )}
              </div>
            </div>
          ))}

          {fixtures.length === 0 && (
            <div className="text-center py-12 text-gray-500 bg-gray-800 rounded-xl border border-gray-700">
              No fixtures logged for this term loop yet.
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Live Golden Boot Chart */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 shadow-xl h-fit">
        <div className="flex items-center gap-2 mb-4 border-b border-gray-700 pb-3">
          <span className="text-2xl">🔥</span>
          <div>
            <h2 className="text-lg font-bold">Golden Boot Standings</h2>
            <p className="text-xs text-gray-400">Top contributors in active term competitions</p>
          </div>
        </div>

        <div className="space-y-3">
          {topScorers.map((player, idx) => (
            <div key={player.playerProfileId} className="flex items-center justify-between p-3 bg-gray-900 rounded-lg border border-gray-750">
              <div className="flex items-center gap-3">
                <span className="font-bold text-sm text-gray-500">#{idx + 1}</span>
                <div>
                  <h4 className="text-sm font-semibold">{player.firstName} {player.lastName}</h4>
                  <p className="text-xs text-gray-400">Rating: ⭐ {player.averageCoachRating.toFixed(1)}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-emerald-400">{player.totalGoals} G</span>
                <span className="block text-xs text-gray-400">{player.totalAssists} A</span>
              </div>
            </div>
          ))}

          {topScorers.length === 0 && (
            <div className="text-center py-8 text-gray-500 text-sm">
              No match statistics found.
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default MatchDashboard;