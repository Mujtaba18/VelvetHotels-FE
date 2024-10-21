import { useNavigate } from "react-router-dom"
import React, { useState, useEffect } from "react"
import axios from "axios"

const Profile = ({ user, setUser }) => {
  let navigate = useNavigate()
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    age: user.age,
    gender: user.gender,
    profile_picture: user.profile_picture,
  })
  const [editMode, setEditMode] = useState(false)
  const [newPic, setNewPic] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log("FETCHING PROFILE DATA")
        const res = await axios.get(`http://localhost:3001/profile/${user.id}`)
        setUserData(res.data)
      } catch (err) {
        setError("Error fetching profile data")
        console.error(err)
      } finally {
        setLoading(false)
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
      setError("Error updating profile")
      console.error(err)
    }
  }

  return (
    <div className="img-wrapper">
      <h1>Profile</h1>
      <img
        src={`http://localhost:3001${user.profile_picture}`}
        alt={user.profile_picture}
        style={{ width: "150px", height: "150px", borderRadius: "50%" }}
      />
      {editMode ? (
        <>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="number"
            name="age"
            value={userData.age}
            onChange={handleChange}
            placeholder="Age"
          />
          <select name="gender" value={userData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <input type="file" onChange={handlePicChange} />
          <button onClick={handleSave}>Save. </button>
          <button onClick={() => navigate("/profile")}>go back</button>
        </>
      ) : (
        <>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Age: {user.age}</p>
          <p>Gender: {user.gender}</p>
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        </>
      )}
    </div>
  )
}

export default Profile
