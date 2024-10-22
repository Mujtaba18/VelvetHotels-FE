import { useState } from "react"
import { RegisterUser } from "../services/Auth" // user auth
import { useNavigate } from "react-router-dom"

const Register = () => {
  let navigate = useNavigate()
  const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  }

  const [formValues, setFormValues] = useState(initialState)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await RegisterUser({
      name: formValues.name,
      email: formValues.email,
      password: formValues.password,
    })
    // Reset form values
    setFormValues(initialState)
    navigate("/signin")
  }

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header text-center">
          <h2>Sign Up</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                onChange={handleChange}
                name="name"
                type="text"
                className="form-control"
                placeholder="John Smith"
                value={formValues.name}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                onChange={handleChange}
                name="email"
                type="email"
                className="form-control"
                placeholder="example@example.com"
                value={formValues.email}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                onChange={handleChange}
                type="password"
                name="password"
                className="form-control"
                value={formValues.password}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                onChange={handleChange}
                type="password"
                name="confirmPassword"
                className="form-control"
                value={formValues.confirmPassword}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={
                !formValues.email ||
                !formValues.password ||
                formValues.confirmPassword !== formValues.password
              }
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
