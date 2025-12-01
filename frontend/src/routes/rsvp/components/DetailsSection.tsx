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
        <p className="max-w-[450px] text-lg font-evafiya mb-6">
          The most important thing to us is having you there to celebrate our
          wedding day. However if you wish to give a gift, we’d greatly
          appreciate a contribution to our honeymoon
        </p>
        <a
          href="https://app.collectionpot.com/pot/3417854"
          target="_blank"
          className={`w-[200px] font-adega text-xl border-2 p-2 ${nightBeforeAccess ? "border-beige" : "border-forest-green"}`}
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
          className="w-[150px] h-[150px] mt-6"
        />
      </div>

      {/* Accommodation */}
      <div className="bg-beige text-forest-green flex flex-col items-center py-14 px-10 text-center">
        <h2 className="text-6xl font-mattedly mb-4">Accommodation</h2>

        <img src={HomeImage} className="w-[280px] opacity-70 mb-4" />

        <p className="max-w-[420px] text-lg font-evafiya mb-4">
          If you would like to book a room at Burley Manor please quote
        </p>

        <div className="border border-forest-green rounded-full px-6 py-4 tracking-[0.15em] text-lg mb-2 font-adega">
          BMW<span className="text-xl">140626</span>
        </div>

        <p className="text-lg font-evafiya">when making your reservation</p>
      </div>

      {/* Parking */}
      <div className="bg-forest-green text-beige flex flex-col gap-4 items-center py-14 px-10 text-center">
        <h2 className="text-6xl font-mattedly">Parking</h2>

        <img src={WhiteCar} className="w-[120px] opacity-80 mb-4" />

        <p className="text-lg font-evafiya uppercase">
          Please note parking at the church is very limited
        </p>
        <p className="text-lg font-evafiya">
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

        <img src={WhiteGlasses} className="w-[120px] opacity-80 mb-4" />

        <p className="text-md font-adega">NEW FOREST TAXIS:</p>
        <p className=" font-adega mb-2 text-xl">01425 600 222</p>
        <p className=" font-adega text-md font-adega">BROCKENHURST TAXIS:</p>
        <p className="font-adega text-xl">01590 615141</p>
      </div>

      {/* Plus-ones */}
      <div
        className="bg-beige text-forest-green flex flex-col items-center py-14 px-10 text-center 
     order-5 md:order-none"
      >
        <h2 className="text-6xl font-mattedly mb-4">Plus-ones & Children</h2>

        <img src={GreenMelvin} className="w-[140px] opacity-70 mb-4" />

        <p className="max-w-[420px] text-lg leading-relaxed font-evafiya">
          Seating has been reserved for only those named on your invitation envelope
        </p>
      </div>
    </div>
  )
}
