import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const MyBooking = ({ user }) => {
  let navigate = useNavigate()
  const [booking, setBookings] = useState([])

  useEffect(() => {
    if (!user) {
      navigate("/")
    }
    const fetchBooking = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/hotels/mybooking/${user.id}`
        )
        setBookings(response.data)
        console.log(response)
      } catch (error) {
        console.error("Error fetching my booking:", error)
      }
    }

    fetchBooking()
  }, [user.id])

  return user ? (
    <div className="bookings">
      <div className="mt-2 bookings-table ">
        <h1 className="text-center">My Bookings</h1>
        {booking.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Hotel</th>
                <th>Check-In</th>
                <th>Check-Out</th>
                <th>Guests</th>
                <th>Rooms booked</th>
                <th>Price per room</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Booking Date</th>
              </tr>
            </thead>
            <tbody>
              {booking.map((data, i) => (
                <tr key={data._id}>
                  <td>{i + 1}</td>
                  <td>{data.hotel.hotel_name}</td>
                  <td>{new Date(data.checkInDate).toLocaleDateString()}</td>
                  <td>{new Date(data.checkOutDate).toLocaleDateString()}</td>
                  <td>{data.numberOfGuests}</td>
                  <td>{data.rooms}</td>
                  <td>${data.hotel.hotel_price.toFixed(2)}</td>
                  <td>${data.totalPrice.toFixed(2)}</td>
                  <td>
                    {data.bookingStatus === "confirmed" ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            color: "green",
                            fontSize: "24px",
                            marginRight: "5px",
                          }}
                        >
                          ●
                        </span>

                        <p>{data.bookingStatus}</p>
                      </div>
                    ) : (
                      <span style={{ color: "red" }}>●</span>
                    )}
                  </td>
                  <td>{new Date(data.bookingDate).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center">No bookings found.</p>
        )}
      </div>
    </div>
  ) : (
    <div className="text-center">
      <h3>Oops! You must be signed in to do that!</h3>
      <button onClick={() => navigate("/signin")}>Sign In</button>
    </div>
  )
}

export default MyBooking
