import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const Hotels = ({ user }) => {
  const [hotels, setHotels] = useState([])
  const [sortOrder, setSortOrder] = useState("low-high")
  const [sortBy, setSortBy] = useState("price")
  const [ratingAverage, setRatingAverage] = useState({})

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
  // Handle hotel deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/hotels/deleteHotel/${id}`)
      fetchHotels() // Re-fetch the updated list after deletion
    } catch (error) {
      console.error("Error deleting hotel:", error)
    }
  }

  useEffect(() => {
    const calculateRatingAverages = () => {
      const averages = hotels.reduce((acc, hotel) => {
        const average =
          hotel.hotel_rating.length > 0
            ? (
                hotel.hotel_rating.reduce(
                  (acc, review) => acc + review.rating,
                  0
                ) / hotel.hotel_rating.length
              ).toFixed(1)
            : "No ratings yet"
        return { ...acc, [hotel._id]: average }
      }, {})

      setRatingAverage(averages)
    }

    calculateRatingAverages()
  }, [hotels])

  const sortedHotels = [...hotels].sort((a, b) => {
    if (sortBy === "price") {
      return sortOrder === "low-high"
        ? a.hotel_price - b.hotel_price
        : b.hotel_price - a.hotel_price
    } else if (sortBy === "rating") {
      const averageRatingA =
        a.hotel_rating.length > 0
          ? a.hotel_rating.reduce((acc, review) => acc + review.rating, 0) /
            a.hotel_rating.length
          : 0
      const averageRatingB =
        b.hotel_rating.length > 0
          ? b.hotel_rating.reduce((acc, review) => acc + review.rating, 0) /
            b.hotel_rating.length
          : 0

      return sortOrder === "low-high"
        ? averageRatingA - averageRatingB
        : averageRatingB - averageRatingA
    }
  })

  return (
    <>
      {user ? (
        <>
          {user.role === "admin" ? (
            <div>
              <div>
                <h1>Hotels</h1>
                <div className="sort-list">
                  <label htmlFor="sortBy">Sort by:</label>
                  <select
                    id="sortBy"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="price">Price</option>
                    <option value="rating">Rating</option>
                  </select>
                  <label htmlFor="sortOrder">Order:</label>
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
                  <table className="table table-striped container">
                    <thead>
                      <tr>
                        <th>Hotel Name</th>
                        <th>Location</th>
                        <th>Price</th>
                        <th>Rooms</th>
                        <th>Rating</th>
                        <th>Amenities</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedHotels.map((hotel) => (
                        <tr key={hotel._id}>
                          <td>
                            <Link
                              to={`/hotels/details/${hotel._id}`}
                              className="link-hotel"
                            >
                              {hotel.hotel_name}
                            </Link>
                          </td>
                          <td>{hotel.hotel_location}</td>
                          <td>${hotel.hotel_price}</td>
                          <td>{hotel.hotel_rooms}</td>
                          <td>{ratingAverage[hotel._id]}</td>
                          <td>
                            {hotel.amenities.map((amenity) => (
                              <div key={amenity._id} className="amenity-card">
                                <img
                                  src={`http://localhost:3001/${amenity.amenity_icon}`}
                                  alt={amenity.amenity_name}
                                  width="30"
                                  height="30"
                                />
                                <span>{amenity.amenity_name}</span>
                              </div>
                            ))}
                          </td>
                          <td>
                            {" "}
                            <button onClick={() => handleDelete(hotel._id)}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No hotels found.</p>
                )}
              </div>
            </div>
          ) : user.role === "user" ? (
            <div>
              <div>
                <h1>Hotels</h1>
                <div className="sort-list">
                  <label htmlFor="sortBy">Sort by:</label>

                  <select
                    id="sortBy"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="price">Price</option>
                    <option value="rating">Rating</option>
                  </select>
                  <label htmlFor="sortOrder">Order:</label>
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
                  <div className="hotels-list">
                    {sortedHotels.map((hotel) => (
                      <Link
                        to={`/hotels/details/${hotel._id}`}
                        key={hotel._id}
                        className="link-hotel"
                      >
                        <div className="hotels-card" key={hotel._id}>
                          <div className="hotel-container">
                            <div className="hotels-img-info">
                              {hotel.hotel_rooms === 0 ? (
                                <p id="hotel-isfull">Hotel is full</p>
                              ) : null}
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
                                <div
                                  id={`carousel-${hotel._id}`}
                                  className="carousel slide container"
                                  data-bs-ride="carousel"
                                  data-bs-interval="3000"
                                >
                                  <div className="carousel-inner">
                                    {hotel.hotel_images.map((image, index) => (
                                      <div
                                        key={index}
                                        className={`carousel-item ${
                                          index === 0 ? "active" : ""
                                        }`}
                                      >
                                        <img
                                          className="d-block"
                                          src={`http://localhost:3001/${image}`}
                                          alt={hotel.hotel_name}
                                          width="200"
                                          height="120"
                                        />
                                      </div>
                                    ))}
                                  </div>
                                  <button
                                    className="carousel-control-prev"
                                    type="button"
                                    data-bs-target={`#carousel-${hotel._id}`}
                                    data-bs-slide="prev"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <span
                                      className="carousel-control-prev-icon"
                                      aria-hidden="true"
                                    ></span>
                                  </button>
                                  <button
                                    className="carousel-control-next"
                                    type="button"
                                    data-bs-target={`#carousel-${hotel._id}`}
                                    data-bs-slide="next"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <span
                                      className="carousel-control-next-icon"
                                      aria-hidden="true"
                                    ></span>
                                  </button>
                                </div>
                                <div className="hotels-info-n">
                                  <p>
                                    <strong>Location: </strong>{" "}
                                    {hotel.hotel_location}
                                  </p>
                                  <p>
                                    <strong>Price: </strong> $
                                    {hotel.hotel_price}
                                  </p>
                                  <p>
                                    <strong>Rooms: </strong> {hotel.hotel_rooms}
                                  </p>
                                  <p>
                                    <strong>Rating:</strong>{" "}
                                    {hotel.hotel_rating.length > 0
                                      ? (
                                          hotel.hotel_rating.reduce(
                                            (acc, review) =>
                                              acc + review.rating,
                                            0
                                          ) / hotel.hotel_rating.length
                                        ).toFixed(1)
                                      : "No ratings yet"}
                                  </p>
                                </div>
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
            </div>
          ) : (
            <div>
              <h2>What is this user role?</h2>
            </div>
          )}
        </>
      ) : (
        <div>
          <h2>Please log in.</h2>
        </div>
      )}
    </>
  )
}

export default Hotels
