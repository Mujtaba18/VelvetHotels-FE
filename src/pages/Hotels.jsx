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
      <div className="sort-list">
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
        <div className="hotels-list">
          {sortedHotels.map((hotel) => (
            <Link
              to={`/hotels/details/${hotel._id}`}
              key={hotel._id}
              className="link-hotel"
            >
              <div className="hotels-card" key={hotel._id}>
                <div className="hotels-img-info">
                  <img
                    className="hotels-img"
                    src={`http://localhost:3001/${hotel.hotel_image}`}
                    alt={hotel.hotel_name}
                    width="300"
                  />
                  <div className="hotels-info">
                    <div className="hotels-name">
                      <h2>{hotel.hotel_name}</h2>
                      <p>
                          {hotel.hotel_stars === 5 ? (
                            <>
                              <span>⭐⭐⭐⭐⭐</span>
                            </>
                          ) : hotel.hotel_stars === 4 ? (
                            <>
                              <span>⭐⭐⭐⭐</span>
                            </>
                          ) : hotel.hotel_stars === 3 ? (
                            <>
                              <span>⭐⭐⭐</span>
                            </>
                          ) : hotel.hotel_stars === 2 ? (
                            <>
                              <span>⭐⭐</span>
                            </>
                          ) : hotel.hotel_stars === 1 ? (
                            <span>⭐</span>
                          ) : (
                            <span>Not Rated</span>
                          )}
                        </p>
                    </div>
                    <div className="hotels-info-n">
                    <p><strong>Location: </strong> {hotel.hotel_location}</p>
                      <p><strong>Price: </strong> ${hotel.hotel_price}</p>
                      <p><strong>Rooms: </strong> {hotel.hotel_rooms}</p>
                      <p><strong>Rating: </strong> {hotel.hotel_rating}</p>
                    </div>
                  </div>
                </div>
                <div className="amenity-list">
                  {hotel.amenities.map((amenity) => (
                    <div className="amenity-card">
                      <img
                        src={`http://localhost:3001/${amenity.amenity_icon}`}
                        alt="AmenityIcon"
                        width="30px"
                        height="30px"
                      />
                      <p>{amenity.amenity_name}</p>
                    </div>
                  ))}
                </div>
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
