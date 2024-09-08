"use client";
import { useState, useEffect, ReactNode } from "react";
import Image from "next/image";
import { useAccount, useChainId, useWalletClient } from "wagmi";
import { Hex, createPublicClient, http } from "viem";
import { base, baseSepolia,polygonAmoy,sepolia } from "viem/chains";
import { toast, ToastContainer } from "react-toastify";
import Simplestore from "@/lib/Simplestore.json";
import Header from "@/components/ui/header";
// const { ethers } = require();

// import ethers from "ethers";
import { ethers } from "ethers";

import MintingABI from "@/lib/MintingABI.json";

// import { useAccount } from "wagmi";

import { Hash } from "crypto";
import "react-toastify/dist/ReactToastify.css";

import ApeProfile from "../../../../public/assets/ape_profile.png";
import Trees from "../../../../public/assets/trees.png.webp";

interface Trip {
  fundingGoal: ReactNode;
  validTill: ReactNode;
  raidType: ReactNode;
  id: number;
  title: string;
  twitter: string;
  description: string;
  image: string;
  price: number;
}

interface TripInput {
  title: string;
  twitter: string;
  description: string;
  price: number;
  fundingGoal: number;
  validTill: string;
  raidType: string;
}

export default function DashboardPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tripInput, setTripInput] = useState<TripInput>({
    title: "",
    twitter: "",
    description: "",
    price: 0,
    fundingGoal: 0,
    validTill: "",
    raidType: "solo",
  });
  const [trips, setTrips] = useState<Trip[]>([]);
  const { address: walletAddress } = useAccount();
  const chainId = useChainId();
  const { data: walletClient } = useWalletClient({ chainId });
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(),
  });

  const [showButton, setShowButton] = useState(false);

  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
  const [countdown, setCountdown] = useState<number>(0);

  // JOIN NOW SELECTED TRIP STATES
  const [selectedTrip, setSelectedTrip] = useState({
    title: "Sample Trip",
    twitter: "creator_twitter",
    description: "This is a sample description of the trip.",
    price: 50,
    fundingGoal: 1000,
    validTill: "2024-09-10T12:00:00",
    raidType: "Type A",
  });

  // END TIME COUNTER FUNCTION
  const calculateRemainingTime = (validTill: string) => {
    const endDate = new Date(validTill).getTime();
    const currentTime = new Date().getTime();
    const timeLeft = Math.floor((endDate - currentTime) / 1000); // in seconds
    return timeLeft > 0 ? timeLeft : 0;
  };

  const formatCountdown = (seconds: number) => {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${days}d ${hours}h ${minutes}m ${secs}s`;
  };

  // const handleJoinClick = () => {
  //   setIsJoinDialogOpen(true);
  //   setCountdown(calculateRemainingTime());
  // };

  const handleJoinClick = (trip: Trip) => {
    setSelectedTrip(trip); // Set the selected trip dynamically
    setCountdown(calculateRemainingTime(trip.validTill));
    setIsJoinDialogOpen(true); // Open the join dialog
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
    window.location.href = "/chat";
  };

  useEffect(() => {
    const savedTrips = JSON.parse(localStorage.getItem("trips") || "[]");
    setTrips(savedTrips);
  }, []);

  async function getContractAddressFromTxHash(
    txHash: string | Promise<string>,
    providerUrl: string | ethers.ethers.utils.ConnectionInfo | undefined
  ) {
    // Connect to an Ethereum node
    const provider = new ethers.providers.JsonRpcProvider(providerUrl);

    try {
      // Get the transaction receipt
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

      const newTrip: Trip = {
        id: trips.length + 1,
        ...tripInput,
        image: "/default.jpg",
      };

      const updatedTrips = [...trips, newTrip];
      setTrips(updatedTrips);
      localStorage.setItem("trips", JSON.stringify(updatedTrips));
      console.log("Contract deployed successfully!");

      setIsDialogOpen(false);

      toast.success("Contract deployed successfully!", {
        position: "top-right",
      });

      const txn = await publicClient.waitForTransactionReceipt({ hash });
      console.log(txn);
      console.log(txn.contractAddress);
      // const txHash = hash;
      // const providerUrl = "wss://base-sepolia-rpc.publicnode.com";

      // const txn = await getContractAddressFromTxHash(txHash, providerUrl);

      console.log("Transaction Receipt:", txn);

      // const contractAddress =  getContractAddressFromTxHash(hash);

      // if (contractAddress) {
      //     console.log("Contract Address:", contractAddress);
      // } else {
      //     console.warn("Failed to retrieve contract address.");
      // }

      if (txn) {
        const newTrip: Trip = {
          id: trips.length + 1,
          ...tripInput,
          image: "/default.jpg",
        };

        const updatedTrips = [...trips, newTrip];
        setTrips(updatedTrips);
        localStorage.setItem("trips", JSON.stringify(updatedTrips));
        console.log("Contract deployed successfully!");

        setIsDialogOpen(false);

        toast.success("Contract deployed successfully!", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Deployment error:", error);
      // toast.error("Error deploying contract: " + error, {
      //   position: "top-left",
      // });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value } = e.target;
    setTripInput((prevInput) => ({ ...prevInput, [id]: value }));
  };

  // MINT FUN
  const handleMint = async () => {
    const contractAddress = "0xEA95D30784d62602fb1e5B9461CE22214960b521";
    const contractABI = [
      {
        "inputs": [],
        "name": "safeMint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function",
      },
    ];

    try {
      // Get provider and signer
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        // Create a contract instance
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        toast.loading("Minting NFT", {
          position: "top-right",
        });

        // Call the safeMint method
        const tx = await contract.safeMint();

        // Wait for the transaction to be mined
        await tx.wait();

        console.log("Mint successful!");
        setShowButton(true);
        toast.dismiss();
        toast.success("Minted NFT successfully!", {
          position: "top-right",
        });
      } else {
        console.error("No Ethereum provider detected");
      }
    } catch (error) {
      console.error("Error minting:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="p-20 bg-gray-100 min-h-screen">
        <header className="flex justify-between items-center mb-8">
          <div className="relative mt-10">
            <input
              type="text"
              placeholder="Search trips..."
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
            Create Trip
          </button>
        </header>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="bg-white border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              <div className="relative h-48">
                <Image
                  src={trip.image}
                  alt={trip.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{trip.title}</h2>
                <p className="text-gray-600 mb-4">{trip.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-green-600 font-bold">
                    ${trip.price} USDC
                  </span>
                  <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 ease-in-out">
                    Join
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trips.map((trip) => (
            <div
              key={trip.id}
              className="relative bg-black text-white rounded-lg shadow-lg overflow-hidden border-2 border-gray-800 p-5 hover:shadow-xl transition duration-300 ease-in-out"
            >
              <div className="flex justify-between items-center p-4">
                <div className="flex items-center space-x-4">
                  <Image
                    src={Trees}
                    alt={trip.title}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <h4 className="text-xl font-semibold">{trip.title}</h4>
                    <p className="text-sm text-gray-400">@{trip.twitter}</p>
                  </div>
                </div>
                <p className="text-sm font-semibold">No {trip.id}</p>
              </div>

              <div className="bg-gradient-to-r from-[#3D1DFF] via-[#6147FF] via-[#D451FF] via-[#EC458D] to-[#FFCA8B] h-1"></div>

              <div className="p-4 space-y-2">
                <p className="text-lg">{trip.description}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-bold">${trip.price} USDC</span>
                    <span className="block text-xs text-gray-400">
                      Funding Goal: ${trip.fundingGoal}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="block text-xs text-gray-400">
                      Valid Till: {trip.validTill}
                    </span>
                    <span className="block text-xs text-gray-400">
                      Type: {trip.raidType}
                    </span>
                  </div>
                  {/* <button onClick={handleJoinClick}>JOIN NOW</button> */}
                </div>
                <button
                  onClick={() => handleJoinClick(trip)}
                  style={{
                    backgroundColor: "white",
                    padding: "5px 20px",
                    borderRadius: "15px",
                    color: "black",
                    marginTop: "10px",
                  }}
                >
                  JOIN NOW
                </button>
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
                  <h2 className="text-2xl font-bold mb-4">Create Trip</h2>
                  <form>
                    <div className="mb-4">
                      <label
                        htmlFor="title"
                        className="block mb-2 font-semibold"
                      >
                        Trip Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        value={tripInput.title}
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
                        value={tripInput.twitter}
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
                        value={tripInput.description}
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
                        value={tripInput.price}
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
                        value={tripInput.fundingGoal}
                        onChange={handleInputChange}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="validTill"
                        className="block mb-2 font-semibold"
                      >
                        Valid Till
                      </label>
                      <input
                        type="date"
                        id="validTill"
                        value={tripInput.validTill}
                        onChange={handleInputChange}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="raidType"
                        className="block mb-2 font-semibold"
                      >
                        Type of Trip
                      </label>
                      <select
                        id="raidType"
                        value={tripInput.raidType}
                        onChange={handleInputChange}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      >
                        <option value="solo">Solo</option>
                        <option value="group">Group</option>
                        <option value="travel">Travel</option>
                      </select>
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
                          {tripInput.title}
                        </h4>
                        <p className="text-sm text-gray-400">
                          @{tripInput.twitter}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold">No 014747</p>
                  </div>

                  {/* <div className="bg-gradient-to-r from-pink-500 via-yellow-500 to-blue-500 h-1"></div> */}
                  <div className="bg-gradient-to-r from-[#3D1DFF] via-[#6147FF] via-[#D451FF] via-[#EC458D] to-[#FFCA8B] h-1"></div>

                  <div className="p-4 space-y-2">
                    <p className="text-lg">{tripInput.description}</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-bold">
                          ${tripInput.price} USDC
                        </span>
                        <span className="block text-xs text-gray-400">
                          Funding Goal: ${tripInput.fundingGoal}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="block text-xs text-gray-400">
                          Valid Till: {tripInput.validTill}
                        </span>
                        <span className="block text-xs text-gray-400">
                          Type: {tripInput.raidType}
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
                  Deploy Trip Contract
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
                className="absolute top-4 right-4 text-red-500 text-2xl"
                style={{ margin: "10px 20px" }}
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
                          {selectedTrip.title}
                        </h4>
                        <p className="text-sm text-gray-400">
                          @{selectedTrip.twitter}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold">No 014747</p>
                  </div>

                  <div className="bg-gradient-to-r from-[#3D1DFF] via-[#6147FF] via-[#D451FF] via-[#EC458D] to-[#FFCA8B] h-1 mb-4"></div>

                  <div className="space-y-4">
                    <p className="text-lg">{selectedTrip.description}</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-bold">
                          ${selectedTrip.price} USDC
                        </span>
                        <span className="block text-xs text-gray-400">
                          Funding Goal: ${selectedTrip.fundingGoal}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="block text-xs text-gray-400">
                          Valid Till: {selectedTrip.validTill}
                        </span>
                        <span className="block text-xs text-gray-400">
                          Type: {selectedTrip.raidType}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-y-0 left-0 w-6 bg-black border-l border-gray-800 rounded-r-full"></div>
                  <div className="absolute inset-y-0 right-0 w-6 bg-black border-r border-gray-800 rounded-l-full"></div>
                </div>

                {/* Right side content */}
                <div className="w-full md:w-1/2 mt-6 md:mt-0 md:pl-6 space-y-6">
                  {/* Countdown Timer */}
                  <div className="text-center bg-gray-200 p-4 rounded-md shadow-md">
                    <h4 className="text-lg font-semibold">
                      Joining Time Ends In
                    </h4>
                    <p className="text-2xl font-bold">
                      {/* {Math.floor(
                (new Date(selectedTrip.validTill).getTime() -
                  new Date().getTime()) /
                  1000
              )}{" "}
              seconds */}
                      {formatCountdown(countdown)}
                    </p>
                    <p className="text-sm text-gray-500">
                      (until {selectedTrip.validTill})
                    </p>
                  </div>

                  {/* Support creator message */}
                  <div className="bg-gray-100 p-4 rounded-md shadow-md">
                    <p className="text-sm">
                      Supports creator: This listing is paying the collection
                      creator their suggested creator earnings.
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-around">
                    <button
                      onClick={handleMint}
                      // className="bg-blue-500 text-white px-4 py-2 rounded-md font-bold mr-4" style={{width:'200px'}}
                    >
                      <a
                        className="btn group mb-4 w-full text-white shadow hover:opacity-90 transition-all duration-300 sm:mb-0 sm:w-auto"
                        href="#0"
                        style={{
                          backgroundImage:
                            "linear-gradient(15.46deg, rgb(74, 37, 225) 26.3%, rgb(123, 90, 255) 86.4%)",
                          boxShadow:
                            "rgba(96, 60, 255, 0.48) 0px 21px 27px -10px",
                          padding: "10px 20px",
                          borderRadius: "30px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          minHeight: "34px",
                        }}
                      >
                        <span className="relative inline-flex items-center justify-center">
                          Mint NFT
                          <span className="ml-1 tracking-normal text-blue-200 transition-transform group-hover:translate-x-0.5">
                            -&gt;
                          </span>
                        </span>
                      </a>
                    </button>

                    {showButton && <button
                      onClick={handleSupportClick}
                      className="text-black-500 border border-black-500 px-4 py-2 rounded-md font-bold"
                    >
                      Chat
                    </button> }
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <ToastContainer />
      </div>
    </div>
  );
}
