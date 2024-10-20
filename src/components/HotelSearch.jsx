const HotelSearch = ({ onSubmit, value, onChange }) => {
  return (
    <div>
      <h1>Search for Hotels</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Enter hotel name"
          value={value}
          onChange={onChange}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  )
}

export default HotelSearch
