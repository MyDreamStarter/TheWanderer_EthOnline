"use client";
import { useState, useEffect } from "react";
import Header from "@/components/ui/header";

interface Vehicle {
  tokenId: number;
  owner: string;
  name: string;
  dataURI: string;
  imageURI: string;
  definition: {
    make: string;
    model: string;
    year: number;
  };
}

export default function Home() {
  const [mgVehicles, setMgVehicles] = useState<Vehicle[]>([]);
  const [teslaVehicles, setTeslaVehicles] = useState<Vehicle[]>([]);
  const [fordVehicles, setFordVehicles] = useState<Vehicle[]>([]);
  const [hondaVehicles, setHondaVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isDetailDialogOpen, setDetailDialogOpen] = useState(false);

  // Fetch vehicles from the DIMO API for different brands
  const fetchVehiclesByBrand = async (brand: string, setter: React.Dispatch<React.SetStateAction<Vehicle[]>>) => {
    try {
      const response = await fetch('https://identity-api.dimo.zone/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query ShowVehicles {
              vehicles(first: 4, filterBy: {make: "${brand}"}) {
                nodes {
                  tokenId
                  owner
                  name
                  dataURI
                  imageURI
                  definition {
                    make
                    model
                    year
                  }
                }
              }
            }
          `,
        }),
      });

      const { data } = await response.json();
      console.log(`Fetched ${brand} vehicles:`, data.vehicles.nodes);
      setter(data.vehicles.nodes);
    } catch (error) {
      console.error(`Failed to fetch ${brand} vehicles:`, error);
    }
  };

  useEffect(() => {
    // Fetch vehicles for each brand
    fetchVehiclesByBrand('MG', setMgVehicles);
    fetchVehiclesByBrand('Tesla', setTeslaVehicles);
    fetchVehiclesByBrand('Ford', setFordVehicles);
    fetchVehiclesByBrand('Honda', setHondaVehicles);

    setTimeout(() => setLoading(false), 4000);
  }, []);

  const handleOpenDetails = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setDetailDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDetailDialogOpen(false);
    setSelectedVehicle(null);
  };

  const brandImageMap: { [key: string]: string } = {
    MG: "https://i.etsystatic.com/26112859/r/il/134807/2854422983/il_fullxfull.2854422983_7caz.jpg",
    Tesla: "https://th.bing.com/th/id/R.e488777d759169c74b74aa95f07adbed?rik=VWCMNP%2fO1MdzWQ&riu=http%3a%2f%2fwww.carlogos.org%2flogo%2fTesla-logo-2003-2500x2500.png&ehk=JNBLiptu%2fRFyW%2fKfTZ0WnRm0dTAAOD2QoMqcnnk71e0%3d&risl=&pid=ImgRaw&r=0",
    Ford: "https://download.logo.wine/logo/Ford_Motor_Company/Ford_Motor_Company-Logo.wine.png",
    Honda: "https://static.vecteezy.com/system/resources/previews/020/336/363/original/honda-logo-honda-icon-free-free-vector.jpg"
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#f2f2f2] to-[#f7f5f0] p-4">
      <Header />
      <h1 className="text-7xl font-bold bg-gradient-to-r from-[#3D1DFF] via-[#6147FF] via-[#D451FF] via-[#EC458D] to-[#FFCA8B] bg-clip-text text-transparent mb-1 z-10" style={{marginTop:'200px'}}>
        WANDERER X DIMO
      </h1>

      {/* Vehicle Sections */}
      {loading ? (
        <div className="w-full max-w-5xl flex flex-col items-center mt-8">
          <p>Loading vehicles...</p>
        </div>
      ) : (
        <div className="w-full max-w-5xl flex flex-col items-center mt-8 space-y-12">
          {/* MG Section */}
          <VehicleSection
            brand="MG"
            vehicles={mgVehicles}
            brandImage={brandImageMap["MG"]}
            handleOpenDetails={handleOpenDetails}
          />
          {/* Tesla Section */}
          <VehicleSection
            brand="Tesla"
            vehicles={teslaVehicles}
            brandImage={brandImageMap["Tesla"]}
            handleOpenDetails={handleOpenDetails}
          />
          {/* Ford Section */}
          <VehicleSection
            brand="Ford"
            vehicles={fordVehicles}
            brandImage={brandImageMap["Ford"]}
            handleOpenDetails={handleOpenDetails}
          />
          {/* Honda Section */}
          <VehicleSection
            brand="Honda"
            vehicles={hondaVehicles}
            brandImage={brandImageMap["Honda"]}
            handleOpenDetails={handleOpenDetails}
          />
        </div>
      )}

      {/* Details Dialog */}
      {isDetailDialogOpen && selectedVehicle && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-lg p-6 relative flex flex-col">
            <button
              onClick={handleCloseDialog}
              className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <h2 className="text-3xl font-bold mb-4">Vehicle Details</h2>
            <p className="text-xl font-bold">{selectedVehicle.name}</p>
            <p className="text-gray-600">
              {selectedVehicle.definition.make} {selectedVehicle.definition.model} ({selectedVehicle.definition.year})
            </p>
            <p className="text-gray-500 mt-2">Owner: {selectedVehicle.owner}</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
             Request Rent
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Reusable Vehicle Section Component
function VehicleSection({
  brand,
  vehicles,
  brandImage,
  handleOpenDetails
}: {
  brand: string;
  vehicles: Vehicle[];
  brandImage: string;
  handleOpenDetails: (vehicle: Vehicle) => void;
}) {
  return (
    <div className="w-full">
      <h2 className="text-4xl font-bold mb-4">{brand}</h2>
      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 gap-6">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.tokenId}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center border border-gray-200"
          >
            <img
              src={brandImage}
              alt={brand}
              className="w-24 h-24 rounded mb-4"
            />
            <h3 className="text-xl font-bold mb-2">{vehicle.name}</h3>
            <p className="text-gray-600">
              {vehicle.definition.make} {vehicle.definition.model} ({vehicle.definition.year})
            </p>
            <p className="text-gray-500">Owner: {vehicle.owner}</p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              onClick={() => handleOpenDetails(vehicle)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
