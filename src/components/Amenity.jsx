import React, { useEffect, useState } from "react"
import { getAmenities, addAmenity } from "../services/amenity"

const Amenity = () => {
  const [amenities, setAmenities] = useState([])
  const [newAmenity, setNewAmenity] = useState({
    amenity_name: "",
    amenity_description: "",
    amenity_icon: null,
  })

  const fetchAmenities = async () => {
    try {
      const data = await getAmenities()
      setAmenities(data)
    } catch (error) {
      console.error(error.message)
    }
  }

  const handleFileChange = (e) => {
    setNewAmenity({ ...newAmenity, amenity_icon: e.target.files[0] })
  }

  const handleAddAmenity = async (e) => {
    e.preventDefault()
    console.log("Adding amenity:", newAmenity)
    const formData = new FormData()
    formData.append("amenity_name", newAmenity.amenity_name)
    formData.append("amenity_description", newAmenity.amenity_description)
    formData.append("amenity_icon", newAmenity.amenity_icon)

    try {
      const addedAmenity = await addAmenity(formData)
      console.log("Added Amenity:", addedAmenity)
      setAmenities([...amenities, addedAmenity.amenity])
      setNewAmenity({
        amenity_name: "",
        amenity_description: "",
        amenity_icon: null,
      })
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    fetchAmenities()
  }, [])

  return (
    <div>
      <h2>Add Amenity</h2>
      <form onSubmit={handleAddAmenity}>
        <input
          type="text"
          placeholder="Amenity Name"
          value={newAmenity.amenity_name}
          onChange={(e) =>
            setNewAmenity({ ...newAmenity, amenity_name: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Amenity Description"
          value={newAmenity.amenity_description}
          onChange={(e) =>
            setNewAmenity({
              ...newAmenity,
              amenity_description: e.target.value,
            })
          }
          required
        />
        <input
          type="file"
          placeholder="Amenity Icon URL"
          onChange={handleFileChange}
        />
        <button type="submit">Add Amenity</button>
      </form>
      <h2>Amenities</h2>
      <div>
        {amenities.map((amenity) => (
          <div key={amenity._id}>
            <h3>{amenity.amenity_name}</h3>
            <p>{amenity.amenity_description}</p>
            {amenity.amenity_icon && (
              <img
                src={`http://localhost:3001/${amenity.amenity_icon}`}
                alt={amenity.amenity_name}
                width="100px"
                height="100px"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Amenity
