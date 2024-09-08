import React from 'react';
import Image from "next/image"; 
import CULT_BG from "../../../public/assets/BG_CULT.png"; 
import Nav from "@/components/ui/header";

const CarRentalLanding: React.FC = () => {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('${CULT_BG.src}')`,
        overflow: 'hidden',
      }}
    >
        <Nav/>
        <div style={{marginTop:'150px',textAlign:'center'}}>
        <h1 className="text-6xl font-bold mb-4 text-[#c25b00]">Welcome to CULT</h1>
        <h2 className="text-3xl font-semibold mb-6 text-[#df812c]">Connect with communities</h2>
          <p className="mb-4 text-[#fd9405]">
            Discover the best communities for fueling your travelling, Whether you're planning a weekend getaway or a long road trip, we've got you covered.
          </p>
          <a
            className="btn group mb-4 text-white shadow hover:opacity-90 transition-all duration-300"
            href="/cult/all"
            style={{
            //   backgroundImage: "linear-gradient(15.46deg, rgb(74, 37, 225) 26.3%, rgb(123, 90, 255) 86.4%)",
            backgroundColor:'black',
              padding: "10px 20px",
              borderRadius: "30px",
              display: "inline-block",
              color:'white'
            }}
          >
            Explore Communities
          </a>
        </div>
      <div className="flex items-center justify-start h-full p-8 text-[#df812c]">
        <div className="text-white max-w-md">
          
         
         
        </div>
      </div>
    </div>
  );
};

export default CarRentalLanding;