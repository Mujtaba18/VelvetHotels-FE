import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"

const HotelDetails = () => {
  //
  const { hotelId } = useParams()
  const [HotelDetails, setHotelDetails] = useState([])
  const [HotelName, setHotel] = useState("")

  useEffect(() => {
    const fetchHotleData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/hotels/details/${hotelId}`
        )
        setHotelDetails(response.data) // store data in HotelDetails
        console.log(response)
      } catch (error) {
        throw error
      }
    }

    fetchHotleData()
  }, [hotelId])

  return (
    <>
      {HotelDetails ? (
        <div className="">
          <div className="" key={HotelDetails._id}>
            <h2>{HotelDetails.hotel_name}</h2>
            <img
              src={HotelDetails.hotel_image}
              alt={HotelDetails.hotel_name}
              width="300"
            />
            <p>
              <strong>Location:</strong> {HotelDetails.hotel_location}
            </p>
            <p>
              <strong>Description:</strong> {HotelDetails.hotel_description}
            </p>
            <p>
              <strong>Price:</strong> ${HotelDetails.hotel_price}
            </p>
            <p>
              <strong>Rating:</strong> {HotelDetails.hotel_rating}
            </p>
          </div>
        </div>
      ) : (
        <p>No hotels found.</p>
      )}
    </>
  )
}
export default HotelDetails
