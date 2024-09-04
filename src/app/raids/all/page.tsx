"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useAccount, useChainId, useWalletClient } from "wagmi";
import { Hex, createPublicClient, http } from "viem";
import { base } from "viem/chains";
import { toast, ToastContainer } from "react-toastify";
import Simplestore from "@/lib/Simplestore.json";
import Header from "@/components/ui/header";
import ApeProfile from "../../../../public/assets/ape_profile.png";

interface Trip {
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
    chain: base,
    transport: http(),
  });

  useEffect(() => {
    const savedTrips = JSON.parse(localStorage.getItem("trips") || "[]");
    setTrips(savedTrips);
  }, []);

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

      console.log(hash)

      const txn = await publicClient.waitForTransactionReceipt({ hash });

      console.log(txn)

      if(txn){
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
      toast.error("Error deploying contract: " + error, {
        position: "top-left",
      });
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                        src={ApeProfile}
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

        <ToastContainer />
      </div>
    </div>
  );
}
