import { useState, useEffect } from "react"
import { Route, Routes, useParams } from "react-router"
import Header from "./components/Header"
import Register from "./pages/Register"
import SignIn from "./pages/SignIn"
import Home from "./pages/Home"
import HotelDetails from "./pages/HotelDetails"
import "./App.css"
import Hotels from "./pages/Hotels"
import AddHotel from "./pages/AddHotel"
import { CheckSession } from "./services/Auth" 
import Amenity from "./components/Amenity"
import Profile from "./pages/Profile"
import "./App.css"


const App = () => {
  const [user, setUser] = useState(null)

  const handleLogOut = () => {
    // Reset all auth related state and clear localStorage
    setUser(null)
    localStorage.clear()
  }

  const checkToken = async () => {
    // If a token exists, sends token to localStorage to persist logged in user
    const user = await CheckSession()
    console.log(user) // Log the user object to see its structure

    setUser(user)
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    // Check if token exists before requesting to validate the token
    if (token) {
      checkToken()
    }
  }, [])

  return (
    <div className="App">
      <Header user={user} handleLogOut={handleLogOut} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/add-hotel" element={<AddHotel />} />
          <Route path="/amenities" element={<Amenity />} />
          <Route path="/hotels/details/:hotelId" element={<HotelDetails />} />
          <Route
            path="/profile/:userId"
            element={<Profile user={user} setUser={setUser} />} // Keep it as is
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
