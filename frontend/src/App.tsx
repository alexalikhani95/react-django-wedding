import HomeImage from "@/assets/Burley-Manor-Home.png"
// import GreenCar from "@/assets/Green-Car.png"
// import WeddingDayGreen from "@/assets/Green-Church-Wedding-day.png"
import GreenCheers from "@/assets/Green-cheers-Thankyou.png"
// import GreenGlasses from "@/assets/Green-Glasses-Taxi.png"
import GreenMelvin from "@/assets/Green-Melvin.png"
import LogoBeige from "@/assets/Logo-Biege.png"
// import MenuBeige from "@/assets/Menu-biege.jpg"
// import MenuGreen from "@/assets/Menu-Green.jpg"
import NightBeforeGreen from "@/assets/Night-before-green.png"
// import PaperTexture from "@/assets/Paper-texture.jpeg"
import WeddingLiner from "@/assets/Wedding-liner.png"
import WhiteCar from "@/assets/White-Car.png"
import WeddingDayWhite from "@/assets/White-Church-Wedding-day.png"
// import WhiteCheers from "@/assets/White-cheers-Thankyou.png"
import WhiteGlasses from "@/assets/White-Glasses-Taxi.png"

// import WhiteMelvin from "@/assets/White-Melvin.png"

import { useRef, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group"

type RSVPInputs = {
  guestName: string

  nightBefore: "accept" | "decline" | null
  weddingDay: "accept" | "decline" | null

  starter: "tomato" | "antipasti" | null
  main: "croute" | "risotto" | null
  dessert: "tart" | "jelly" | null

  allergies: "none" | "yes" | null
  allergyNotes: string
}

function App() {
  const rsvpRef = useRef<HTMLDivElement | null>(null)
  const detailsRef = useRef<HTMLDivElement | null>(null)
  const submittedRef = useRef<HTMLDivElement | null>(null)

  const [showSubmitted, setShowSubmitted] = useState(false)

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RSVPInputs>({
    defaultValues: {
      guestName: "",
      nightBefore: null,
      weddingDay: null,
      starter: null,
      main: null,
      dessert: null,
      allergies: null,
      allergyNotes: "",
    },
  })

  const allergiesValue = watch("allergies")

  const submitRSVP = handleSubmit((data) => {
    console.log("RSVP SUBMITTED:", data)
    setShowSubmitted(true)
    submittedRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  })

  return (
    <>
      {/* Header / Hero */}
      <div className="flex flex-col text-forest-green items-center text-center justify-center gap-10 text-lg b-beige py-10">
        <p className="text-xl">14.08.26</p>

        <img
          src={HomeImage}
          alt="Burley Manor Home"
          className="w-[300px] h-[200px]"
        />

        <p className="text-7xl font-mattedly">Alexander & Charlotte</p>

        <p className="text-2xl font-metropolis">BURLEY MANOR</p>
      </div>

      {/* Your Details (guest name, but no gating) */}
      <div className="flex flex-col items-center justify-center text-center py-12 bg-beige">
        <h2 className="text-4xl font-mattedly mb-4">Your Details</h2>

        <div className="flex flex-col gap-4 w-full max-w-[360px] items-center">
          <Label htmlFor="guestName" className="w-full text-left text-sm">
            Guest Name
          </Label>
          <Input
            id="guestName"
            placeholder="First Name, Surname"
            className="bg-white"
            {...register("guestName")}
          />
        </div>
      </div>

      {/* Intro strip */}
      <div className="grid grid-cols-2 bg-forest-green text-beige py-5">
        <div className="flex justify-center relative">
          <img
            src={WeddingLiner}
            className="w-[250px] h-[250px] absolute -bottom-12 drop-shadow-md/70"
          />
        </div>

        <div className="flex flex-col items-center text-center">
          <p>WE CAN&apos;T WAIT TO</p>

          <p className="text-xl">Celebrate with you</p>

          <img src={LogoBeige} className="w-[150px] h-[150px]" />

          <p>Kindly respond by *insert date* by filling out the form below</p>
        </div>
      </div>

      {/* Main RSVP Form */}
      <form onSubmit={submitRSVP}>
        {/* Night before */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 bg-beige py-15"
          ref={rsvpRef}
        >
          <div className="flex flex-col items-center text-center">
            <p>The Night Before</p>
            <p>THURSDAY 13TH AUGUST 2026</p>

            <img
              src={NightBeforeGreen}
              alt="Night before scene"
              className="w-[300px] h-[200px]"
            />

            <p>
              Please let us know if you&apos;ll be joining us the evening
              before.
            </p>


          </div>

          <div className="flex flex-col items-center justify-center w-full">
            <Controller
              name="nightBefore"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  className="flex flex-col gap-4 w-full max-w-[320px] mt-2"
                  value={field.value ?? ""}
                  onValueChange={field.onChange}
                >
                  {/* Joyfully Accepts */}
                  <Label
                    htmlFor="nb-accept"
                    className="
            flex items-center gap-4 w-full
            px-5 py-3
            rounded-lg border border-forest-green/30
            bg-white/95 text-forest-green
            shadow-sm
            cursor-pointer
            transition-all
            hover:bg-white hover:shadow-md hover:border-forest-green/60
          "
                  >
                    <RadioGroupItem
                      id="nb-accept"
                      value="accept"
                      className="border-forest-green text-forest-green"
                    />
                    <span className="text-sm font-metropolis tracking-wide">
                      Joyfully Accepts
                    </span>
                  </Label>

                  {/* Regretfully Declines */}
                  <Label
                    htmlFor="nb-decline"
                    className="
            flex items-center gap-4 w-full
            px-5 py-3
            rounded-lg border border-forest-green/30
            bg-white/95 text-forest-green
            shadow-sm
            cursor-pointer
            transition-all
            hover:bg-white hover:shadow-md hover:border-forest-green/60
          "
                  >
                    <RadioGroupItem
                      id="nb-decline"
                      value="decline"
                      className="border-forest-green text-forest-green"
                    />
                    <span className="text-sm font-metropolis tracking-wide">
                      Regretfully Declines
                    </span>
                  </Label>
                </RadioGroup>
              )}
            />
          </div>

        </div>

        {/* Wedding Day */}
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 bg-forest-green text-beige py-15">
          <div className="flex flex-col items-center text-center gap-3">
            <p className="text-6xl font-mattedly">Our Wedding Day</p>
            <p className="font-metropolis">Friday 14TH AUGUST 2026</p>

            <img
              src={WeddingDayWhite}
              alt="Wedding day"
              className="w-[200px] h-[200px]"
            />

            <p>Please let us know if you’ll be joining us on the day.</p>
          </div>

          <div className="flex flex-col items-center justify-center w-full">
            <Controller
              name="weddingDay"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  value={field.value ?? ""}
                  onValueChange={field.onChange}
                  className="flex flex-col gap-4 w-full max-w-[340px]"
                >
                  {/* Accept */}
                  <Label
                    htmlFor="wd-accept"
                    className="
            flex items-center gap-4 w-full
            px-5 py-3
            rounded-lg border
            bg-beige/95 text-forest-green
            shadow-sm
            cursor-pointer
            transition-all
            hover:bg-beige hover:shadow-md hover:border-beige
          "
                  >
                    <RadioGroupItem
                      id="wd-accept"
                      value="accept"
                      className="border-forest-green text-forest-green"
                    />
                    <span className="text-sm font-metropolis tracking-wide">
                      Joyfully Accepts
                    </span>
                  </Label>

                  {/* Decline */}
                  <Label
                    htmlFor="wd-decline"
                    className="
            flex items-center gap-4 w-full
            px-5 py-3
            rounded-lg border
            bg-beige/95 text-forest-green
            shadow-sm
            cursor-pointer
            transition-all
            hover:bg-beige hover:shadow-md hover:border-beige
          "
                  >
                    <RadioGroupItem
                      id="wd-decline"
                      value="decline"
                      className="border-forest-green text-forest-green"
                    />
                    <span className="text-sm font-metropolis tracking-wide">
                      Regretfully Declines
                    </span>
                  </Label>
                </RadioGroup>
              )}
            />
          </div>


        </div>

        {/* Menu */}
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
                <h2 className="text-3xl font-mattedly mb-1">To Begin</h2>

                <Controller
                  name="starter"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      className="flex flex-col gap-2"
                      value={field.value ?? ""}
                      onValueChange={field.onChange}
                    >
                      <Label
                        className="flex items-center gap-3 text-sm leading-snug cursor-pointer"
                        htmlFor="starter-tomato"
                      >
                        <RadioGroupItem
                          id="starter-tomato"
                          value="tomato"
                          className="mt-1"
                        />
                        <span>
                          Isle of Wight heritage tomatoes, vegan mozzarella,
                          leaf, basil oil, ciabatta bread
                        </span>
                      </Label>

                      <p className="text-center text-xs italic my-1 opacity-70">
                        OR
                      </p>

                      <Label
                        className="flex items-center gap-3 text-sm leading-snug cursor-pointer"
                        htmlFor="starter-antipasti"
                      >
                        <RadioGroupItem
                          id="starter-antipasti"
                          value="antipasti"
                          className="mt-1"
                        />
                        <span>
                          Vegetable antipasti board, chargrilled pepper,
                          courgette, olives, balsamic onions, sourdough, vegan
                          pesto
                        </span>
                      </Label>
                    </RadioGroup>
                  )}
                />
              </section>

              {/* The Main Event */}
              <section className="flex flex-col gap-2 mt-3">
                <h2 className="text-3xl font-mattedly mb-1">The Main Event</h2>

                <Controller
                  name="main"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      className="flex flex-col gap-2"
                      value={field.value ?? ""}
                      onValueChange={field.onChange}
                    >
                      <Label
                        className="flex items-center gap-3 text-sm leading-snug cursor-pointer"
                        htmlFor="main-croute"
                      >
                        <RadioGroupItem
                          id="main-croute"
                          value="croute"
                          className="mt-1"
                        />
                        <span>
                          Butternut squash, spinach & mushroom en croûte, roast
                          tomato sauce, tenderstem broccoli, fondant potato
                        </span>
                      </Label>

                      <p className="text-center text-xs italic my-1 opacity-70">
                        OR
                      </p>

                      <Label
                        className="flex items-center gap-3 text-sm leading-snug cursor-pointer"
                        htmlFor="main-risotto"
                      >
                        <RadioGroupItem
                          id="main-risotto"
                          value="risotto"
                          className="mt-1"
                        />
                        <span>
                          Spelt leek & pea risotto, oyster mushroom, vegan
                          parmesan
                        </span>
                      </Label>
                    </RadioGroup>
                  )}
                />
              </section>

              {/* Something Sweet */}
              <section className="flex flex-col gap-2 mt-3">
                <h2 className="text-3xl font-mattedly mb-1">Something Sweet</h2>

                <Controller
                  name="dessert"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      className="flex flex-col gap-2"
                      value={field.value ?? ""}
                      onValueChange={field.onChange}
                    >
                      <Label
                        className="flex items-center gap-3 text-sm leading-snug cursor-pointer"
                        htmlFor="dessert-tart"
                      >
                        <RadioGroupItem
                          id="dessert-tart"
                          value="tart"
                          className="mt-1"
                        />
                        <span>
                          Chocolate tart, passion fruit sorbet, chocolate sauce,
                          passion fruit crumb
                        </span>
                      </Label>

                      <p className="text-center text-xs italic my-1 opacity-70">
                        OR
                      </p>

                      <Label
                        className="flex items-center gap-3 text-sm leading-snug cursor-pointer"
                        htmlFor="dessert-jelly"
                      >
                        <RadioGroupItem
                          id="dessert-jelly"
                          value="jelly"
                          className="mt-1"
                        />
                        <span>
                          Elderflower jelly, summer fruits, crème fraîche
                        </span>
                      </Label>
                    </RadioGroup>
                  )}
                />
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
                  The menu is plant-based and therefore free from dairy and
                  eggs.
                  <br />
                  If you have any other food allergies or intolerances, please
                  let us know below.
                </p>
              </div>

              {/* Allergies Radios */}
              <Controller
                name="allergies"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    className="flex flex-row gap-8 justify-center mt-2"
                    value={field.value ?? ""}
                    onValueChange={field.onChange}
                  >
                    <Label
                      className="flex flex-col items-center gap-1 text-xs cursor-pointer"
                      htmlFor="allergy-none"
                    >
                      <RadioGroupItem id="allergy-none" value="none" />
                      <span>None / Not applicable</span>
                    </Label>

                    <Label
                      className="flex flex-col items-center gap-1 text-xs cursor-pointer"
                      htmlFor="allergy-yes"
                    >
                      <RadioGroupItem id="allergy-yes" value="yes" />
                      <span>Yes, I have allergies</span>
                    </Label>
                  </RadioGroup>
                )}
              />

              {/* Allergy Notes (conditional) */}
              {allergiesValue === "yes" && (
                <div className="flex flex-col items-start w-full mt-3 text-left">
                  <Label htmlFor="allergyNotes" className="mb-1 text-xs">
                    Please specify:
                  </Label>
                  <Input
                    id="allergyNotes"
                    placeholder="Type here..."
                    {...register("allergyNotes")}
                    className="bg-white text-forest-green placeholder:text-forest-green/50 w-full h-[36px]"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit your RSVP */}
        <div className="bg-forest-green flex items-center justify-center py-10">
          <Button type="submit" variant="primary" className="w-[300px] p-10">
            SUBMIT YOUR RSVP
          </Button>
        </div>
      </form>

      {/* Thank you */}
      <div
        className="flex flex-col items-center gap-10 text-lg b-beige py-10 text-center min-h-[200px]"
        ref={submittedRef}
      >
        {showSubmitted && (
          <div className="animate-fade-in duration-700">
            <p className="text-7xl font-mattedly">Thank you!</p>
            <p className="text-2xl font-metropolis">
              YOUR RSVP HAS BEEN SUBMITTED
            </p>

            <img
              src={GreenCheers}
              alt="Thank you"
              className="w-[200px] h-[200px] mx-auto my-6"
            />

            <p className="text-2xl font-metropolis">WITH LOVE,</p>
            <p className="text-4xl font-mattedly">Alexander & Charlotte</p>

            <Button
              variant="secondary"
              size="lg"
              className="mt-6"
              onClick={() =>
                detailsRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              }
            >
              FINER DETAILS
            </Button>
          </div>
        )}
      </div>

      {/* Bottom Details Section */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-0 w-full"
        ref={detailsRef}
      >
        {/* GIFTS */}
        <div className="bg-forest-green text-beige flex flex-col items-center justify-center py-14 px-10 text-center">
          <h2 className="text-5xl font-mattedly mb-4">Gifts</h2>
          <p className="max-w-[450px] text-sm leading-relaxed mb-6">
            The most important thing to us is having you there to celebrate our
            wedding day. However if you wish to give a gift, we’d greatly
            appreciate a contribution to our honeymoon.
          </p>
        </div>

        {/* Contribute */}
        <div className="bg-forest-green text-beige flex flex-col items-center justify-center py-14 px-10 text-center">
          <Button variant="primary" className="w-[200px]">
            Contribute
          </Button>

          <img src={LogoBeige} className="w-[150px] h-[150px] mt-6" />
        </div>

        {/* Accommodation */}
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

        {/* Parking */}
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

        {/* Taxis */}
        <div className="bg-forest-green text-beige flex flex-col items-center justify-center py-14 px-10 text-center">
          <h2 className="text-6xl font-mattedly mb-4">Taxi’s</h2>

          <img src={WhiteGlasses} className="w-[120px] opacity-80 mb-4" />

          <p className="text-sm leading-relaxed">
            NEW FOREST TAXIS – 01425 600 222 <br />
            BROCKENHURST TAXIS – 01590 615141
          </p>
        </div>

        {/* Plus-ones */}
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
