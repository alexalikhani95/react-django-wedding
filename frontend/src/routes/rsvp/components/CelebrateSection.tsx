import LogoBeige from "@/assets/Logo-Biege.png"
import WeddingLiner from "@/assets/Wedding-liner.png"

export const CelebrateSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 bg-forest-green text-beige pt-10 pb-5 px-5">
      {/* Image column */}
      <div className="flex justify-center relative order-2 md:order-1">
        <img
          src={WeddingLiner}
          className="w-[250px] h-[250px] sm:h-[350px] sm:w-[350px] absolute -bottom-12 drop-shadow-md/70"
        />
      </div>

      {/* Text column */}
      <div className="flex flex-col items-center text-center gap-5 order-1 md:order-2">
        <p className="font-adega tracking-[0.15em]">WE CAN&apos;T WAIT TO</p>

        <p className="text-6xl font-mattedly">Celebrate with you</p>
        <img src={LogoBeige} className="w-[150px] h-[150px]" />
      </div>
    </div>
  )
}
