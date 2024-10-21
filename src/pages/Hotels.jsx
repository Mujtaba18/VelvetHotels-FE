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
        console.log(response.data)
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
        <div className="hotels-list">
          {hotels.map((hotel) => (
            <div className="hotels-card" key={hotel._id}>
              <div className="hotels-img-info">
                <img className="hotels-img" src={`http://localhost:3001/${hotel.hotel_image}`} alt={hotel.hotel_name} width="300" />
                <div className="hotels-info">
                  <h2>{hotel.hotel_name}</h2>
                  <p>Location: {hotel.hotel_location}</p>
                  <p>Description: {hotel.hotel_description}</p>
                  <div className="hotels-info-n">
                    <p>Price: ${hotel.hotel_price}</p>
                    <p>Rooms: {hotel.hotel_rooms}</p>
                    <p>Stars: {hotel.hotel_stars}</p>
                    <p>Rating: {hotel.hotel_rating}</p>
                  </div>
                </div>
              </div>
              <div className="amenity-list">
                    {hotel.amenities.map((amenity) => (
                      <div className="amenity-card">
                        <img src={`http://localhost:3001/${amenity.amenity_icon}`} alt="AmenityIcon" width="30px" height="30px" />
                        <p>{amenity.amenity_name}</p>
                      </div>
                    ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No hotels found.</p>
      )}
    </div>
  )
}

export default Hotels
