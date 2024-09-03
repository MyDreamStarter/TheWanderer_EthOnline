"use client"
import { useState } from "react";
import Image from "next/image";
import Header from "@/components/ui/header";

interface Vehicle {
  id: number;
  type: "car" | "bike";
  name: string;
  model: string;
  year: number;
  imageUrl: string;
}

const vehicles: Vehicle[] = [
    {
      id: 1,
      type: "car",
      name: "Tesla Model X",
      model: "Model X",
      year: 2020,
      imageUrl: "https://www.tesla.com/sites/default/files/modelsx-new/social/model-x-hero-social.jpg"
    },
    {
      id: 2,
      type: "car",
      name: "Tesla Model Y",
      model: "Model Y",
      year: 2021,
      imageUrl: "https://www.tesla.com/sites/default/files/modelsy-new/social/model-y-hero-social.jpg"
    },
    {
      id: 3,
      type: "car",
      name: "Tesla Model 3",
      model: "Model 3",
      year: 2022,
      imageUrl: "https://www.tesla.com/sites/default/files/model3-new/social/model-3-hero-social.jpg"
    },
    {
      id: 4,
      type: "car",
      name: "Tesla Model S",
      model: "Model S",
      year: 2019,
      imageUrl: "https://www.tesla.com/sites/default/files/modelss-new/social/model-s-hero-social.jpg"
    },
    {
      id: 5,
      type: "car",
      name: "Tesla Model 3",
      model: "Model 3",
      year: 2021,
      imageUrl: "https://www.tesla.com/sites/default/files/model3-new/social/model-3-hero-social.jpg"
    },
    {
      id: 6,
      type: "car",
      name: "Tesla Model X",
      model: "Model X",
      year: 2020,
      imageUrl: "https://www.tesla.com/sites/default/files/modelsx-new/social/model-x-hero-social.jpg"
    },
    {
      id: 7,
      type: "car",
      name: "Tesla Model Y",
      model: "Model Y",
      year: 2021,
      imageUrl: "https://www.tesla.com/sites/default/files/modelsy-new/social/model-y-hero-social.jpg"
    },
    {
      id: 8,
      type: "car",
      name: "Tesla Model 3",
      model: "Model 3",
      year: 2022,
      imageUrl: "https://www.tesla.com/sites/default/files/model3-new/social/model-3-hero-social.jpg"
    },
    {
      id: 9,
      type: "bike",
      name: "Harley-Davidson Street Rod",
      model: "Street Rod",
      year: 2018,
      imageUrl: "https://www.harley-davidson.com/content/dam/h-d/images/product-images/bikes/motorcycle/2018/2018-street-rod/2018-street-rod-016/2018-street-rod-016-motorcycle.jpg"
    },
    {
      id: 10,
      type: "bike",
      name: "Honda CBR600RR",
      model: "CBR600RR",
      year: 2019,
      imageUrl: "https://powersports.honda.com/assets/model-info/street/supersport/cbr600rr/2019/gallery/2019-cbr600rr-gallery-01.jpg"
    }
  ];

export default function Home() {
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [showVehicles, setShowVehicles] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [locationMessage, setLocationMessage] = useState<string | null>(null);

  const handleSearch = () => {
    setShowSkeleton(true);
    setTimeout(() => {
      setShowSkeleton(false);
      setShowVehicles(true);
    }, 1500); // Simulate loading time
  };

  const handleAutoFind = () => {
    setLocationMessage("Auto-location finder is not available.");
  };

  const handleVehicleClick = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const closeDrawer = () => {
    setSelectedVehicle(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#f2f2f2] to-[#f7f5f0] p-4">
        <Header/>
        <br></br>
        <br></br>
        <br></br><br></br>
      {!showSkeleton && !showVehicles && (
        <div className="space-y-6 text-center">
          <input
            type="text"
            placeholder="Enter location"
            className="w-80 px-4 py-2 border rounded-md shadow-lg"
          />
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleAutoFind}
              className="px-4 py-2 bg-yellow-500 text-white rounded-full shadow-md"
            >
              <i className="fas fa-map-marker-alt"></i> Auto-Find Location
            </button>
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-green-600 text-white rounded-full shadow-md"
            >
              Search
            </button>
          </div>
          {locationMessage && <p className="text-red-500">{locationMessage}</p>}
        </div>
      )}

      {showSkeleton && (
        <div className="w-full max-w-md animate-pulse">
          <div className="h-8 bg-gray-300 rounded mb-6"></div>
          <div className="h-8 bg-gray-300 rounded mb-6"></div>
          <div className="h-8 bg-gray-300 rounded mb-6"></div>
        </div>
      )}

      {showVehicles && (
        <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              onClick={() => handleVehicleClick(vehicle)}
              className="bg-white rounded-lg shadow-lg cursor-pointer transform transition-transform hover:scale-105"
            >
              <img
                src={vehicle.imageUrl}
                alt={vehicle.name}
                className="rounded-t-lg"
                width={300}
                height={200}
                // layout="responsive"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">{vehicle.name}</h3>
                <p>{vehicle.model}</p>
                <p>{vehicle.year}</p>
                <p className="text-sm text-gray-500">Type: {vehicle.type}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedVehicle && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-end">
          <div className="bg-white w-[1/2] max-w-xl p-6 h-full overflow-y-auto relative">
            <button
              onClick={closeDrawer}
              className="absolute top-4 right-4 text-red-500 text-2xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">{selectedVehicle.name}</h2>
            <img
              src={selectedVehicle.imageUrl}
              alt={selectedVehicle.name}
              className="rounded-lg mb-4"
              width={400}
              height={300}
            //   layout="responsive"
            />
            <p className="text-lg">Model: {selectedVehicle.model}</p>
            <p className="text-lg">Year: {selectedVehicle.year}</p>
            <p className="text-lg">Type: {selectedVehicle.type}</p>
          </div>
        </div>
      )}
    </div>
  );
}
