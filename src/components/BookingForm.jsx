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
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
      <h3 className="mb-4">Booking Information</h3>

      <div className="mb-3">
        <label htmlFor="checkIn" className="form-label">
          Check-in Date:
        </label>
        <input
          type="date"
          name="checkIn"
          value={bookingData.checkIn}
          onChange={handleChange}
          className="form-control"
          required
          id="checkIn"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="checkOut" className="form-label">
          Check-out Date:
        </label>
        <input
          type="date"
          name="checkOut"
          value={bookingData.checkOut}
          onChange={handleChange}
          className="form-control"
          required
          id="checkOut"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="rooms" className="form-label">
          Number of Rooms:
        </label>
        <input
          type="number"
          name="rooms"
          value={bookingData.rooms}
          onChange={handleChange}
          min="1"
          max={hotelDetails.hotel_rooms}
          className="form-control"
          required
          id="rooms"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Book Now
      </button>
    </form>
  )
}

export default BookingForm
