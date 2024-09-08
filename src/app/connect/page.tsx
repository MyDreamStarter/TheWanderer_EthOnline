"use client";

import React, { useState } from "react";
import { useAccount, useChainId, useWalletClient } from "wagmi";

// Main Component
const ChatApp: React.FC = () => {
  const [showRegisterPopup, setShowRegisterPopup] = useState(true);
  const chainId = useChainId();
  const { address: walletAddress } = useAccount();
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [interestInput, setInterestInput] = useState("");
  const [friends, setFriends] = useState([
    { id: 1, name: "Soumalya" },
    { id: 2, name: "Sachindra" },
    { id: 3, name: "Suraj" },
  ]);
  const [selectedFriend, setSelectedFriend] = useState<any | null>(null);
  const [message, setMessage] = useState("");

  const handleAddInterest = () => {
    if (interestInput && !interests.includes(interestInput)) {
      setInterests([...interests, interestInput]);
      setInterestInput("");
    }
  };

  const handleSubmitRegistration = () => {
    setShowRegisterPopup(false); // Close popup
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // Send message logic here
      setMessage("");
    }
  };

  return (
    <>
      {showRegisterPopup ? (
        <RegisterPopup
          walletAddress={walletAddress}
          name={name}
          setName={setName}
          gender={gender}
          setGender={setGender}
          interests={interests}
          interestInput={interestInput}
          setInterestInput={setInterestInput}
          handleAddInterest={handleAddInterest}
          handleSubmit={handleSubmitRegistration}
        />
      ) : (
        <ChatUI
          friends={friends}
          selectedFriend={selectedFriend}
          setSelectedFriend={setSelectedFriend}
          message={message}
          setMessage={setMessage}
          handleSendMessage={handleSendMessage}
        />
      )}
    </>
  );
};

// Popup Dialog Component
const RegisterPopup: React.FC<{
  walletAddress: any;
  name: string;
  setName: (name: string) => void;
  gender: string;
  setGender: (gender: string) => void;
  interests: string[];
  interestInput: string;
  setInterestInput: (input: string) => void;
  handleAddInterest: () => void;
  handleSubmit: () => void;
}> = ({
  walletAddress,
  name,
  setName,
  gender,
  setGender,
  interests,
  interestInput,
  setInterestInput,
  handleAddInterest,
  handleSubmit,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Complete Your Profile</h2>
        <div className="mb-4">
          <label className="block font-bold mb-1">Wallet ID</label>
          <input
            type="text"
            value={walletAddress}
            disabled
            className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-1">Gender</label>
          <div className="flex space-x-4">
            <button
              className={`p-2 border rounded ${
                gender === "male" ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => setGender("male")}
            >
              Male
            </button>
            <button
              className={`p-2 border rounded ${
                gender === "female" ? "bg-pink-500 text-white" : ""
              }`}
              onClick={() => setGender("female")}
            >
              Female
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-1">Interests</label>
          <div className="flex">
            <input
              type="text"
              value={interestInput}
              onChange={(e) => setInterestInput(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter interests"
            />
            <button
              className="ml-2 bg-blue-500 text-white p-2 rounded"
              onClick={handleAddInterest}
            >
              Add
            </button>
          </div>
          <div className="mt-2 flex flex-wrap">
            {interests.map((interest, idx) => (
              <span
                key={idx}
                className="bg-gray-200 px-2 py-1 rounded mr-2 mb-2"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
        <button
          className="w-full bg-green-500 text-white p-2 rounded"
          onClick={handleSubmit}
        >
          Start Chat
        </button>
      </div>
    </div>
  );
};

// Main Chat UI Component
const ChatUI: React.FC<{
  friends: { id: number; name: string }[];
  selectedFriend: any;
  setSelectedFriend: (friend: any) => void;
  message: string;
  setMessage: (message: string) => void;
  handleSendMessage: () => void;
}> = ({
  friends,
  selectedFriend,
  setSelectedFriend,
  message,
  setMessage,
  handleSendMessage,
}) => {
  return (
    <div className="flex h-screen">
      {/* Left Side - Friends List */}
      <div className="w-1/4 bg-gray-100 p-4">
        <h2 className="text-lg font-bold mb-2">Friends</h2>
        <ul>
          {friends.map((friend) => (
            <li
              key={friend.id}
              className={`p-2 mb-2 cursor-pointer rounded ${
                selectedFriend && selectedFriend.id === friend.id
                  ? "bg-blue-500 text-white"
                  : "bg-white"
              }`}
              onClick={() => setSelectedFriend(friend)}
            >
              {friend.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Side - Chat Section */}
      <div className="w-3/4 bg-white p-4 flex flex-col">
        <div className="flex-grow">
          {selectedFriend ? (
            <div>
              <h2 className="text-lg font-bold mb-4">
                Chatting with {selectedFriend.name}
              </h2>
              {/* Chat messages can go here */}
            </div>
          ) : (
            <div className="text-center">Select a friend to start chatting</div>
          )}
        </div>

        {/* Bottom Input Box */}
        <div className="mt-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="w-full p-2 border rounded"
          />
          <button
            onClick={handleSendMessage}
            className="mt-2 w-full bg-blue-500 text-white p-2 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
