import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const client = await clientPromise;
            const db = client.db("your-database-name");

            const newCar = req.body; // The data you want to save (from the POST request)
            const result = await db.collection("cars").insertOne(newCar);

            res.status(201).json({ message: "Car added successfully", result });
        } catch (error) {
            res.status(500).json({ message: 'Error adding car', error });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
