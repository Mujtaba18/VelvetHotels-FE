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
    <div className="bg-form" style={{ minHeight: "450px" }}>
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ height: "100%" }}
      >
        <div className="card-overlay text-center">
          <form className="col" onSubmit={handleSubmit}>
            <h2 style={{ margin: "20px 0" }}>Welcome back!</h2>
            <span className="icoin">
              <i className="fa-solid fa-user fa-2xl"></i>
            </span>
            <h6 style={{ margin: "10px 0" }}>Login to your account</h6>

            <div className="input-wrapper mb-3">
              <label htmlFor="email">Email</label>
              <input
                onChange={handleChange}
                name="email"
                type="email"
                placeholder="example@example.com"
                value={formValues.email}
                className="form-control form-control-md"
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
                className="form-control form-control-md"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block mb-3"
              disabled={!formValues.email || !formValues.password}
            >
              Sign In
            </button>

            <div
              className="pass-forget"
              style={{ float: "right", marginRight: "7px" }}
            ></div>

            <hr style={{ marginTop: "2rem" }} />
            <h6>
              New user?
              <a
                onClick={() => navigate("/register")}
                style={{ cursor: "pointer" }}
              >
                <span style={{ color: "blue" }}> Register now</span>
              </a>
            </h6>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignIn
