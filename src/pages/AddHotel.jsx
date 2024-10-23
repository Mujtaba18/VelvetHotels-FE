import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const AddHotel = () => {
  const [hotelName, setHotelName] = useState("")
  const [hotelLocation, setHotelLocation] = useState("")
  const [hotelDescription, setHotelDescription] = useState("")
  const [hotelPrice, setHotelPrice] = useState(0)
  const [hotelStars, setHotelStars] = useState(0)
  const [hotelRooms, setHotelRooms] = useState(0)
  const [hotelImage, setHotelImage] = useState(null)
  const [amenities, setAmenities] = useState([])
  const [selectedAmenities, setSelectedAmenities] = useState([])
  const [hotelImages, setHotelImages] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const response = await axios.get(
          "https://velvethotels-be.onrender.com/hotels/getAmenities"
        )
        setAmenities(response.data)
      } catch (error) {
        console.error("Error fetching amenities:", error)
      }
    }

    fetchAmenities()
  }, [])

  const handleAmenityToggle = (amenityId) => {
    if (selectedAmenities.includes(amenityId)) {
      setSelectedAmenities(selectedAmenities.filter((id) => id !== amenityId))
    } else {
      setSelectedAmenities([...selectedAmenities, amenityId])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData();
    formData.append('hotel_name', hotelName);
    formData.append('hotel_location', hotelLocation);
    formData.append('hotel_description', hotelDescription);
    formData.append('hotel_price', hotelPrice);
    formData.append('hotel_stars', hotelStars);
    formData.append('hotel_rooms', hotelRooms);
    formData.append('hotel_image', hotelImage);
    selectedAmenities.forEach((amenity) => formData.append('amenities', amenity));
  
    hotelImages.forEach((image) => {
      formData.append('hotel_images', image);
    });

    try {
      const response = await axios.post(
        "https://velvethotels-be.onrender.com/hotels/addHotel",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      console.log("Hotel added:", response.data)
      navigate(`/hotels`)
    } catch (error) {
      console.error("Error adding hotel:", error)
    }
  }

  return (
    <div className="container mt-2">
      <h2 className="mb-4">Add Hotel</h2>
      <form onSubmit={handleSubmit} className="card p-4">
        <div className="form-group mb-3">
          <label>Hotel Name:</label>
          <input
            type="text"
            className="form-control"
            value={hotelName}
            onChange={(e) => setHotelName(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Hotel Location:</label>
          <input
            type="text"
            className="form-control"
            value={hotelLocation}
            onChange={(e) => setHotelLocation(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Hotel Description:</label>
          <textarea
            className="form-control"
            value={hotelDescription}
            onChange={(e) => setHotelDescription(e.target.value)}
            rows="3"
          />
        </div>

        <div className="form-group mb-3">
          <label>Hotel Price:</label>
          <input
            type="number"
            className="form-control"
            value={hotelPrice}
            onChange={(e) => setHotelPrice(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Hotel Stars:</label>
          <input
            type="number"
            className="form-control"
            value={hotelStars}
            onChange={(e) => setHotelStars(e.target.value)}
            min="0"
            max="5"
          />
        </div>

        <div className="form-group mb-3">
          <label>Hotel Rooms:</label>
          <input
            type="number"
            className="form-control"
            value={hotelRooms}
            onChange={(e) => setHotelRooms(e.target.value)}
            min="1"
            max="400"
          />
        </div>

        <div className="form-group mb-3">
          <label>Hotel Image:</label>
          <input
            type="file"
            className="form-control-file"
            onChange={(e) => setHotelImage(e.target.files[0])}
          />
        </div>

        <div className="form-group mb-3">
          <label>Additional Hotel Images:</label>
          <input
            type="file"
            className="form-control-file"
            multiple
            onChange={(e) => setHotelImages([...e.target.files])}
          />
        </div>

        <h3 className="mb-3">Select Amenities:</h3>
        <div className="card">
          <div className="card-body">
            <div className="row">
              {amenities?.map((amenity) => (
                <div
                  key={amenity._id}
                  className="col-md-4 col-12 mb-3 d-flex justify-content-center"
                >
                  <div className="form-check d-flex align-items-center">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      checked={selectedAmenities.includes(amenity._id)}
                      onChange={() => handleAmenityToggle(amenity._id)}
                      id={`amenity-${amenity._id}`}
                    />
                    <img
                      src={`https://velvethotels-be.onrender.com/${amenity.amenity_icon}`}
                      alt="AmenityIcon"
                      width="40px"
                      height="40px"
                      className="me-2"
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`amenity-${amenity._id}`}
                    >
                      {amenity.amenity_name}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Add Hotel
        </button>
      </form>
    </div>
  )
}

export default AddHotel
