import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import BookingForm from "../components/BookingForm"
import axios from "axios"

const HotelDetails = ({ user }) => {
  const { hotelId } = useParams()
  const [HotelDetails, setHotelDetails] = useState([])
  const [Hotelamenities, setHotelamenities] = useState([])
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/hotels/details/${hotelId}`
        )
        setHotelDetails(response.data)
        setHotelamenities(response.data.amenities)
      } catch (error) {
        console.error(error)
      }
    }

    fetchHotelData()
  }, [hotelId, submitted])

  const handleRatingSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`http://localhost:3001/hotels/${hotelId}/rate`, {
        userId: user.id,
        rating,
        comment,
      })
      setRating(0)
      setComment("")
      setSubmitted(!submitted) // Trigger a re-fetch of hotel details
    } catch (error) {
      console.error(error)
    }
  }

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
                <span>⭐⭐⭐⭐⭐</span>
              ) : HotelDetails.hotel_stars === 4 ? (
                <span>⭐⭐⭐⭐</span>
              ) : HotelDetails.hotel_stars === 3 ? (
                <span>⭐⭐⭐</span>
              ) : HotelDetails.hotel_stars === 2 ? (
                <span>⭐⭐</span>
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
            <h3>Hotel Amenities</h3>
            <div className="amenity-list-details">
              {Hotelamenities.map((amenity) => (
                <div className="amenity-card" key={amenity._id}>
                  <img
                    src={`http://localhost:3001/${amenity.amenity_icon}`}
                    alt="AmenityIcon"
                    width="40px"
                    height="40px"
                  />
                  <p>{amenity.amenity_name}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="hotel-booking">
            <h3>Book Hotel</h3>
            <BookingForm hotelDetails={HotelDetails} />
          </section>

          <section className="hotel-reviews">
            <h3>Reviews</h3>
            {Array.isArray(HotelDetails.hotel_rating) &&
            HotelDetails.hotel_rating.length > 0 ? (
              HotelDetails.hotel_rating.map((review) => (
                <div key={review._id} className="review">
                  <p>
                    <strong>User:</strong>{" "}
                    {review.user ? review.user.name : "Anonymous"}
                  </p>
                  <p>
                    <strong>Rating:</strong> {review.rating} ⭐
                  </p>
                  <p>
                    <strong>Comment:</strong>{" "}
                    {review.comment || "No comment provided."}
                  </p>
                  <hr/>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </section>

          <section className="rating-form">
            <h3>Submit Your Rating</h3>
            <form onSubmit={handleRatingSubmit}>
              <div className="mb-3">
                <label htmlFor="rating">Rating:</label>
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  min="1"
                  max="5"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="comment">Comment:</label>
                <textarea
                  id="comment"
                  name="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit Rating
              </button>
            </form>
          </section>
        </div>
      ) : (
        <p>No hotels found.</p>
      )}
    </>
  )
}

export default HotelDetails
