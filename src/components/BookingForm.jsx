import React, { useState } from "react"
import axios from "axios"
const BookingForm = ({ hotelDetails, user }) => {
  const initialState = {
    checkIn: "",
    checkOut: "",
    numberOfGuests: "",
    rooms: 1, // For rooms it must be min 1
  }
  const [bookingData, setBookingData] = useState(initialState)

  // function to handel Change the inputs
  const handleChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value })
  }
  // function to handel Submit the form

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const DataSubmited = {
        ...bookingData, // store data from the form
        hotelId: hotelDetails._id, // store hotelId
        hotelPrice: hotelDetails.hotel_price, // store hotel_price
        userId: user.id, // store userId
      }

      const response = await axios.post(
        "http://localhost:3001/hotels/booking",
        DataSubmited
      )
      console.log("data submited", response.data)

      console.log("Booking data submitted:", bookingData)
      setBookingData(initialState)
    } catch (error) {
      throw error
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Check-in Date:
          <input
            type="date"
            name="checkIn"
            value={bookingData.checkIn}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Check-out Date:
          <input
            type="date"
            name="checkOut"
            value={bookingData.checkOut}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Number of Rooms:
          <input
            type="number"
            name="rooms"
            value={bookingData.rooms}
            onChange={handleChange}
            min="1"
            max={hotelDetails.hotel_rooms}
            required
          />
        </label>
        <br />
        <label>
          Number Of Guests:
          <input
            type="number"
            name="numberOfGuests"
            value={bookingData.numberOfGuests}
            onChange={handleChange}
            min="1"
            required
          />
        </label>

        <button type="submit">Book Now</button>
      </form>
    </>
  )
}

export default BookingForm

//
