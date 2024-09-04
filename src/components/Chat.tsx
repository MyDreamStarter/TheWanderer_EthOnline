"use client";
import { useState, useEffect } from "react";
import { useXmtp } from "../context/XmtpContext";
import { Conversation } from "@xmtp/xmtp-js";
import { useAccount } from "wagmi";

const Chat = () => {
  const { address: walletAddress } = useAccount();

  const { xmtp } = useXmtp();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  useEffect(() => {
    if (!xmtp) return;

    const fetchConversations = async () => {
      const convs = await xmtp.conversations.list();
      setConversations(convs);
    };

    fetchConversations();
  }, [xmtp]);

  useEffect(() => {
    if (!selectedConversation) return;

    const fetchMessages = async () => {
      const msgs = await selectedConversation.messages();
      setMessages(msgs.map((msg) => msg.content as string));

      for await (const msg of await selectedConversation.streamMessages()) {
        setMessages((prevMessages) => [...prevMessages, msg.content as string]);
      }
    };

    fetchMessages();
  }, [selectedConversation]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    await selectedConversation.send(newMessage);
    setMessages([...messages, newMessage]);
    setNewMessage("");
  };

  return (
    <>
      {walletAddress ? (
        <div className="flex h-screen bg-gray-100">
          {/* Sidebar */}
          <div className="w-1/3 bg-gray-800 text-white p-4 overflow-y-auto">
            <w3m-button />
            <h2 className="text-2xl font-bold mb-4">Conversations</h2>
            {conversations.map((conv, index) => (
              <div
                key={index}
                className={`p-2 mb-2 cursor-pointer rounded-lg text-sm ${selectedConversation?.peerAddress === conv.peerAddress ? "bg-gray-600" : "bg-gray-700"}`}
                onClick={() => setSelectedConversation(conv)}
              >
                {conv.peerAddress}
              </div>
            ))}
          </div>

          {/* Chat Window */}
          <div className="flex-1 flex flex-col">
            {selectedConversation ? (
              <>
                <div className="flex-1 p-4 overflow-y-auto">
                  {messages.map((msg, index) => (
                    <div key={index} className="bg-blue-500 text-white p-2 rounded-lg max-w-sm mb-2">
                      {msg}
                    </div>
                  ))}
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
                <h2 className="text-2xl text-gray-500">Select a conversation to start chatting</h2>
              </div>
            )}
          </div>
        </div>
      )
        : (
          <w3m-button />
        )}

    </>

  );
};

export default Chat;
