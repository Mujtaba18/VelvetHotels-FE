import { useNavigate } from "react-router-dom"
import HotelSearch from "../components/HotelSearch"
import React, { useState } from "react"
import axios from "axios"

const Home = () => {
  let navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [hotels, setHotels] = useState([])

  const handleSearch = async (event) => {
    event.preventDefault() // Prevent default form submission
    try {
      const response = await axios.get(
        `http://localhost:3001/hotels/search?name=${searchTerm}`
      )
      setHotels(response.data)
      console.log(response)
    } catch (error) {
      console.error("Error fetching hotels:", error)
    }
  }

  const handleChange = (event) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div>
      <section>
        <HotelSearch
          onChange={handleChange}
          value={searchTerm}
          onSubmit={handleSearch}
        />

        <button onClick={() => navigate("/signin")}>
          Click Here To Get Started
        </button>
        <div>
          {hotels.length > 0 ? (
            <div className="card-flex">
              {hotels.map((hotel) => (
                <div key={hotel._id} className="card-hotel">
                  <h2>{hotel.hotel_name}</h2>
                  <p>{hotel.hotel_description}</p>
                  <p>{hotel.hotel_location}</p>
                  <p>Price: ${hotel.hotel_price}</p>
                  <p>Rating: {hotel.hotel_rating}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No data available</p> // Message when no hotels are found
          )}
        </div>
      </section>
    </div>
  )
}

export default Home
