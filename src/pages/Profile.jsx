import { useNavigate } from "react-router-dom"
import React, { useState, useEffect } from "react"
import axios from "axios"

const Profile = ({ user, setUser }) => {
  let navigate = useNavigate()
  let startingState = user
    ? {
        name: user.name,
        email: user.email,
        age: user.age,
        gender: user.gender,
        profile_picture: user.profile_picture,
      }
    : null
  const [userData, setUserData] = useState(startingState)
  const [editMode, setEditMode] = useState(false)
  const [newPic, setNewPic] = useState(null)

  useEffect(() => {
    if (!user) {
      navigate("/")
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/profile/${user.id}`)
        setUserData(res.data)
      } catch (err) {
        console.error("Error fetching profile data" + err)
      }
    }
    fetchProfile()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  const handlePicChange = (e) => {
    const file = e.target.files[0]
    setNewPic(file)
  }

  const handleSave = async () => {
    const formData = new FormData()
    formData.append("name", userData.name)
    formData.append("email", userData.email)
    formData.append("age", userData.age)
    formData.append("gender", userData.gender)
    if (newPic) {
      formData.append("profile_picture", newPic)
    }

    try {
      const res = await axios.put(
        `http://localhost:3001/profile/${user.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      setUser({ id: res.data._id, ...res.data })
      setUserData(res.data)
      setEditMode(false)
    } catch (err) {
      console.error("Error updating profile" + err)
    }
  }

  return user ? (
    <>
      <div className="text-center mb-4">
        <h1>Profile</h1>
      </div>
      <div className="container card mt-4">
        <div className="d-flex justify-content-center my-4">
          <img
            src={`http://localhost:3001/uploads${user.profile_picture}`}
            alt={user.profile_picture}
            className="img-fluid rounded-circle"
            style={{ width: "150px", height: "150px" }}
          />
        </div>
        {editMode ? (
          <div className="p-4">
            <h2>Edit Profile</h2>
            <form className="profile-form">
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                    id="name"
                    className="form-control"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    id="email"
                    className="form-control"
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="age" className="form-label">
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={userData.age}
                    onChange={handleChange}
                    id="age"
                    className="form-control"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="gender" className="form-label">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={userData.gender}
                    onChange={handleChange}
                    id="gender"
                    className="form-control"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="profilePic" className="form-label">
                  Profile Picture
                </label>
                <input
                  type="file"
                  onChange={handlePicChange}
                  id="profilePic"
                  className="form-control"
                />
              </div>
              <button
                type="button"
                onClick={handleSave}
                className="btn btn-primary"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditMode(false)
                }}
                className="btn btn-secondary ms-2"
              >
                Go Back
              </button>
            </form>
          </div>
        ) : (
          <div className="p-4">
            <h2>User Details</h2>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Age:</strong> {user.age}
            </p>
            <p>
              <strong>Gender:</strong> {user.gender}
            </p>
            <button
              onClick={() => setEditMode(true)}
              className="btn btn-warning"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </>
  ) : null
}

export default Profile
