import React, { useEffect, useState } from "react"
import axios from "axios"
const Hotels = () => {
  const [hotels, setHotels] = useState([])
  const [sortOrder, setSortOrder] = useState("low-high") //useState to handle price sort

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

  // Function to handle sorting
  const sortedHotels = [...hotels].sort((a, b) => {
    if (sortOrder === "low-high") {
      return a.hotel_price - b.hotel_price // Sort by price low to high
    } else {
      return b.hotel_price - a.hotel_price // Sort by price high to low
    }
  })

  return (
    <div>
      <h1>Hotels</h1>
      <div>
        <label htmlFor="sortOrder">Sort by price:</label>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="low-high">Low to High</option>
          <option value="high-low">High to Low</option>
        </select>
      </div>
      {sortedHotels.length > 0 ? (
        <ul>
          {sortedHotels.map((hotel) => (
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
