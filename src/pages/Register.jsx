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
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

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
    // set to empty
    setFormValues(initialState) //short way
    navigate("/signin")
  }

  return (
    <div className="bg-form" style={{ minHeight: "530px" }}>
      <div className="card-overlay centered">
        <h2 style={{ margin: "20px 0" }}>Join us now!</h2>

        <form className="col" onSubmit={handleSubmit}>
          <div className="input-wrapper mb-3">
            <label htmlFor="name">Name</label>
            <input
              onChange={handleChange}
              name="name"
              type="text"
              placeholder="John Smith"
              value={formValues.name}
              className="form-control"
              required
            />
          </div>
          <div className="input-wrapper mb-3">
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="example@example.com"
              value={formValues.email}
              className="form-control"
              required
            />
          </div>

          <div className="input-wrapper mb-3">
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              value={formValues.password}
              className="form-control"
              required
            />
          </div>
          <div className="input-wrapper mb-3">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="confirmPassword"
              value={formValues.confirmPassword}
              className="form-control"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block mb-3"
            disabled={
              !formValues.email ||
              !formValues.password ||
              formValues.password !== formValues.confirmPassword
            }
          >
            Sign Up
          </button>
        </form>

        <div className="text-center">
          <h6>
            Already have an account?
            <a
              onClick={() => navigate("/signin")}
              style={{ cursor: "pointer", color: "blue" }}
            >
              <span> Log in here</span>
            </a>
          </h6>
        </div>
      </div>
    </div>
  )
}

export default Register
