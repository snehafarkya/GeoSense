import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import CountryDetails from "./pages/CountryDetails"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:code" element={<CountryDetails />} />
      </Routes>
    </BrowserRouter>
  )
}
