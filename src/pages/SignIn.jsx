import { useState } from "react"
import { SignInUser } from "../services/Auth"
import { useNavigate } from "react-router-dom"
const SignIn = ({ setUser }) => {
  let navigate = useNavigate()
  const [formValues, setFormValues] = useState({ email: "", password: "" })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = await SignInUser(formValues)
    setFormValues({ email: "", password: "" })
    setUser(payload)
    navigate("/")
  }

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header text-center">
          <h2>Sign In</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
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
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={!formValues.email || !formValues.password}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignIn
