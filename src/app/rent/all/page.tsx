"use client";
import { useEffect, useState } from "react";

interface Vehicle {
    id: number;
    type: "car" | "bike";
    name: string;
    model: string;
    year: number;
    imageUrl: string;
}

export default function Home() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [location, setLocation] = useState<string>("");
    const [locationMessage, setLocationMessage] = useState<string | null>(null);

    const handleSearch = async () => {
        const response = await fetch(`/api/vehicles?location=${location}`);
        if (response.ok) {
            const data = await response.json();
            setVehicles(data);
        } else {
            setLocationMessage("Failed to fetch vehicles. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#f2f2f2] to-[#f7f5f0] p-4">
             <header className="bg-blue-600 text-white p-4">
            <h1 className="text-2xl font-bold">Vehicle Rental App</h1>
        </header>
            <input
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-80 px-4 py-2 border rounded-md shadow-lg"
            />
            <button
                onClick={handleSearch}
                className="px-4 py-2 bg-green-600 text-white rounded-full shadow-md"
            >
                Search
            </button>
            {locationMessage && <p className="text-red-500">{locationMessage}</p>}
            <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
                {vehicles.map((vehicle) => (
                    <div key={vehicle.id} className="bg-white rounded-lg shadow-lg">
                        <img
                            src={vehicle.imageUrl}
                            alt={vehicle.name}
                            className="rounded-t-lg"
                            width={300}
                            height={200}
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
        </div>
    );
}