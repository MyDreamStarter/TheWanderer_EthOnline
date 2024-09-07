import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const client = await clientPromise;
            const db = client.db("your-database-name");

            const cars = await db.collection("cars").find({}).toArray(); // Fetch all cars
            res.status(200).json(cars);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching cars data', error });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
