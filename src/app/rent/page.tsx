import React from 'react';
import Image from "next/image"; 
import carRentalImage from "../../../public/assets/cabs_bg.png"; 
import Nav from "@/components/ui/header";

const CarRentalLanding: React.FC = () => {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('${carRentalImage.src}')`, // Change this to your background image path
        overflow: 'hidden',
      }}
    >
        <Nav/>
      <div className="flex items-center justify-start h-full p-8 text-[#df812c]">
        <div className="text-white max-w-md">
          <h1 className="text-6xl font-bold mb-4 text-[#c25b00]">Welcome to Car Rental</h1>
          <h2 className="text-3xl font-semibold mb-6 text-[#df812c]">Drive Your Dreams</h2>
          <p className="mb-4 text-[#fd9405]">
            Discover the best car rental options tailored to your needs. Whether you're planning a weekend getaway or a long road trip, we've got you covered.
          </p>
          <a
            className="btn group mb-4 text-white shadow hover:opacity-90 transition-all duration-300"
            href="/car-rental/all"
            style={{
              backgroundImage: "linear-gradient(15.46deg, rgb(74, 37, 225) 26.3%, rgb(123, 90, 255) 86.4%)",
              padding: "10px 20px",
              borderRadius: "30px",
              display: "inline-block",
            }}
          >
            Explore Rentals
          </a>
        </div>
      </div>
    </div>
  );
};

export default CarRentalLanding;