"use client";
import { useState } from "react";
import Header from "@/components/ui/header";

export default function Home() {
    const [isRentDialogOpen, setRentDialogOpen] = useState(false);
    const [isListDialogOpen, setListDialogOpen] = useState(false);

    const handleOpenRentDialog = () => setRentDialogOpen(true);
    const handleOpenListDialog = () => setListDialogOpen(true);
    const handleCloseDialogs = () => {
        setRentDialogOpen(false);
        setListDialogOpen(false);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#f2f2f2] to-[#f7f5f0] p-4">
            <Header />
            <h1 className="text-7xl font-bold bg-gradient-to-r from-[#3D1DFF] via-[#6147FF] via-[#D451FF] via-[#EC458D] to-[#FFCA8B] bg-clip-text text-transparent mb-1 z-10">
                WANDERER X DIMO
            </h1>

            <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 px-4" style={{ height: '300px' }}>
                {/* 1st Card - Rent a Car */}
                <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center border border-gray-200" style={{ height: 'full', margin: '30px' }}>
                    <div className="mt-4 text-center">
                        <h2 className="text-xl font-bold mb-2">Rent a Car</h2>
                        <p className="text-gray-600">
                            Find a car for rent near you and explore various vehicle options for your journey.
                        </p>
                        <button
                            onClick={handleOpenRentDialog}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                            Rent Now
                        </button>
                    </div>
                </div>

                {/* 2nd Card - List a Car */}
                <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center border border-gray-200" style={{ height: 'full', margin: '30px' }}>
                    <div className="mt-4 text-center">
                        <h2 className="text-xl font-bold mb-2">List a Car</h2>
                        <p className="text-gray-600">
                            List your car on our platform and start earning money by renting it out to others.
                        </p>
                        <button
                            onClick={handleOpenListDialog}
                            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                            List Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Rent Dialog */}
            {isRentDialogOpen && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white w-full h-full p-6 relative flex flex-col">
                        <button
                            onClick={handleCloseDialogs}
                            className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-700">
                            &times;
                        </button>
                        <h2 className="text-3xl font-bold mb-4">Rent a Car</h2>
                        <p>Content for the rent a car dialog goes here...</p>
                    </div>
                </div>
            )}

            {/* List Dialog */}
            {isListDialogOpen && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white w-full h-full p-6 relative flex flex-col">
                        <button
                            onClick={handleCloseDialogs}
                            className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-700">
                            &times;
                        </button>
                        <h2 className="text-3xl font-bold mb-4">List a Car</h2>
                        <p>Content for the list a car dialog goes here...</p>
                    </div>
                </div>
            )}
        </div>
    );
}
