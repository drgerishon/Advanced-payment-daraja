import Header from "./components/Header"
import Hero from "./components/Hero"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Transaction from "./pages/Transaction"

function App() {

  return (
   <BrowserRouter>
   <Header />
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/payment" element={<Transaction />} />
   </Routes>
   </BrowserRouter>
  )
}

export default App
