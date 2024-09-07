"use client";

import { useState, useEffect } from "react";
import { useXmtp } from "../../context/XmtpContext";
import { Conversation } from "@xmtp/xmtp-js";
import { useAccount } from "wagmi";
import Header from "@/components/ui/header";

// Define a type for Message
interface Message {
  content: string;
  sender: string;
}

const Chat: React.FC = () => {
  const { address: walletAddress } = useAccount();
  const { xmtp } = useXmtp();

  // State variables with types
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [newChatAddress, setNewChatAddress] = useState<string>("");
  const [loadingConversations, setLoadingConversations] = useState<boolean>(true);
  const [loadingMessages, setLoadingMessages] = useState<boolean>(false);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newModalChatAddress, setNewModalChatAddress] = useState<string>("");

  // Fetch conversations when XMTP client is available
  useEffect(() => {
    if (!xmtp) return;

    const fetchConversations = async () => {
      setLoadingConversations(true);
      try {
        const convs = await xmtp.conversations.list();
        setConversations(convs);
      } catch (error) {
        console.error("Failed to fetch conversations:", error);
      } finally {
        setLoadingConversations(false);
      }
    };

    fetchConversations();
  }, [xmtp]);

  // Fetch messages when a conversation is selected
  useEffect(() => {
    if (!selectedConversation) return;

    const fetchMessages = async () => {
      setLoadingMessages(true);
      try {
        const msgs = await selectedConversation.messages();
        setMessages(msgs.map((msg: any) => ({ content: msg.content, sender: msg.senderAddress })));

        for await (const msg of await selectedConversation.streamMessages()) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { content: msg.content, sender: msg.senderAddress },
          ]);
        }
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      } finally {
        setLoadingMessages(false);
      }
    };

    fetchMessages();
  }, [selectedConversation]);

  // Function to send a new message
  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      await selectedConversation.send(newMessage);
      setMessages([...messages, { content: newMessage, sender: walletAddress! }]);
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const startNewChat = async () => {
    if (!newModalChatAddress.trim()) return;

    if (!xmtp) {
      console.error("XMTP client is not initialized");
      return;
    }

    try {
      const conversation = await xmtp.conversations.newConversation(newModalChatAddress.trim());
      setConversations([...conversations, conversation]);
      setSelectedConversation(conversation);
      setNewModalChatAddress("");
      setIsModalOpen(false); // Close modal after adding
    } catch (error) {
      console.error("Failed to start a new chat", error);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };


  return (
    <div>
      <Header />
      {walletAddress ? (
        <div className="flex justify-center items-center h-screen bg-gray-100">
          {/* Left Sidebar */}
          <div className="w-[400px] h-[calc(100%-120px)] bg-gray-800 text-white p-4 rounded-xl m-5 mt-[100px] overflow-y-auto">
            <button
              onClick={toggleModal}
              className="bg-blue-500 w-full text-white p-2 rounded-lg mb-4 flex items-center justify-center"
            >
              + New Chat
            </button>
            <h2 className="text-xl font-bold mb-4">Conversations</h2>
            {loadingConversations ? (
              <p>Loading conversations...</p>
            ) : (
              conversations.map((conv, index) => (
                <div
                  key={index}
                  className={`p-2 mb-2 cursor-pointer rounded-lg text-sm ${
                    selectedConversation?.peerAddress === conv.peerAddress
                      ? "bg-gray-600"
                      : "bg-gray-700"
                  }`}
                  onClick={() => setSelectedConversation(conv)}
                >
                  {conv.peerAddress}
                </div>
              ))
            )}
          </div>

          {/* Right Chat Panel */}
          <div className="w-[1100px] h-[calc(100%-115px)] bg-white flex flex-col rounded-lg shadow-lg mt-[90px]">
            {selectedConversation ? (
              <>
                <div className="flex-1 p-4 overflow-y-auto">
                  {loadingMessages ? (
                    <p>Loading messages...</p>
                  ) : (
                    messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`${
                          msg.sender === walletAddress
                            ? "ml-auto bg-white text-black"
                            : "mr-auto bg-blue-500 text-white"
                        } p-2 rounded-lg max-w-sm mb-2`}
                      >
                        {msg.content}
                      </div>
                    ))
                  )}
                </div>
                <div className="border-t border-gray-300 p-4 flex">
                  <input
                    type="text"
                    className="flex-1 border p-2 rounded-lg"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                  />
                  <button onClick={sendMessage} className="bg-blue-500 text-white p-2 rounded-lg ml-2">
                    Send
                  </button>
                </div>
              </>
            ) : (
              <div className="flex-1 p-4 flex items-center justify-center">
                <h2 className="text-2xl text-gray-500">
                  Select a conversation to start chatting
                </h2>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <h2 className="text-2xl text-gray-500">Connect wallet to start</h2>
        </div>
      )}
      
      {/* Modal for starting new chat */}
      {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                <h2 className="text-xl font-bold mb-4">Start New Chat</h2>
                <input
                  type="text"
                  className="w-full p-2 mb-4 border rounded-lg"
                  value={newModalChatAddress}
                  onChange={(e) => setNewModalChatAddress(e.target.value)}
                  placeholder="Enter wallet address..."
                />
                <div className="flex justify-end">
                  <button
                    onClick={toggleModal}
                    className="bg-gray-300 text-gray-700 p-2 rounded-lg mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={startNewChat}
                    className="bg-blue-500 text-white p-2 rounded-lg"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}
    </div>
  );
};

export default Chat;