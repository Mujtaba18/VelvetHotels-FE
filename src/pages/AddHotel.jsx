import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddHotel = () => {
  const [hotelData, setHotelData] = useState({
    hotel_name: '',
    hotel_location: '',
    hotel_description: '',
    hotel_price: '',
    hotel_rating: '',
    hotel_image: ''
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setHotelData({ ...hotelData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        'http://localhost:3001/hotels/addHotel',
        hotelData
      )
      console.log('Hotel added:', response.data)

      navigate('/hotels')
    } catch (error) {
      console.error('Error adding hotel:', error)
    }
  }

  return (
    <div>
      <h2>Add a New Hotel</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="hotel_name"
          value={hotelData.hotel_name}
          onChange={handleChange}
          placeholder="Hotel Name"
          required
        />
        <input
          type="text"
          name="hotel_location"
          value={hotelData.hotel_location}
          onChange={handleChange}
          placeholder="Hotel Location"
          required
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
          required
        />
        <input
          type="number"
          name="hotel_rating"
          value={hotelData.hotel_rating}
          onChange={handleChange}
          placeholder="Hotel Rating"
          min="0"
          max="5"
        />
        <input
          type="text"
          name="hotel_image"
          value={hotelData.hotel_image}
          onChange={handleChange}
          placeholder="Hotel Image URL"
          required
        />
        <button type="submit">Add Hotel</button>
      </form>
    </div>
  )
}

export default AddHotel
