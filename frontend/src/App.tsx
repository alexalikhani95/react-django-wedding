import { useState } from "react"
import "./index.css"
import { BrowserRouter, Route, Routes } from "react-router"
import { ToastContainer } from "react-toastify"
import { Header } from "./components/Header.tsx"
import { Costs } from "./routes/costs/index.tsx"
import { Guests } from "./routes/guests/index.tsx"
import { MealCounts } from "./routes/mealCounts/index.tsx"
import Rsvp from "./routes/rsvp/index.tsx"
import { RsvpList } from "./routes/rsvpList/index.tsx"
import { Seating } from "./routes/seating/index.tsx"

function App() {
  const [accessCode, setAccessCode] = useState<string | null>(
    localStorage.getItem("accessCode"),
  )

  return (
    <BrowserRouter>
      {accessCode === "charlotte" && <Header setAccessCode={setAccessCode} />}
      <Routes>
        <Route
          path="/"
          element={
            <Rsvp accessCode={accessCode} setAccessCode={setAccessCode} />
          }
        />
        <Route path="/rsvp-list" element={<RsvpList />} />
        <Route path="/meal-counts" element={<MealCounts />} />
        <Route path="/guests" element={<Guests />} />
        <Route path="/seating" element={<Seating />} />
        <Route path="/costs" element={<Costs />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
