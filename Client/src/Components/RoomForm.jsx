import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const RoomForm = () => {
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const generateRoomId = () => {
    const newRoomId = uuidv4();
    setRoomId(newRoomId);
  };

  const joinRoom = () => {
    if (!roomId.trim() || !name.trim()) {
      alert("Please enter a Room ID and Name");
      return;
    }
    navigate(`/room/${roomId}`, { state: { name } });
  };

  return (
    <div className="flex flex-col rounded-b-md  p-6 space-y-4  shadow-lg w-[100%] mx-auto justify-center bg-white items-center">
      <h2 className="text-xl font-bold">Join a Room</h2>
      <input
        type="text"
        placeholder="Enter Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        className="w-full p-2 border rounded text-lg"
      />
      <button onClick={generateRoomId} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 text-xl">
        Generate Room ID
      </button>
      <input
        type="text"
        placeholder="Enter Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border rounded text-lg"
      />
      <button onClick={joinRoom} className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 text-xl">
        Join Room
      </button>
    </div>
  );
};

export default RoomForm;