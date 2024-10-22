import React, { useEffect, useState } from "react";
import axios from "axios";

const CreateTeam = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [message, setMessage] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("All");
  const [selectedPosition, setSelectedPosition] = useState("All");

  useEffect(() => {
    if (message) {
      alert(message);
      setMessage("");
    }
  }, [message]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(
          "https://fantasy-sports-mu.vercel.app/players"
        );
        setPlayers(response.data);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };
    fetchPlayers();
  }, []);

  const handlePlayerSelect = (player) => {
    if (selectedPlayers.includes(player) || selectedPlayers.length >= 11)
      return;
    setSelectedPlayers([...selectedPlayers, player]);
  };

  const handlePlayerRemove = (player) => {
    setSelectedPlayers(selectedPlayers.filter((p) => p._id !== player._id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://fantasy-sports-mu.vercel.app/team/create",
        {
          teamName,
          playerNames: selectedPlayers.map((player) => player.name),
        }
      );
      setMessage(`Yout Team is Created successfully: }`);
      setTeamName("");
      setSelectedPlayers([]);
    } catch (error) {
      setMessage(
        `Error: ${error.response ? error.response.data.message : error.message}`
      );
    }
  };

  const totalPoints = selectedPlayers.reduce(
    (acc, player) => acc + player.points,
    0
  );

  const uniqueTeams = ["All", ...new Set(players.map((player) => player.team))];
  const uniquePositions = [
    "All",
    ...new Set(players.map((player) => player.position)),
  ];

  const filteredPlayers = players.filter(
    (player) =>
      (selectedTeam === "All" || player.team === selectedTeam) &&
      (selectedPosition === "All" || player.position === selectedPosition)
  );

  return (
    <div className="container mx-auto p-4 md:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
        Create a New Team
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row justify-center items-center mb-4">
          <label className="block mb-2 md:mr-4 text-lg text-gray-700">
            Team Name:
          </label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
            className="border border-gray-300 rounded-md p-2 w-full md:w-1/3"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-2">Your Team:</h3>
            <ul className="space-y-2 p-4 text-gray-500 w-full md:w-[360px] h-[550px] border-gray-700 bg-amber-50 border rounded-3xl overflow-y-auto">
              {selectedPlayers.map((player) => (
                <li
                  key={player._id}
                  className="flex justify-between items-center border border-black p-2 rounded"
                >
                  <div className="text-xs">
                    <div>
                      <strong>{player.name}</strong>
                    </div>
                    <div>{player.points} Pts</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handlePlayerRemove(player)}
                    className="bg-red-900 text-white text-xs p-1 rounded-full"
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-2 font-semibold">
              Total Points: {totalPoints}
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 mt-4 rounded w-full md:w-auto"
              disabled={selectedPlayers.length === 0}
            >
              Create Team
            </button>
            {message && (
              <p className="mt-4 text-green-500 text-center">{message}</p>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 flex justify-center">
              Available Players:
            </h3>

            <div className="flex space-x-4 mb-4">
              <div className="w-1/2">
                <label className="block mb-1 font-semibold text-gray-700">
                  Team:
                </label>
                <select
                  value={selectedTeam}
                  onChange={(e) => setSelectedTeam(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
                >
                  {uniqueTeams.map((team) => (
                    <option key={team} value={team}>
                      {team}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-1/2">
                <label className="block mb-1 font-semibold text-gray-700">
                  Position:
                </label>
                <select
                  value={selectedPosition}
                  onChange={(e) => setSelectedPosition(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
                >
                  {uniquePositions.map((position) => (
                    <option key={position} value={position}>
                      {position}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <ul className="space-y-2 h-[450px] overflow-y-auto">
              {filteredPlayers.map((player) => (
                <li
                  key={player._id}
                  className="flex justify-between items-center border p-2 rounded"
                >
                  <div>
                    <strong>{player.name}</strong> (Points: {player.points})
                  </div>
                  <button
                    type="button"
                    onClick={() => handlePlayerSelect(player)}
                    className={`text-gray-700 text-sm py-1 px-3 rounded ${
                      selectedPlayers.includes(player)
                        ? "bg-gray-300"
                        : "bg-green-300"
                    }`}
                    disabled={
                      selectedPlayers.includes(player) ||
                      selectedPlayers.length >= 11
                    }
                  >
                    {selectedPlayers.includes(player) ? "Selected" : "Select"}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateTeam;
