import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const AddHotel = () => {
  const [hotelName, setHotelName] = useState("")
  const [hotelLocation, setHotelLocation] = useState("")
  const [hotelDescription, setHotelDescription] = useState("")
  const [hotelPrice, setHotelPrice] = useState(0)
  const [hotelStars, setHotelStars] = useState(0)
  const [hotelRooms, setHotelRooms] = useState(0)
  const [hotelImage, setHotelImage] = useState(null)
  const [amenities, setAmenities] = useState([])
  const [selectedAmenities, setSelectedAmenities] = useState([])

  // Handle form input change
  const navigate = useNavigate()

  // Fetch amenities from the backend
  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/hotels/getAmenities"
        )
        setAmenities(response.data)
      } catch (error) {
        console.error("Error fetching amenities:", error)
      }
    }

    fetchAmenities()
  }, [])

  // Handle checkbox toggle
  const handleAmenityToggle = (amenityId) => {
    if (selectedAmenities.includes(amenityId)) {
      // Remove amenity if already selected
      setSelectedAmenities(selectedAmenities.filter((id) => id !== amenityId))
    } else {
      // Add amenity if not selected
      setSelectedAmenities([...selectedAmenities, amenityId])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newHotel = {
      hotel_name: hotelName,
      hotel_location: hotelLocation,
      hotel_description: hotelDescription,
      hotel_price: hotelPrice,
      hotel_stars: hotelStars,
      hotel_rooms: hotelRooms,
      hotel_image: hotelImage,
      amenities: selectedAmenities,
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/hotels/addHotel",
        newHotel, {
          headers: { 'Content-Type': 'multipart/form-data' },
      }
      )
      console.log("Hotel added:", response.data)

      const hotelId = response.data._id

      navigate(`/hotels`)
    } catch (error) {
      console.error("Error adding hotel:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Hotel Name:</label>
      <input
        type="text"
        value={hotelName}
        onChange={(e) => setHotelName(e.target.value)}
        required
      />

      <label>Hotel Location:</label>
      <input
        type="text"
        value={hotelLocation}
        onChange={(e) => setHotelLocation(e.target.value)}
        required
      />

      <label>Hotel Description:</label>
      <textarea
        value={hotelDescription}
        onChange={(e) => setHotelDescription(e.target.value)}
      />

      <label>Hotel Price:</label>
      <input
        type="number"
        value={hotelPrice}
        onChange={(e) => setHotelPrice(e.target.value)}
        required
      />

      <label>Hotel Stars:</label>
      <input
        type="number"
        value={hotelStars}
        onChange={(e) => setHotelStars(e.target.value)}
        min="0"
        max="5"
      />

      <label>Hotel Rooms:</label>
      <input
        type="number"
        value={hotelRooms}
        onChange={(e) => setHotelRooms(e.target.value)}
        min="1"
        max="400"
      />

      <label>Hotel Image:</label>
      <input
        type="file"
        onChange={(e) => setHotelImage(e.target.files[0])}
      />

      <h3>Select Amenities:</h3>
      {amenities?.map((amenity) => (
        <div key={amenity._id}>
          <label>
            <input
              type="checkbox"
              checked={selectedAmenities.includes(amenity._id)}
              onChange={() => handleAmenityToggle(amenity._id)}
            />
            {amenity.amenity_name}
          </label>
        </div>
      ))}

      <button type="submit">Add Hotel</button>
    </form>
  )
}

export default AddHotel
