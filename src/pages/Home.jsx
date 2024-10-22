import { useNavigate } from "react-router-dom"
import HotelSearch from "../components/HotelSearch"
import React, { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import Slideshow from "../components/Slideshow"

const Home = () => {
  let navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [hotels, setHotels] = useState([])

  const images = [
    {
      src: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia-magazine.trivago.com%2Fwp-content%2Fuploads%2F2019%2F08%2F22111257%2Flas-vegas-strip-hotels.jpeg&f=1&nofb=1&ipt=46cb5f012ccefa3480b11860f22e1c35ffe7a5d034d5c21bcfbffd8771a71d31&ipo=images",
      alt: "Slide 1",
      caption: "Legendary Las Vegas Strip Hotels",
    },
    {
      src: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fa.mktgcdn.com%2Fp%2Fhl7bpTD9NyoLXK1wVpbUcjDQL9X_ALRYY6IdVfR1SaY%2F3840x2560.jpg&f=1&nofb=1&ipt=33582f79cbea66a96b6c7d7afeede9ea1c6f9db355b82d4a4d46a8d21fb19554&ipo=images",
      alt: "Slide 2",
      caption: "Relax at our luxury hotel",
    },
    {
      src: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.hospitalitynet.org%2Fpicture%2F153086534.jpg&f=1&nofb=1&ipt=b78c8d3b63cec2982c860cef49c3a89a99415932087cb7aefde170d1ebcdc157&ipo=images",
      alt: "Slide 3",
      caption: "Enjoy our Pool Swimming",
    },
  ]

  const handleSearch = async (event) => {
    event.preventDefault() // Prevent default form submission
    try {
      const response = await axios.get(
        `http://localhost:3001/hotels/search?name=${searchTerm}`
      )
      setHotels(response.data)
      console.log(response)
    } catch (error) {
      console.error("Error fetching hotels:", error)
    }
  }

  const handleChange = (event) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div className="home">
      <section>
        <div>
          <HotelSearch
            onChange={handleChange}
            value={searchTerm}
            onSubmit={handleSearch}
          />
        </div>
        <div>
          <div className="hotels-list mt-4">
            {hotels.map((hotel) => (
              <Link
                to={`/hotels/details/${hotel._id}`}
                key={hotel._id}
                className="link-hotel"
              >
                <div className="hotels-card" key={hotel._id}>
                  <div className="hotels-img-info">
                    <img
                      className="hotels-img"
                      src={`http://localhost:3001/${hotel.hotel_image}`}
                      alt={hotel.hotel_name}
                      width="300"
                    />
                    <div className="hotels-info">
                      <h2>{hotel.hotel_name}</h2>
                      <p><strong>Location: </strong>{hotel.hotel_location}</p>
                      <div className="hotels-info-n">
                        <p><strong>Price: </strong>${hotel.hotel_price}</p>
                        <p><strong>Rooms: </strong>{hotel.hotel_rooms}</p>
                        <p>
                          <strong>Stars:</strong>
                          {hotel.hotel_stars === 5 ? (
                            <>
                              <span>⭐⭐⭐⭐⭐</span>
                            </>
                          ) : hotel.hotel_stars === 4 ? (
                            <>
                              <span>⭐⭐⭐⭐</span>
                            </>
                          ) : hotel.hotel_stars === 3 ? (
                            <>
                              <span>⭐⭐⭐</span>
                            </>
                          ) : hotel.hotel_stars === 2 ? (
                            <>
                              <span>⭐⭐</span>
                            </>
                          ) : hotel.hotel_stars === 1 ? (
                            <span>⭐</span>
                          ) : (
                            <span>Not Rated</span>
                          )}
                        </p>{" "}
                        <p>
                          <strong>Rating:</strong>{" "}
                          {hotel.hotel_rating.length > 0
                            ? (
                                hotel.hotel_rating.reduce(
                                  (acc, review) => acc + review.rating,
                                  0
                                ) / hotel.hotel_rating.length
                              ).toFixed(1)
                            : "No ratings yet"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Slideshow images={images} />
      <h2>Popular Hotels</h2>
    </div>
  )
}

export default Home
