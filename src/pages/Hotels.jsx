import React, { useEffect, useState } from "react"
import axios from "axios"
const Hotels = () => {
  const [hotels, setHotels] = useState([])

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/hotels/getHotels"
        )
        setHotels(response.data)
      } catch (error) {
        console.error("Error fetching hotels:", error)
      }
    }

    fetchHotels()
  }, [])

  return (
    <div>
      <h1>Hotels</h1>
      {hotels.length > 0 ? (
        <ul>
          {hotels.map((hotel) => (
            <li key={hotel._id}>
              <h2>{hotel.hotel_name}</h2>
              <img src={hotel.hotel_image} alt={hotel.hotel_name} width="300" />
              <p>{hotel.hotel_location}</p>
              <p>{hotel.hotel_description}</p>
              <p>Price: ${hotel.hotel_price}</p>
              <p>Rating: {hotel.hotel_rating}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hotels found.</p>
      )}
    </div>
  )
}

export default Hotels
