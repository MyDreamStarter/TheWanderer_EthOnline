"use client";
import { useState, useEffect, ReactNode } from "react";
import Image from "next/image";
import { useAccount, useChainId, useWalletClient } from "wagmi";
import { Hex, createPublicClient, http } from "viem";
import { base, baseSepolia, polygonAmoy,sepolia } from "viem/chains";
import { toast, ToastContainer } from "react-toastify";
import Simplestore from "@/lib/Simplestore.json";
import Header from "@/components/ui/header";
import ethers from "ethers";
import { Hash } from "crypto";
import "react-toastify/dist/ReactToastify.css";

import ApeProfile from "../../../../public/assets/ape_profile.png";
import Trees from "../../../../public/assets/trees.png.webp";

interface Community {
  fundingGoal: number;
  id: number;
  title: string;
  twitter: string;
  description: string;
  image: string;
  price: number;
}

interface CommunityInput {
  title: string;
  twitter: string;
  description: string;
  price: number;
  fundingGoal: number;
}

export default function DashboardPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [communityInput, setCommunityInput] = useState<CommunityInput>({
    title: "",
    twitter: "",
    description: "",
    price: 0,
    fundingGoal: 0,
  });
  const [communities, setCommunities] = useState<Community[]>([]);
  const { address: walletAddress } = useAccount();
  const chainId = useChainId();
  const { data: walletClient } = useWalletClient({ chainId });
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(),
  });

  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
  const [countdown, setCountdown] = useState<number>(0);

  const [showChatbutton, setShowChatButton] = useState(false);

  // JOIN NOW SELECTED COMMUNITY STATES
  const [selectedCommunity, setSelectedCommunity] = useState({
    title: "Sample Community",
    twitter: "creator_twitter",
    description: "This is a sample description of the community.",
    price: 50,
    fundingGoal: 1000,
  });

  const formatCountdown = (seconds: number) => {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${days}d ${hours}h ${minutes}m ${secs}s`;
  };

  const handleJoinClick = (community: Community) => {
    setSelectedCommunity(community);
    setIsJoinDialogOpen(true);
  };  

  const handleCloseDialog = () => {
    setIsJoinDialogOpen(false);
  };

  useEffect(() => {
    if (isJoinDialogOpen && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isJoinDialogOpen, countdown]);

  const handleMindClick = () => {
    console.log("Mind button clicked");
  };

  const handleSupportClick = () => {
    console.log("Provide Support button clicked");
  };

  useEffect(() => {
    const savedCommunities = JSON.parse(localStorage.getItem("communities") || "[]");
    setCommunities(savedCommunities);
  }, []);

  async function getContractAddressFromTxHash(
    txHash: string | Promise<string>,
    providerUrl: string | ethers.ethers.utils.ConnectionInfo | undefined
  ) {
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);

    try {
      const txReceipt = await provider.getTransactionReceipt(txHash);

      if (txReceipt && txReceipt.contractAddress) {
        console.log(`Contract address: ${txReceipt.contractAddress}`);
        return txReceipt.contractAddress;
      } else {
        console.log(
          "No contract address found. This transaction may not have created a contract."
        );
        return null;
      }
    } catch (error) {
      console.error("Error fetching transaction receipt:", error);
      return null;
    }
  }

  const deployContract = async () => {
    console.log("Deploying contract called");
    if (!walletClient) {
      throw new Error("Wallet client not available");
    }

    try {
      const hash = await walletClient?.deployContract({
        abi: Simplestore.abi,
        bytecode: Simplestore.bytecode as Hex,
        account: walletAddress,
      });

      if (!hash) {
        throw new Error("Failed to execute deploy contract transaction");
      }

      console.log("Transaction Hash:", hash);
      console.log("Wallet Address:", walletAddress);
      console.log("Wallet Client:", walletClient);

      const newCommunity: Community = {
        id: communities.length + 1,
        ...communityInput,
        image: "/default.jpg",
      };

      const updatedCommunities = [...communities, newCommunity];
      setCommunities(updatedCommunities);
      localStorage.setItem("communities", JSON.stringify(updatedCommunities));
      console.log("Contract deployed successfully!");

      setIsDialogOpen(false);

      toast.success("Contract deployed successfully!", {
        position: "top-right",
      });

      const txn = await publicClient.waitForTransactionReceipt({ hash });
      console.log(txn)
      console.log(txn.contractAddress)

      if (txn) {
        const newCommunity: Community = {
          id: communities.length + 1,
          ...communityInput,
          image: "/default.jpg",
        };

        const updatedCommunities = [...communities, newCommunity];
        setCommunities(updatedCommunities);
        localStorage.setItem("communities", JSON.stringify(updatedCommunities));
        console.log("Contract deployed successfully!");

        setIsDialogOpen(false);

        toast.success("Contract deployed successfully!", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Deployment error:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value } = e.target;
    setCommunityInput((prevInput) => ({ ...prevInput, [id]: value }));
  };

  return (
    <div>
      <Header />
      <div className="p-20 bg-gray-100 min-h-screen">
        <header className="flex justify-between items-center mb-8">
          <div className="relative mt-10">
            <input
              type="text"
              placeholder="Search communities..."
              className="pl-10 pr-4 py-2 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <button
            onClick={() => setIsDialogOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Create Community
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {communities.map((community) => (
            <div
              key={community.id}
              className="relative bg-black text-white rounded-lg shadow-lg overflow-hidden border-2 border-gray-800 p-5 hover:shadow-xl transition duration-300 ease-in-out"
            >
              <div className="flex justify-between items-center p-4">
                <div className="flex items-center space-x-4">
                  <Image
                    src={Trees}
                    alt={community.title}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <h4 className="text-xl font-semibold">{community.title}</h4>
                    <p className="text-sm text-gray-400">@{community.twitter}</p>
                  </div>
                </div>
                <p className="text-sm font-semibold">No {community.id}</p>
              </div>

              <div className="bg-gradient-to-r from-[#3D1DFF] via-[#6147FF] via-[#D451FF] via-[#EC458D] to-[#FFCA8B] h-1"></div>

              <div className="p-4 space-y-2">
                <p className="text-lg">{community.description}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-bold">${community.price} USDC</span>
                    <span className="block text-xs text-gray-400">
                      Funding Goal: ${community.fundingGoal}
                    </span>
                  </div>
                </div>
                <button onClick={() => handleJoinClick(community)} style={{backgroundColor:'white',padding:'5px 20px',borderRadius:'15px',color:'black',marginTop:'10px'}}>JOIN NOW</button>
              </div>

              <div className="absolute inset-y-0 left-0 w-6 bg-black border-l border-gray-800 rounded-r-full"></div>
              <div className="absolute inset-y-0 right-0 w-6 bg-black border-r border-gray-800 rounded-l-full"></div>
            </div>
          ))}
        </div>

        {isDialogOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-4xl w-full">
              <div className="flex">
                {/* Left Side: Input Details */}
                <div className="w-1/2 p-4 border-r">
                  <h2 className="text-2xl font-bold mb-4">Create Community</h2>
                  <form>
                    <div className="mb-4">
                      <label
                        htmlFor="title"
                        className="block mb-2 font-semibold"
                      >
                        Community Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        value={communityInput.title}
                        onChange={handleInputChange}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="twitter"
                        className="block mb-2 font-semibold"
                      >
                        Twitter Handle
                      </label>
                      <input
                        type="text"
                        id="twitter"
                        value={communityInput.twitter}
                        onChange={handleInputChange}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="description"
                        className="block mb-2 font-semibold"
                      >
                        Description
                      </label>
                      <input
                        id="description"
                        value={communityInput.description}
                        onChange={handleInputChange}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      ></input>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="price"
                        className="block mb-2 font-semibold"
                      >
                        Price per NFT (USDC)
                      </label>
                      <input
                        type="number"
                        id="price"
                        value={communityInput.price}
                        onChange={handleInputChange}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="fundingGoal"
                        className="block mb-2 font-semibold"
                      >
                        Funding Goal
                      </label>
                      <input
                        type="number"
                        id="fundingGoal"
                        value={communityInput.fundingGoal}
                        onChange={handleInputChange}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      />
                    </div>
                  </form>
                </div>

                {/* Right Side: Ticket Preview */}
                <div className="w-1/2 max-w-sm mx-auto bg-black text-white rounded-lg shadow-lg overflow-hidden relative border-2 border-gray-800 p-5 h-1/4 mt-1/2">
                  <div className="flex justify-between items-center p-4">
                    <div className="flex items-center space-x-4">
                      <Image
                        src={Trees}
                        alt="User Profile"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <h4 className="text-xl font-semibold">
                          {communityInput.title}
                        </h4>
                        <p className="text-sm text-gray-400">
                          @{communityInput.twitter}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold">No 014747</p>
                  </div>

                  <div className="bg-gradient-to-r from-[#3D1DFF] via-[#6147FF] via-[#D451FF] via-[#EC458D] to-[#FFCA8B]"></div> 
                  <div className="bg-gradient-to-r from-[#3D1DFF] via-[#6147FF] via-[#D451FF] via-[#EC458D] to-[#FFCA8B] h-1"></div>

                  <div className="p-4 space-y-2">
                    <p className="text-lg">{communityInput.description}</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-bold">
                          ${communityInput.price} USDC
                        </span>
                        <span className="block text-xs text-gray-400">
                          Funding Goal: ${communityInput.fundingGoal}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-y-0 left-0 w-6 bg-black border-l border-gray-800 rounded-r-full"></div>
                  <div className="absolute inset-y-0 right-0 w-6 bg-black border-r border-gray-800 rounded-l-full"></div>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setIsDialogOpen(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-red-600 transition duration-300 ease-in-out"
                >
                  Cancel
                </button>
                <button
                  onClick={deployContract}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 ease-in-out"
                >
                  Deploy Community Contract
                </button>
              </div>
            </div>
          </div>
        )}

        {/* JOIN NOW DIALOG */}
        {isJoinDialogOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-4xl w-full relative">
              <button
                onClick={() => setIsJoinDialogOpen(false)}
                className="absolute top-4 right-4 text-red-500 text-2xl" style={{margin:'10px 20px'}}
              >
                &times;
              </button>
              <div className="flex flex-col md:flex-row items-center">
                {/* Ticket preview enlarged */}
                <div className="w-full md:w-1/2 bg-black text-white rounded-lg shadow-lg overflow-hidden relative border-2 border-gray-800 p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-4">
                      <Image
                        src={Trees}
                        alt="User Profile"
                        width={60}
                        height={60}
                        className="rounded-full"
                      />
                      <div>
                        <h4 className="text-2xl font-semibold">
                          {selectedCommunity.title}
                        </h4>
                        <p className="text-sm text-gray-400">
                          @{selectedCommunity.twitter}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold">No 014747</p>
                  </div>

                  <div className="bg-gradient-to-r from-[#3D1DFF] via-[#6147FF] via-[#D451FF] via-[#EC458D] to-[#FFCA8B] h-1 mb-4"></div>

                  <div className="space-y-4">
                    <p className="text-lg">{selectedCommunity.description}</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-bold">
                          ${selectedCommunity.price} USDC
                        </span>
                        <span className="block text-xs text-gray-400">
                          Funding Goal: ${selectedCommunity.fundingGoal}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-y-0 left-0 w-6 bg-black border-l border-gray-800 rounded-r-full"></div>
                  <div className="absolute inset-y-0 right-0 w-6 bg-black border-r border-gray-800 rounded-l-full"></div>
                </div>

                {/* Right side content */}
                <div className="w-full md:w-1/2 mt-6 md:mt-0 md:pl-6 space-y-6">
                  {/* Support creator message */}
                  <div className="bg-gray-100 p-4 rounded-md shadow-md">
                    <p className="text-sm">
                      Supports creator: This listing is paying the collection
                      creator their suggested creator earnings.
                    </p>
                  </div>

                  
                </div>
               
              </div>
             <div style={{margin:"10px"}}>
             <button>Join Community</button>
             <button style={{backgroundColor:'#5865F2',padding:'10px 20px',borderRadius:"10px",color:'white',marginLeft:'20px'}}>Join Discord</button>
             </div>
            </div>
            
          </div>
        )}

        <ToastContainer />
      </div>
    </div>
  );
}