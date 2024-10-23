import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import BookingForm from "../components/BookingForm"
import axios from "axios"

const HotelDetails = () => {
  const { hotelId } = useParams()
  const navigate = useNavigate()
  const [hotelDetails, setHotelDetails] = useState(null)
  const [hotelData, setHotelData] = useState({})
  const [editMode, setEditMode] = useState(false)
  const [newPic, setNewPic] = useState(null)
  const [hotelAmenities, setHotelAmenities] = useState([])

  useEffect(() => {
    const fetchHotelData = async () => {
      console.log(hotelId)
      try {
        const response = await axios.get(
          `http://localhost:3001/hotels/details/${hotelId}`
        )
        setHotelDetails(response.data)
        setHotelData(response.data)
        setHotelAmenities(response.data.amenities || [])
        console.log(response)
      } catch (error) {
        console.error("Error fetching hotel data:", error)
      }
    }

    fetchHotelData()
  }, [hotelId])

  const handleChange = (e) => {
    const { name, value } = e.target
    setHotelData({ ...hotelData, [name]: value })
  }

  const handlePicChange = (e) => {
    const file = e.target.files[0]
    setNewPic(file)
  }

  const handleSave = async () => {
    try {
      const formData = new FormData()
      formData.append("hotel_name", hotelData.hotel_name)
      formData.append("hotel_location", hotelData.hotel_location)
      formData.append("hotel_description", hotelData.hotel_description)
      formData.append("hotel_price", hotelData.hotel_price)
      formData.append("hotel_stars", hotelData.hotel_stars)
      if (newPic) {
        formData.append("hotel_image", newPic)
      }
      const res = await axios.put(
        `http://localhost:3001/hotels/${hotelDetails._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      setHotelDetails(res.data)
      setHotelData(res.data)
      setEditMode(false)
    } catch (error) {
      console.error("Error updating hotel:", error)
    }
  }

  return (
    <>
      {hotelDetails ? (
        <div className="hotel-details" key={hotelDetails._id}>
          <h1>{editMode ? "Edit Hotel" : "Hotel Details"}</h1>
          <img
            src={`http://localhost:3001/${hotelData.hotel_image}`}
            alt={hotelData.hotel_name}
            width="300"
          />
          {editMode ? (
            <>
              <input
                type="text"
                name="hotel_name"
                value={hotelData.hotel_name}
                onChange={handleChange}
                placeholder="Hotel Name"
              />
              <input
                type="text"
                name="hotel_location"
                value={hotelData.hotel_location}
                onChange={handleChange}
                placeholder="Hotel Location"
              />
              <input
                type="text"
                name="hotel_description"
                value={hotelData.hotel_description}
                onChange={handleChange}
                placeholder="Hotel Description"
              />
              <input
                type="number"
                name="hotel_price"
                value={hotelData.hotel_price}
                onChange={handleChange}
                placeholder="Hotel Price"
              />
              <select
                name="hotel_stars"
                value={hotelData.hotel_stars}
                onChange={handleChange}
              >
                <option value="">Select Star</option>
                <option value="5">⭐⭐⭐⭐⭐</option>
                <option value="4">⭐⭐⭐⭐</option>
                <option value="3">⭐⭐⭐</option>
                <option value="2">⭐⭐</option>
                <option value="1">⭐</option>
              </select>
              <input type="file" onChange={handlePicChange} />
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setEditMode(false)}>Cancel</button>
            </>
          ) : (
            <>
              <p>
                <strong>Hotel Name:</strong> {hotelData.hotel_name}
              </p>
              <p>
                <strong>Location:</strong> {hotelData.hotel_location}
              </p>
              <p>
                <strong>Description:</strong> {hotelData.hotel_description}
              </p>
              <p>
                <strong>Price:</strong> ${hotelData.hotel_price}
              </p>
              <p>
                <strong>Stars:</strong> {hotelData.hotel_stars}
              </p>
              <button onClick={() => setEditMode(true)}>Edit Hotel</button>
            </>
          )}
          <section className="hotel-amenities">
            <h3>Amenities</h3>
            <div className="amenity-list-details">
              {hotelAmenities.map((amenity) => (
                <div className="amenity-card" key={amenity._id}>
                  <img
                    src={`http://localhost:3001/${amenity.amenity_icon}`}
                    alt={amenity.amenity_name}
                    width="30"
                    height="30"
                  />
                  <p>{amenity.amenity_name}</p>
                </div>
              ))}
            </div>
          </section>
          <section className="hotel-booking">
            <h3>Book Hotel</h3>
            <BookingForm hotelDetails={hotelData} />
          </section>
        </div>
      ) : (
        <p>No hotel found.</p>
      )}
    </>
  )
}

export default HotelDetails
