// import { NextRequest, NextResponse } from 'next/server';
// import { DIMO } from '@dimo-network/dimo-node-sdk';

// // Update the request parameter type to NextRequest
// export async function GET(request: NextRequest) {
   
//     // const { searchParams } = new URL(request.url);
//     // const location = searchParams.get('location') || '';

//     // console.log("Fetching vehicles for location: STARTING", location);

//     // // Ensure the location is not empty or invalid
//     // if (!location) {
//     //     return NextResponse.json({ error: "Location parameter is required" }, { status: 400 });
//     // }

//     try {
//         console.log("Fetching vehicles for location: STARTING");
//     //     // Initialize DIMO SDK with the correct environment and any required credentials
//     //     const dimo = new DIMO('Production');

//     //     // Fetch vehicles based on location
//     //     const response = await dimo.vehicles.listByLocation({ location });

//     //     console.log("Fetching vehicles for location: END", location);

//     //     // Check if the response contains vehicles data
//     //     if (!response || !response.vehicles) {
//     //         throw new Error("No vehicles data found in response");
//     //     }

//     //     // Return the fetched vehicles
//     //     return NextResponse.json(response.vehicles);
//     } catch (error) {
//         // Log detailed error information for debugging
//         console.error("Error fetching vehicles:", error);

//         // Provide a more informative error message to the client
//         return NextResponse.json({ error: "Failed to fetch vehicles" }, { status: 500 });
//     }
// }


import { NextRequest, NextResponse } from 'next/server';

// Dummy function to simulate fetching vehicle data
export async function GET(request: NextRequest) {
    try {
        console.log("Fetching vehicles: STARTING");

        // Simulate a delay to mimic an API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Dummy vehicle data
        const dummyVehicles = [
            { id: 1, make: 'Toyota', model: 'Camry', year: 2020 },
            { id: 2, make: 'Honda', model: 'Civic', year: 2021 },
            { id: 3, make: 'Ford', model: 'Mustang', year: 2022 },
        ];

        console.log("Fetching vehicles: END");

        // Return the dummy vehicle data
        return NextResponse.json(dummyVehicles);
    } catch (error) {
        // Log detailed error information for debugging
        console.error("Error fetching vehicles:", error);

        // Provide a more informative error message to the client
        return NextResponse.json({ error: "Failed to fetch vehicles" }, { status: 500 });
    }
}