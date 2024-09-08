// src/app/rent/all/CarForm.tsx

import React, { useState } from 'react';
import { CarDetails } from './types';

interface CarFormProps {
    onSubmit: (carDetails: CarDetails) => void;
}

const CarForm: React.FC<CarFormProps> = ({ onSubmit }) => {
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState<any | ''>('');
    const [licensePlate, setLicensePlate] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (make && model && year && licensePlate) {
            const carDetails: CarDetails = { make, model, year: Number(year), licensePlate };
            onSubmit(carDetails);
            setMake('');
            setModel('');
            setYear('');
            setLicensePlate('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Make"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="License Plate"
                value={licensePlate}
                onChange={(e) => setLicensePlate(e.target.value)}
                required
            />
            <button type="submit">Authorize Car</button>
        </form>
    );
};

export default CarForm;