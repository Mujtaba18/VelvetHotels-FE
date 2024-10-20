import React, { useEffect, useState } from 'react';
import { getAmenities, addAmenity } from '../services/amenity';

const Amenity = () => {
    const [amenities, setAmenities] = useState([]);
    const [newAmenity, setNewAmenity] = useState({ amenity_name: '', amenity_description: '', amenity_icon: '' });

    const fetchAmenities = async () => {
        try {
            const data = await getAmenities();
            setAmenities(data);
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleAddAmenity = async (e) => {
        e.preventDefault();
        console.log('Adding amenity:', newAmenity);
        try {
            const addedAmenity = await addAmenity(newAmenity);
            console.log('Added Amenity:', addedAmenity); 
            setAmenities([...amenities, addedAmenity.amenity]);
            setNewAmenity({ amenity_name: '', amenity_description: '', amenity_icon: '' });
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        fetchAmenities();
    }, []);

    return (
        <div>
            <h2>Amenities</h2>
            <ul>
                {amenities.map((amenity) => (
                    <li key={amenity._id}>
                        <h3>{amenity.amenity_name}</h3>
                        <p>{amenity.amenity_description}</p>
                        <img src={amenity.amenity_icon} alt={amenity.amenity_name} />
                    </li>
                ))}
            </ul>
            <form onSubmit={handleAddAmenity}>
                <input
                    type="text"
                    placeholder="Amenity Name"
                    value={newAmenity.amenity_name}
                    onChange={(e) => setNewAmenity({ ...newAmenity, amenity_name: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Amenity Description"
                    value={newAmenity.amenity_description}
                    onChange={(e) => setNewAmenity({ ...newAmenity, amenity_description: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Amenity Icon URL"
                    value={newAmenity.amenity_icon}
                    onChange={(e) => setNewAmenity({ ...newAmenity, amenity_icon: e.target.value })}
                />
                <button type="submit">Add Amenity</button>
            </form>
        </div>
    );
};

export default Amenity;
