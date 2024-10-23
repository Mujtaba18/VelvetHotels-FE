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
    <div className="container">
      <h2 className="mt-4">Add Amenity</h2>
      <div className="card p-4">

        <form onSubmit={handleAddAmenity} className="mb-4">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Amenity Name"
              value={newAmenity.amenity_name}
              onChange={(e) =>
                setNewAmenity({ ...newAmenity, amenity_name: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
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
          </div>
          <div className="form-group">
            <input
              type="file"
              className="form-control-file"
              onChange={handleFileChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Amenity
          </button>
        </form>
      </div>
      
      <h2>Amenities</h2>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Amenity Name</th>
            <th scope="col">Description</th>
            <th scope="col">Icon</th>
          </tr>
        </thead>
        <tbody>
          {amenities.map((amenity, index) => (
            <tr key={amenity._id}>
              <th scope="row">{index + 1}</th>
              <td>{amenity.amenity_name}</td>
              <td>{amenity.amenity_description}</td>
              <td>
                {amenity.amenity_icon && (
                  <img
                    src={`http://localhost:3001/${amenity.amenity_icon}`}
                    alt={amenity.amenity_name}
                    width="50"
                    height="50"
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Amenity
