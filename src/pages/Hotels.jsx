import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
const Hotels = () => {
  const [hotels, setHotels] = useState([])
  const [sortOrder, setSortOrder] = useState("low-high") //useState to handle sort order
  const [sortBy, setSortBy] = useState("price") // useState to manage what to sort
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
    if (sortBy === "price") {
      // Compare between them and sort based on the result
      // In case result is negative (-), it means 'a' should come before 'b' in the sorted order.
      // In case result is positive (+), it means 'b' should come before 'a' in the sorted order.
      return sortOrder === "low-high"
        ? a.hotel_price - b.hotel_price // Sort by price low to high
        : b.hotel_price - a.hotel_price // Sort by price high to low
    } else {
      // sortBy is rate
      return sortOrder === "low-high"
        ? a.hotel_rating - b.hotel_rating
        : b.hotel_rating - a.hotel_rating
    }
  })

  return (
    <div>
      <h1>Hotels</h1>
      <div>
        <label htmlFor="sortBy">Sort by:</label>

        <select
          id="sortBy"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)} //handel change the sort
        >
          <option value="price">Price</option>
          <option value="rating">Rating</option>
        </select>
        <label htmlFor="sortOrder">Order:</label>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)} //handel change the order
        >
          <option value="low-high">Low to High</option>
          <option value="high-low">High to Low</option>
        </select>
      </div>

      {sortedHotels.length > 0 ? (
        <div className="card-flex">
          {sortedHotels.map((hotel) => (
            <Link
              to={`/hotels/detalis/${hotel._id}`}
              key={hotel._id}
              className="link-hotel"
            >
              <div key={hotel._id} className="card-hotel">
                <h2>{hotel.hotel_name}</h2>
                <img
                  src={hotel.hotel_image}
                  alt={hotel.hotel_name}
                  width="300"
                />
                <p>{hotel.hotel_location}</p>
                <p>{hotel.hotel_description}</p>
                <p>Price: ${hotel.hotel_price}</p>
                <p>Rating: {hotel.hotel_rating}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>No hotels found.</p>
      )}
    </div>
  )
}

export default Hotels
