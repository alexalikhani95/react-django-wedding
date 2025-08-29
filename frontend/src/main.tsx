import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Header } from './components/Header.tsx'
import { Rsvp } from './routes/rsvp'
import { Information } from './routes/Information.tsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RsvpList } from './routes/RsvpList.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>


      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/rsvp" element={<Rsvp />} />
          <Route path="/rsvp-list" element={<RsvpList />} />
          <Route path="/information" element={<Information />} />
        </Routes>
      </BrowserRouter>,
    </QueryClientProvider>
  </StrictMode>,
)

