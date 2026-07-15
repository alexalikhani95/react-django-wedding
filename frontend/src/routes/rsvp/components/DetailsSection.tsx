import type { Ref } from "react"
import HomeImage from "@/assets/Burley-Manor-Home.png"
import GreenMelvin from "@/assets/Green-Melvin.png"
import LogoBeige from "@/assets/Logo-Biege.png"
import LogoGreen from "@/assets/Logo-Green.png"
import WhiteCar from "@/assets/White-Car.png"
import WhiteGlasses from "@/assets/White-Glasses-Taxi.png"

type Props = {
  nightBeforeAccess: boolean
  ref: Ref<HTMLDivElement> | undefined
}

export const DetailsSection = ({ nightBeforeAccess, ref }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 w-full" ref={ref}>
      {/* GIFTS */}
      <div
        className={`${nightBeforeAccess ? "bg-forest-green text-beige" : "bg-beige text-forest-green"} flex flex-col items-center py-14 px-10 text-center`}
      >
        <h2 className="text-6xl font-mattedly mb-4">Gifts</h2>
        <p className="max-w-[450px] text-xl font-evafiya mb-6">
          The most important thing to us is having you there to celebrate our
          wedding day. However if you wish to give a gift, we’d greatly
          appreciate a contribution to our honeymoon
        </p>
        <a
          href="https://app.collectionpot.com/pot/thealikhaniwedding"
          target="_blank"
          className={`w-[200px] font-adega text-xl border-1 p-2 ${nightBeforeAccess ? "border-beige" : "border-forest-green"}`}
          rel="noopener"
        >
          CONTRIBUTE
        </a>
      </div>

      {/* Contribute */}
      <div
        className={`${nightBeforeAccess ? "bg-forest-green text-beige" : "bg-beige text-forest-green"} flex flex-col items-center py-0 sm:py-14 text-center`}
      >
        <img
          src={nightBeforeAccess ? LogoBeige : LogoGreen}
          alt=""
          className="w-[150px] h-[150px] mt-6"
        />
      </div>

      {/* Accommodation */}
      <div className="bg-beige text-forest-green flex flex-col items-center py-14 px-10 text-center">
        <h2 className="text-6xl font-mattedly mb-4">Accommodation</h2>

        <img src={HomeImage} alt="" className="w-[280px] opacity-70 mb-4" />

        <p className="max-w-[420px] text-xl font-evafiya mb-4">
          If you would like to book a room at Burley Manor please quote:
          BMW140826 when making your reservation by calling the reservations
          team on: 0800444441, or click the link below
        </p>

        <a
          href="https://booking.eu.guestline.app/newforest/availability?hotel=NFHBURLEY&_gl=1*1kd9o4x*_gcl_aw*R0NMLjE3NjU1NzY3NTguQ2p3S0NBaUFsLV9KQmhCakVpd0FuM3JON1RpdnE2SE9NQlVoaWpiT0RRd1JUbzhMWTQtaFpmc041N2lLR0RUWm9mUUx1cm5jaFBOX25ob0NvOE1RQXZEX0J3RQ..*_gcl_au*MTc2MzE4MjMzNC4xNzYwMzgwNTAw*_ga*MTAzMzI5Mjk5OC4xNzUxNTM4ODE4*_ga_G26ZD2NZVJ*czE3NjU1NzY3NTgkbzE5JGcwJHQxNzY1NTc2NzU4JGo2MCRsMCRoMTI4NDAzNTQzNQ.."
          target="_blank"
          className={`w-[200px] font-adega text-xl border-1 p-2 ${nightBeforeAccess ? "border-forest-green" : "border-beige"}`}
          rel="noopener"
        >
          BURLEY MANOR BOOKINGS
        </a>
      </div>

      {/* Parking */}
      <div className="bg-forest-green text-beige flex flex-col gap-4 items-center py-14 px-10 text-center">
        <h2 className="text-6xl font-mattedly">Parking</h2>

        <img src={WhiteCar} alt="" className="w-[120px] opacity-80 mb-4" />

        <p className="text-xl font-adega uppercase">
          Please note parking at the church is very limited
        </p>
        <p className="text-xl font-evafiya">
          However, Burley Manor offers ample parking and is just a five-minute
          walk from St. John the Baptist Church. We recommend parking at Burley
          Manor and following the tarmacked path through the field to the church
        </p>
      </div>

      {/* Taxis */}
      <div
        className="bg-forest-green text-beige flex flex-col items-center py-14 px-10 text-center 
     order-6 md:order-none"
      >
        <h2 className="text-6xl font-mattedly mb-4">Taxi’s</h2>

        <img src={WhiteGlasses} alt="" className="w-[120px] opacity-80 mb-4" />

        <p className="text-md font-adega">NEW FOREST TAXIS:</p>
        <p className=" font-adega mb-5 text-xl">01425 600 222</p>
        <p className=" font-adega text-md font-adega">BROCKENHURST TAXIS:</p>
        <p className="font-adega text-xl">01590 615141</p>
      </div>

      {/* Plus-ones */}
      <div
        className="bg-beige text-forest-green flex flex-col items-center py-14 px-10 text-center 
     order-5 md:order-none"
      >
        <h2 className="text-6xl font-mattedly mb-4">Plus-ones & Children</h2>

        <img src={GreenMelvin} alt="" className="w-[140px] opacity-70 mb-4" />

        <p className="max-w-[420px] text-xl leading-relaxed font-evafiya">
          Seating has been reserved for only those named on your invitation
          envelope
        </p>
      </div>
    </div>
  )
}
