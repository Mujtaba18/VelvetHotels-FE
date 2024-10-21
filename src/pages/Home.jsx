import { useNavigate } from "react-router-dom"

const Home = () => {
  let navigate = useNavigate()

  return (
    <div className="">
      <section className="">
        <button onClick={() => navigate("/register")}>i like to sign up</button>
        <button onClick={() => navigate("/signin")}>i like to sign</button>
      </section>
    </div>
  )
}

export default Home
