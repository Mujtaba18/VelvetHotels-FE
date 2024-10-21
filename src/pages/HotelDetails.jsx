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
        setHotelDetails(response.data)
        console.log(response)
      } catch (error) {
        throw error
      }
    }

    fetchHotleData()
  }, [hotelId])

  return (
    <>
      <h1>HI</h1>
    </>
  )
}
export default HotelDetails
