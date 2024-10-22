import React, { useState } from "react";
import axios from "axios";

export default function Teams() {
  const [teamName, setTeamName] = useState("");
  const [detail, setDetail] = useState(null);
  const [error, setError] = useState("");

  
  const sampleTeams = [
    "Dream Team",
    "Galactic Warriors",
    "Phoenix Rising",
    "Stellar United",
    "Champions League",
  ];

  const handleChange = (event) => {
    setTeamName(event.target.value);
    setError("");
  };

  const handleSubmit = async () => {
    if (!teamName) {
      setError("Team name is required!");
      return;
    }

    const url = `https://fantasy-sports-mu.vercel.app/team/${teamName}`;

    try {
      const response = await axios.get(url);
      console.log("Response Data:", response.data);
      setDetail(response.data);
      setTeamName("");
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch team details.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-lg w-full p-8 bg-white rounded-lg shadow-lg">
  
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Search Team</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Enter Team Name</label>
          <input
            type="text"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={teamName}
            onChange={handleChange}
            placeholder="Enter team name"
          />
        </div>

       
        <button
          onClick={handleSubmit}
          className="w-full bg-green-400 text-white py-3 rounded-lg font-semibold hover:bg-white hover:border hover:text-black hover:border-green-600 transition"
        >
          Search
        </button>

       
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

       
        {detail ? (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 text-center">{detail.name}</h3>
            <h4 className="text-xl font-semibold text-gray-700 mt-4 text-center">Players:</h4>
            <ul className="mt-2 space-y-2">
              {detail.players.map((player) => (
                <li
                  key={player._id}
                  className="flex justify-between items-center p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition"
                >
                  <span className="font-medium text-gray-900">{player.name}</span>
                  <span className="text-gray-600">{player.points} points</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 text-center">No team details found. Here are some sample teams you can try:</h3>
            <ul className="list-disc list-inside mt-2">
              {sampleTeams.map((team, index) => (
                <li key={index} className="text-center text-gray-600">{team}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
