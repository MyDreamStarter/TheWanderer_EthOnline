"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

import { useAccount, useChainId, useWalletClient } from 'wagmi'
import { Hex, createPublicClient, http } from 'viem'
import { base } from 'viem/chains'
import { createConfig, WagmiConfig } from 'wagmi'
import { mainnet, polygon } from 'wagmi/chains'

import { toast, ToastContainer } from 'react-toastify'

import Simplestore from '@/lib/Simplestore.json'

import Header from "@/components/ui/header";


export default function DashboardPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const { address: walletAddress } = useAccount();

//   const [error, setError] = useState<string | null>(null);
  const [isDeployed, setIsDeployed] = useState(false);
  const chainId = useChainId();
  const { data: walletClient } = useWalletClient({ chainId });
  const publicClient = createPublicClient({
    chain: base,
    transport: http(),
  });

  const dummyTrips = [
    {
      id: 1,
      title: "Beach Getaway",
      description: "Relax on sandy shores",
      image: "/beach.jpg",
      price: 100,
    },
    {
      id: 2,
      title: "Mountain Adventure",
      description: "Hike scenic trails",
      image: "/mountain.jpg",
      price: 150,
    },
    {
      id: 3,
      title: "City Explorer",
      description: "Discover urban wonders",
      image: "/city.jpg",
      price: 200,
    },
    {
      id: 4,
      title: "Desert Safari",
      description: "Experience the golden sands",
      image: "/desert.jpg",
      price: 180,
    },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        setIsDrawerOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //   const handleOnSubmit = () => {
  //     console.log("Clicked")
  //   }

  // const deployContract = async () => {
  //     if (!walletClient) {
  //         throw new Error('Wallet client not available')
  //     }

  //     try {
  //         const hash = await walletClient.deployContract({
  //             abi: Simplestore.abi,
  //             bytecode: Simplestore.bytecode as Hex,
  //             account: walletAddress,
  //             args: ['0xf5d0A178a61A2543c98FC4a73E3e78a097DBD9EE']
  //         })

  //         if (!hash) {
  //             throw new Error('Failed to exe
  // const deployContract = async () => {
  //     if (!walletClient) {
  //         throw new Error('Wallet client not available')
  //     }

  //     try {
  //         const hash = await walletClient.deployContract({
  //             abi: Simplestore.abi,
  //             bytecode: Simplestore.bytecode as Hex,
  //             account: walletAddress,
  //             args: ['0xf5d0A178a61A2543c98FC4a73E3e78a097DBD9EE']
  //         })

  //         if (!hash) {
  //             throw new Error('Failed to exe')
  //         }
  //     }}

  // const txn = await publicClient.waitForTransactionReceipt({ hash })

  //             setIsDeployed(true)

  //             return txn.contractAddress
  //         } catch (error) {
  //             console.error('Deployment error:', error);
  //             toast.error('Error deploying AccessMaster contract: ' + error, {
  //                 position: 'top-left',
  //             });
  //             throw error;
  //         }
  //     };

  const deployContract = async () => {
    console.log("Deploying contract called");
    if (!walletClient) {
      throw new Error("Wallet client not available");
    }

    try {
      const hash = await walletClient.deployContract({
        abi: Simplestore.abi,
        bytecode: Simplestore.bytecode as Hex,
        account: walletAddress,
      });

      if (!hash) {
        throw new Error("Failed to execute deploy contract transaction");
      }

      const txn = await publicClient.waitForTransactionReceipt({ hash });

      setIsDeployed(true);

      console.log("txn", txn);
      return txn.contractAddress;
    } catch (error) {
      console.error("Deployment error:", error);
      toast.error("Error deploying AccessMaster contract: " + error, {
        position: "top-left",
      });
      throw error;
    }
  };


  // const handleOnSubmit = (event: { preventDefault: () => void; }) => {
  //   event.preventDefault(); // Prevent the default form submission
  //   deployContract(); // Call your deployment function
  // };

  

  return (
    <div>
      <Header />
    <div className="p-20  bg-gray-100 min-h-screen">
      <header className="flex justify-between items-center mb-8">
        <div className="relative mt-10 ">
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
          onClick={() => setIsDrawerOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Create Trip
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dummyTrips.map((trip) => (
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
      </div>

      <button onClick={deployContract}>Deploy Contract</button>

      {isDrawerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div
            ref={drawerRef}
            className="absolute right-0 top-0 bottom-0 w-96 bg-white p-6 overflow-y-auto shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-4">Create Raid</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="title" className="block mb-2 font-semibold">
                  Raid Title
                </label>
                <input
                  type="text"
                  id="title"
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
                <textarea
                  id="description"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  rows={4}
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block mb-2 font-semibold">
                  Price per NFT (USDC)
                </label>
                <input
                  type="number"
                  id="price"
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
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="validTill" className="block mb-2 font-semibold">
                  Valid Till
                </label>
                <input
                  type="date"
                  id="validTill"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="raidType" className="block mb-2 font-semibold">
                  Type of Raid
                </label>
                <select
                  id="raidType"
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <option value="solo">Solo</option>
                  <option value="group">Group</option>
                  <option value="travel">Travel</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  // type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
                  onSubmit={deployContract}
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="ml-2 bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300 ease-in-out"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
