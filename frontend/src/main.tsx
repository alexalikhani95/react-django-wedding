import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Login } from './routes/Login.tsx'
import { Header } from './components/Header.tsx'
import { Rsvp } from './routes/Rsvp.tsx'
import { Signup } from './routes/signup.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Header />
         <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/rsvp" element={<Rsvp />} />
    </Routes>
    </BrowserRouter>,
  </StrictMode>,
)

