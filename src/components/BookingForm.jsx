import React, { useState } from "react"

const BookingForm = ({ hotelDetails }) => {
  const [bookingData, setBookingData] = useState({
    checkIn: "",
    checkOut: "",
    rooms: 1, // For rooms it must be min 1
  })

  // function to handel Change the inputs
  const handleChange = (e) => {
    const { name, value } = e.target
    setBookingData({ ...bookingData, [name]: value })
  }
  // function to handel Submit the form

  const handleSubmit = (e) => {
    e.preventDefault()
    // API to do
    console.log("Booking data submitted:", bookingData)
  }

  return (
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
      <button type="submit">Book Now</button>
    </form>
  )
}

export default BookingForm
