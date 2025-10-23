import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import App from "./App.tsx";
import { Header } from "./components/Header.tsx";
import { Guests } from "./routes/guests";
import { Information } from "./routes/Information.tsx";
import { RsvpList } from "./routes/RsvpList.tsx";
import { Rsvp } from "./routes/rsvp";
import { Seating } from "./routes/seating";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="pb-5">
          <Header />
        </div>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/rsvp" element={<Rsvp />} />
          <Route path="/rsvp-list" element={<RsvpList />} />
          <Route path="/information" element={<Information />} />
          <Route path="/guests" element={<Guests />} />
          <Route path="/seating" element={<Seating />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
      ,
    </QueryClientProvider>
  </StrictMode>,
);
