import { Link } from "react-router-dom"

const Header = ({ user, handleLogOut }) => {
  let userOptions
  let welcomeMsg

  // Check if user is defined and has a role
  if (user) {
    if (user.role === "user") {
      userOptions = (
        <nav>
          <Link to="/">Home</Link>
          <Link to="/hotels">Hotels</Link>
          <Link to="/hotels/mybooking">My Booking</Link>
          <Link to={`/profile/${user.id}`}>Profile</Link>
          <Link onClick={handleLogOut} to="/">
            Sign Out
          </Link>
        </nav>
      )
    } else if (user.role === "admin") {
      userOptions = (
        <nav>
          <Link to="/">Home</Link>
          <Link to="/hotels">Hotels</Link>
          <Link to="/add-hotel">Add Hotel</Link>
          <Link to={`/profile/${user.id}`}>Profile</Link>
          <Link to="/amenities">Amenities</Link>

          <Link onClick={handleLogOut} to="/">
            Sign Out
          </Link>
        </nav>
      )
    }
  } else {
    // Provide a default greeting when user is not logged in
    userOptions = (
      <nav>
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/signin">Sign In</Link>
      </nav>
    )
  }

  if (user) {
    if (user.role === "user") {
      welcomeMsg = <p className="welcomeMsg">Welcome {user.name}!</p>
    } else if (user.role === "admin") {
      welcomeMsg = (
        <p className="welcomeMsg">
          Welcome {user.name}! <span>-Admin-</span>
        </p>
      )
    }
  } else {
    welcomeMsg = <p className="welcomeMsg">Welcome Guest!</p>
  }

  return (
    <header>
      <Link to="/">
        <div className="logo-wrapper" alt="logo">
          <img
            src="https://i.postimg.cc/TP6D3xrK/Velvet-Hotels-logo.png"
            alt="Logo"
            width="50px"
            height="50px"
          />
        </div>
      </Link>
      {welcomeMsg}
      {userOptions}
    </header>
  )
}

export default Header
