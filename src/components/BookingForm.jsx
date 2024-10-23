import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
const BookingForm = ({ hotelDetails, user }) => {
  const [message, setmessage] = useState("") // State for error message

  let navigate = useNavigate()
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

    // Check if checkOut is after checkIn
    if (new Date(bookingData.checkOut) <= new Date(bookingData.checkIn)) {
      setmessage("Check-out must be after check-in")
      setTimeout(() => {
        setmessage("")
      }, 4500)

      return // Do not submit
    }
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
      console.log("data", response.data)
      console.log("Booking data submitted:", bookingData)

      navigate(`/hotels/mybooking`)
      setBookingData(initialState)
    } catch (error) {
      throw error
    }
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
      <div className="mb-3">
      <label htmlFor="numberOfGuests" className="form-label">Number Of Guests:</label>
        <input
          type="number"
          name="numberOfGuests"
          value={bookingData.numberOfGuests}
          onChange={handleChange}
          min="1"
          className="form-control"
          required
        />

      </div>
      <button type="submit" className="btn btn-primary">
        Book Now
      </button>
      {message && <div className="message">{message}</div>}
    </form>
  )
}

export default BookingForm

//
