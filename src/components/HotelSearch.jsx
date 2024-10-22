const HotelSearch = ({ onSubmit, value, onChange }) => {
  return (
    <div className="search">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Enter Hotel Name"
          value={value}
          onChange={onChange}
          className="form-control"
        />
        <button type="submit" className="btn">Search</button>
      </form>
    </div>
  )
}

export default HotelSearch
