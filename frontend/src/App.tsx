import { Routes, Route } from "react-router-dom"
import App from "./App"
import Login from "./Login"
import SignUp from "./SignUp"
import { Dashboard } from "./Dashboard"

function Main() {
  return (
    
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path= "/signup" element={<SignUp/>}/>
      <Route path="dashboard" element={<Dashboard/>}/>
    </Routes>
  )
}

export default Main