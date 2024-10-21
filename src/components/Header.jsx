import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/hotels">Hotels</Link>
      <Link to="/addHotel">Add Hotel</Link>
    </div>
  )
}

export default Header
