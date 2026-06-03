import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { type PlayerProfileSummary } from '../../types/player';

const PlayerList: React.FC = () => {
  const [players, setPlayers] = useState<PlayerProfileSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [downloadingId, setDownloadingId] = useState<number | null>(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        // Replace with your endpoint targeting player rosters
        const response = await API.get<PlayerProfileSummary[]>('/players');
        setPlayers(response.data);
      } catch (error) {
        console.error('Failed to load roster tracking details.', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlayers();
  }, []);

  const downloadCv = async (playerId: number, playerName: string) => {
    setDownloadingId(playerId);
    try {
      // Fetch binary data array from our OpenPDF Java Spring pipeline
      const response = await API.get(`/players/${playerId}/cv`, {
        responseType: 'blob', 
      });

      // Map the binary blob cleanly into a local virtual browser address download link
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `CV_${playerName.replace(/\s+/g, '_')}.pdf`);
      document.body.appendChild(link);
      link.click();
      
      // Cleanup browser cache pointer records
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert('Could not generate or stream player CV file at this time.');
    } finally {
      setDownloadingId(null);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-white">Loading Academy Roster...</div>;
  }

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Player Profiles</h1>
          <p className="text-sm text-gray-400">Manage roster information, age groups, and scout CVs</p>
        </div>
      </div>

      <div className="overflow-x-auto bg-gray-800 rounded-xl border border-gray-700 shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-700 bg-gray-850 text-gray-400 text-sm font-semibold uppercase">
              <th className="p-4">Name</th>
              <th className="p-4">Position</th>
              <th className="p-4">Squad Categories</th>
              <th className="p-4">Dominant Foot</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700 text-sm">
            {players.map((player) => (
              <tr key={player.id} className="hover:bg-gray-750 transition-colors">
                <td className="p-4 font-medium text-white">
                  {player.firstName} {player.lastName}
                  <span className="block text-xs text-gray-400">#{player.jerseyNumber}</span>
                </td>
                <td className="p-4 text-gray-300">{player.position}</td>
                <td className="p-4">
                  <div className="flex gap-1 flex-wrap">
                    {player.ageGroups.map((g) => (
                      <span key={g.id} className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded text-xs font-semibold">
                        {g.name}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4 text-gray-300">{player.dominantFoot}</td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => downloadCv(player.id, `${player.firstName} ${player.lastName}`)}
                    disabled={downloadingId === player.id}
                    className="px-3 py-1.5 bg-gray-700 hover:bg-emerald-600 rounded-lg text-xs font-medium tracking-wide border border-gray-600 transition-all inline-flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {downloadingId === player.id ? 'Generating...' : '📄 Download CV'}
                  </button>
                </td>
              </tr>
            ))}
            {players.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">No registered players found in this database instance.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlayerList;