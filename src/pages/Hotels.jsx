import React, { useEffect, useState } from "react"

const Hotels = () => {
  const [hotels, setHotels] = useState([])

  useEffect(() => {
    fetch("http://localhost:3001/hotels/getHotels")
      .then((res) => res.json())
      .then((data) => setHotels(data))
      .catch((error) => console.error("Error fetching hotels:", error))
  }, [])

  return (
    <div>
      <h1>Hotels</h1>
      {hotels.length > 0 ? (
        <>
          {hotels.map((hotel) => (
            <div key={hotel._id}>
              <h2>{hotel.hotel_name}</h2>
              <img src={`${hotel.hotel_image}`} alt={hotel.hotel_name} width="300" />
              <p>{hotel.hotel_location}</p>
              <p>{hotel.hotel_description}</p>
              <p>Price: ${hotel.hotel_price}</p>
              <p>Rating: {hotel.hotel_rating}</p>
            </div>
          ))}
        </>
      ) : (
        <p>No hotels found.</p>
      )}
    </div>
  )
}

export default Hotels
