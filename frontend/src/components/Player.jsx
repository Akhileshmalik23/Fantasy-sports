import React, { useState, useEffect } from "react";
import axios from "axios";

export default function PlayerTable() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/players");
        setPlayers(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to load players");
        setLoading(false);
      }
    };
    fetchPlayers();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-xl text-gray-700">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 text-xl">{error}</div>
    );
  }

  return (
    <div className=" p-4">
      <div className="h-[93vh] overflow-auto bg-gradient-to-r from-red-100 to-red-200 text-black rounded-lg shadow-lg p-4">

        <h2 className="text-2xl font-bold text-center mb-4">Player List</h2>
        <table className="min-w-full text-sm text-left border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border-b border-gray-400">Name</th>
              <th className="p-2 border-b border-gray-400">Position</th>
              <th className="p-2 border-b border-gray-400">Batting Style</th>
              <th className="p-2 border-b border-gray-400">Bowling Style</th>
              <th className="p-2 border-b border-gray-400">Points</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player._id} className="border-b border-gray-300 hover:bg-gray-100 transition">
                <td className="p-2 flex items-center space-x-2">
                  <div>
                    <p className="font-semibold">{player.name}</p>
                    <p className="text-xs text-gray-500">{player.team}</p>
                  </div>
                </td>
                <td className="p-2">{player.position}</td>
                <td className="p-2">{player.battingStyle}</td>
                <td className="p-2">{player.bowlingStyle || 'N/A'}</td>
                <td className="p-2">{player.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
