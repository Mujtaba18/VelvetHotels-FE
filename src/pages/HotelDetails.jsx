import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import BookingForm from "../components/BookingForm"
import axios from "axios"

const HotelDetails = ({ user }) => {
  //
  const { hotelId } = useParams()
  const [HotelDetails, setHotelDetails] = useState([])
  const [Hotelamenities, setHotelamenities] = useState([])

  const [HotelName, setHotel] = useState("")

  useEffect(() => {
    const fetchHotleData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/hotels/details/${hotelId}`
        )
        setHotelDetails(response.data) // store data in HotelDetails
        setHotelamenities(response.data.amenities) // store Hotel amenities

        console.log(response.data.amenities)
      } catch (error) {
        throw error
      }
    }

    fetchHotleData()
  }, [hotelId])

  return (
    <>
      {HotelDetails ? (
        <div className="hotel-details" key={HotelDetails._id}>
          <h2>{HotelDetails.hotel_name}</h2>
          <img
            src={`http://localhost:3001/${HotelDetails.hotel_image}`}
            alt={HotelDetails.hotel_name}
            width="300"
          />

          <section className="hotel-info">
            <h3>Hotel Information</h3>
            <p>
              <strong>Hotel Name:</strong> {HotelDetails.hotel_name}
            </p>
            <p>
              <strong>Location:</strong> {HotelDetails.hotel_location}
            </p>
            <p>
              <strong>Stars:</strong>
              {HotelDetails.hotel_stars === 5 ? (
                <>
                  <span>⭐⭐⭐⭐⭐</span>
                </>
              ) : HotelDetails.hotel_stars === 4 ? (
                <>
                  <span>⭐⭐⭐⭐</span>
                </>
              ) : HotelDetails.hotel_stars === 3 ? (
                <>
                  <span>⭐⭐⭐</span>
                </>
              ) : HotelDetails.hotel_stars === 2 ? (
                <>
                  <span>⭐⭐</span>
                </>
              ) : HotelDetails.hotel_stars === 1 ? (
                <span>⭐</span>
              ) : (
                <span>Not Rated</span>
              )}
            </p>
            <p>
              <strong>Available Rooms:</strong> {HotelDetails.hotel_rooms}
            </p>
            <p>
              <strong>Price Per Room:</strong> ${HotelDetails.hotel_price}
            </p>
          </section>

          <section className="hotel-description">
            <h3>Description</h3>
            <p>{HotelDetails.hotel_description}</p>
          </section>

          <section>
            <h3>Hotel Amenities </h3>

            <div className="amenity-list-details">
              {Hotelamenities.map((amenity) => (
                <div className="amenity-card" key={amenity._id}>
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
          </section>

          <section className="hotel-booking">
            <h3>Book Hotel</h3>
            {HotelDetails.hotel_rooms > 0 ? (
              <BookingForm hotelDetails={HotelDetails} user={user} />
            ) : (
              <div className="hotel-full">
                <p className="hotel-booking">Sorry, the hotel is full</p>
              </div>
            )}
          </section>

          <section className="hotel-reviews">
            <h3>Reviews</h3>
            {/* ALi but here component for reviews  */}
          </section>
        </div>
      ) : (
        <p>No hotels found.</p>
      )}
    </>
  )
}
export default HotelDetails
