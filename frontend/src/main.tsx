import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Navigate, Route, Routes } from "react-router"
import { ToastContainer } from "react-toastify"
import { Header } from "./components/Header.tsx"
import { Guests } from "./routes/guests"
import Rsvp from "./routes/rsvp/index.tsx"
import { RsvpList } from "./routes/rsvpList/"
import { Seating } from "./routes/seating"

const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="pb-5">
          <Header />
        </div>
        <Routes>
          <Route path="/" element={<Navigate to="/rsvp" replace />} />
          <Route path="/rsvp" element={<Rsvp />} />
          <Route path="/rsvp-list" element={<RsvpList />} />
          <Route path="/guests" element={<Guests />} />
          <Route path="/seating" element={<Seating />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
      ,
    </QueryClientProvider>
  </StrictMode>,
)
