import { Link } from "react-router-dom"

const Header = ({ user, handleLogOut }) => {
  let userOptions

  // Check if user is defined and has a role
  if (user) {
    if (user.role === "user") {
      userOptions = (
        <nav>
          <h3>Welcome {user.name}!</h3>
          <Link to="/">Home</Link>
          <Link to="/">Hotels</Link>
          <Link to="/">My Booking</Link>
          <Link onClick={handleLogOut} to="/">
            Sign Out
          </Link>
        </nav>
      )
    } else if (user.role === "admin") {
      userOptions = (
        <nav>
          <h3>Welcome {user.name}! Admin</h3>
          <Link to="/">Home</Link>
          <Link to="/">Add Hotel</Link>
          <Link to="/">Profile</Link>
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
        <h3>Welcome Guest!</h3>
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/signin">Sign In</Link>
      </nav>
    )
  }

  return (
    <header>
      <Link to="/">
        <div className="logo-wrapper" alt="logo">
          LOGO
        </div>
      </Link>
      {userOptions}
    </header>
  )
}

export default Header
