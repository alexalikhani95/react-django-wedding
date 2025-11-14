import HomeImage from "@/assets/Burley-Manor-Home.png"
import GreenCar from "@/assets/Green-Car.png"
import WeddingDayGreen from "@/assets/Green-Church-Wedding-day.png"
import GreenCheers from "@/assets/Green-cheers-Thankyou.png"
import GreenGlasses from "@/assets/Green-Glasses-Taxi.png"
import GreenMelvin from "@/assets/Green-Melvin.png"
import LogoBeige from "@/assets/Logo-Biege.png"
import MenuBeige from "@/assets/Menu-biege.jpg"
import MenuGreen from "@/assets/Menu-Green.jpg"
import NightBeforeGreen from "@/assets/Night-before-green.png"
import PaperTexture from "@/assets/Paper-texture.jpeg"
import WeddingLiner from "@/assets/Wedding-liner.png"
import WhiteCar from "@/assets/White-Car.png"
import WeddingDayWhite from "@/assets/White-Church-Wedding-day.png"
import WhiteCheers from "@/assets/White-cheers-Thankyou.png"
import WhiteGlasses from "@/assets/White-Glasses-Taxi.png"
import WhiteMelvin from "@/assets/White-Melvin.png"
import { Button } from "./components/ui/button"
import { Checkbox } from "./components/ui/checkbox"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"
import React, { useRef } from "react"

function App() {
  const rsvpRef = useRef<HTMLDivElement | null>(null)
  const detailsRef = useRef<HTMLDivElement | null>(null)
  return (
    <>
      <div className="flex flex-col items-center text-center justify-center gap-10 text-lg b-beige py-10">
        <p className="text-xl">14.08.26</p>

        <img
          src={HomeImage}
          alt="Burley Manor Home"
          className="w-[300px] h-[200px]"
        />

        <p className="text-7xl font-mattedly">Alexander & Charlotte</p>

        <p className="text-2xl font-metropolis">BURLEY MANOR</p>

        <Button variant="secondary" size={"lg"} onClick={() => {
          rsvpRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
        }}>
          RSVP
        </Button>
      </div>

      <div className="grid grid-cols-2 bg-forest-green text-beige py-5">
        <div className="flex justify-center relative">
          <img
            src={WeddingLiner}
            className="w-[250px] h-[250px] absolute -bottom-12 drop-shadow-md/70"
          />
        </div>

        <div className="flex flex-col items-center text-center">
          <p>WE CAN'T WAIT TO</p>

          <p className="text-xl">Celebrate with you</p>

          <img src={LogoBeige} className="w-[150px] h-[150px]" />

          <p>Kindly respond by *insert date* by filling out the form below</p>
        </div>
      </div>

      {/* // Night before */}
      <div className="grid grid-cols-1 sm:grid-cols-2 bg-beige py-15" ref={rsvpRef}>
        <div className="flex flex-col items-center text-center">
          <p>The Night Before</p>
          <p>THURSDAY 13TH AUGUST 2026</p>

          <img
            src={NightBeforeGreen}
            alt="Night before scene"
            className="w-[300px] h-[200px]"
          />

          <p>
            Please list only the names on your invitation tag and let us know if
            you'll be joining us
          </p>
        </div>

        <div className="flex flex-col items-center gap-5">
          <Label htmlFor="guest-name" className="flex flex-col items-start">
            Guest 1:
            <Input placeholder="First Name, Surname" className="bg-white" />
          </Label>

          <div className="flex gap-5">
            <Label className="flex flex-col">
              Joyfully Accepts
              <Checkbox />
            </Label>

            <Label className="flex flex-col">
              Regretfully Declines
              <Checkbox />
            </Label>
          </div>

          <Button variant="secondary" size={"lg"}>
            ADD NEXT GUEST
          </Button>
        </div>
      </div>

      {/* Wedding Day */}
      <div className="grid grid-cols-1 sm:grid-cols-2 bg-forest-green text-beige py-15">
        <div className="flex flex-col items-center text-center gap-3">
          <p className="text-6xl font-mattedly">Our Wedding Day</p>
          <p className="font-metropolis">Friday 14TH AUGUST 2026</p>

          <img
            src={WeddingDayWhite}
            alt="Wedding day"
            className="w-[200px] h-[200px]"
          />

          <p>
            Please list only the names on your invitation tag and let us know if
            you'll be joining us
          </p>
        </div>

        <div className="flex flex-col items-center gap-5">
          <Label htmlFor="guest-name" className="flex flex-col items-start">
            Guest 1:
            <Input placeholder="First Name, Surname" className="bg-white" />
          </Label>

          <div className="flex gap-5">
            <Label className="flex flex-col">
              Joyfully Accepts
              <Checkbox />
            </Label>

            <Label className="flex flex-col">
              Regretfully Declines
              <Checkbox />
            </Label>
          </div>

          <Button variant="primary" size={"lg"}>
            ADD NEXT GUEST
          </Button>
        </div>
      </div>

      {/* // Menu */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 py-15 
             bg-[url(@/assets/Menu-biege.jpg)] bg-cover bg-center bg-no-repeat"
      >
        {/* Menu Card */}
        <div className="flex justify-center">
          <div
            className="bg-[url(@/assets/Paper-texture.jpeg)] bg-cover bg-center
                 text-forest-green flex flex-col gap-6 rounded-xl shadow-md
                 w-[420px] p-8 font-metropolis"
          >
            {/* Header */}
            <div className="text-center">
              <p className="text-5xl font-mattedly leading-tight">The Menu</p>
              <p className="mt-1 tracking-wide text-sm">GUEST 1:</p>
            </div>

            {/* To Begin */}
            <section className="flex flex-col gap-2">
              <h2 className="text-lg font-mattedly mb-1">To Begin</h2>

              <Label className="flex items-start gap-3 text-sm leading-snug">
                <Checkbox />
                <span>
                  Isle of Wight heritage tomatoes, vegan mozzarella, leaf, basil
                  oil, ciabatta bread
                </span>
              </Label>

              <p className="text-center text-xs italic my-1 opacity-70">OR</p>

              <Label className="flex items-start gap-3 text-sm leading-snug">
                <Checkbox />
                <span>
                  Vegetable antipasti board, chargrilled pepper, courgette,
                  olives, balsamic onions, sourdough, vegan pesto
                </span>
              </Label>
            </section>

            {/* The Main Event */}
            <section className="flex flex-col gap-2 mt-3">
              <h2 className="text-lg font-mattedly mb-1">The Main Event</h2>

              <Label className="flex items-start gap-3 text-sm leading-snug">
                <Checkbox />
                <span>
                  Butternut squash, spinach & mushroom en croûte, roast tomato
                  sauce, tenderstem broccoli, fondant potato
                </span>
              </Label>

              <p className="text-center text-xs italic my-1 opacity-70">OR</p>

              <Label className="flex items-start gap-3 text-sm leading-snug">
                <Checkbox />
                <span>
                  Spelt leek & pea risotto, oyster mushroom, vegan parmesan
                </span>
              </Label>
            </section>

            {/* Something Sweet */}
            <section className="flex flex-col gap-2 mt-3">
              <h2 className="text-lg font-mattedly mb-1">Something Sweet</h2>

              <Label className="flex items-start gap-3 text-sm leading-snug">
                <Checkbox />
                <span>
                  Chocolate tart, passion fruit sorbet, chocolate sauce, passion
                  fruit crumb
                </span>
              </Label>

              <p className="text-center text-xs italic my-1 opacity-70">OR</p>

              <Label className="flex items-start gap-3 text-sm leading-snug">
                <Checkbox />
                <span>Elderflower jelly, summer fruits, crème fraîche</span>
              </Label>
            </section>
          </div>
        </div>

        {/* Allergies & Intolerances Section */}
        <div className="flex flex-col justify-center items-center">
          <div
            className="bg-forest-green text-beige flex flex-col items-center gap-5
                 py-8 px-6 rounded-md w-[420px] font-metropolis shadow-md text-center"
          >
            {/* Header */}
            <div>
              <h2 className="uppercase tracking-[0.15em] text-base font-semibold mb-2">
                Allergies and Intolerances
              </h2>
              <p className="max-w-[360px] mx-auto text-xs leading-relaxed">
                The menu is plant-based and therefore free from dairy and eggs.
                <br />
                If you have any other food allergies or intolerances, please let
                us know below.
              </p>
            </div>

            {/* Checkboxes */}
            <div className="flex justify-center items-center gap-8 mt-2">
              <Label className="flex flex-col items-center gap-2 text-xs">
                <span>None / Not applicable</span>
                <Checkbox />
              </Label>

              <Label className="flex flex-col items-center gap-2 text-xs">
                <span>Yes, I have other allergies / intolerances</span>
                <Checkbox />
              </Label>
            </div>

            {/* Text input */}
            <div className="flex flex-col items-start w-full mt-3 text-left">
              <Label htmlFor="allergy-details" className="mb-1 text-xs">
                Please specify:
              </Label>
              <Input
                id="allergy-details"
                placeholder="Type here..."
                className="bg-white text-forest-green placeholder:text-forest-green/50 w-full h-[36px]"
              />
            </div>
          </div>

          {/* Next Guest Button */}
          <div className="flex justify-center mt-5">
            <Button
              variant="primary"
              size="lg"
              className="tracking-[0.15em] uppercase px-8 py-4 text-sm font-metropolis border border-forest-green bg-white text-forest-green hover:bg-forest-green hover:text-beige transition-colors"
            >
              Next Guest
            </Button>
          </div>
        </div>
      </div>

      {/* Submit your RSVP */}
      <div className="bg-forest-green flex items-center justify-center py-10">
        <Button variant="primary" className="w-[300px]">
          SUBMIT YOUR RSVP
        </Button>
      </div>

      {/* // Thank you */}
      <div className="flex flex-col items-center gap-10 text-lg b-beige py-10 text-center">
        <p className="text-7xl font-mattedly">Thank you!</p>
        <p className="text-2xl font-metropolis">YOUR RSVP HAS BEEN SUBMITTED</p>

        <img
          src={GreenCheers}
          alt="Thank you"
          className="w-[200px] h-[200px]"
        />

        <p className="text-2xl font-metropolis">WITH LOVE,</p>
        <p className="text-4xl font-mattedly">Alexander & Charlotte</p>

        <Button variant="secondary" size={"lg"} onClick={() => {
          detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
        }}>
          FINER DETAILS
        </Button>
      </div>

      {/* Bottom Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 w-full" ref={detailsRef}>
        {/* GIFTS */}
        <div className="bg-forest-green text-beige flex flex-col items-center justify-center py-14 px-10 text-center">
          <h2 className="text-5xl font-mattedly mb-4">Gifts</h2>
          <p className="max-w-[450px] text-sm leading-relaxed mb-6">
            The most important thing to us is having you there to celebrate our
            wedding day. However if you wish to give a gift, we’d greatly
            appreciate a contribution to our honeymoon.
          </p>
        </div>

        {/* A&C LOGO PANEL */}
        <div className="bg-forest-green text-beige flex flex-col items-center justify-center py-14 px-10 text-center">
          <Button variant="primary" className="w-[200px]">Contribute</Button>

          <img src={LogoBeige} className="w-[150px] h-[150px]" />
        </div>

        {/* ACCOMMODATION */}
        <div className="bg-beige text-forest-green flex flex-col items-center justify-center py-14 px-10 text-center">
          <h2 className="text-6xl font-mattedly mb-4">Accommodation</h2>

          <img src={HomeImage} className="w-[280px] opacity-70 mb-4" />

          <p className="max-w-[420px] text-sm leading-relaxed mb-4">
            If you would like to book a room at Burley Manor please quote
          </p>

          <div className="border border-forest-green rounded-full px-6 py-2 tracking-[0.15em] text-sm mb-2">
            BMW140626
          </div>

          <p className="text-sm">when making your reservation</p>
        </div>

        {/* PARKING */}
        <div className="bg-forest-green text-beige flex flex-col items-center justify-center py-14 px-10 text-center">
          <h2 className="text-6xl font-mattedly mb-4">Parking</h2>

          <img src={WhiteCar} className="w-[120px] opacity-80 mb-4" />

          <p className="max-w-[420px] text-xs leading-relaxed tracking-wide mb-2 uppercase">
            Please note parking at the church is very limited
          </p>

          <p className="max-w-[420px] text-sm leading-relaxed">
            If you would like to book a room at Burley Manor please quote
          </p>
        </div>

        {/* TAXIS */}
        <div className="bg-forest-green text-beige flex flex-col items-center justify-center py-14 px-10 text-center">
          <h2 className="text-6xl font-mattedly mb-4">Taxi’s</h2>

          <img src={WhiteGlasses} className="w-[120px] opacity-80 mb-4" />

          <p className="text-sm leading-relaxed">
            NEW FOREST TAXIS – 01425 600 222 <br />
            BROCKENHURST TAXIS – 01590 615141
          </p>
        </div>

        {/* PLUS ONES */}
        <div className="bg-beige text-forest-green flex flex-col items-center justify-center py-14 px-10 text-center">
          <h2 className="text-6xl font-mattedly mb-4">Plus-ones & Children</h2>

          <img src={GreenMelvin} className="w-[140px] opacity-70 mb-4" />

          <p className="max-w-[420px] text-sm leading-relaxed">
            Seating has been reserved for only those named on your invitation.
          </p>
        </div>
      </div>
    </>
  )
}

export default App
