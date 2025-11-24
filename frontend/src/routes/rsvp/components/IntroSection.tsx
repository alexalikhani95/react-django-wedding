import HomeImage from "@/assets/Burley-Manor-Home.png"
import { Button } from "@/components/ui/button"

type Props = {
  onScroll: () => void
}

export const IntroSection = ({ onScroll }: Props) => {
  return (
    <div className="flex flex-col text-forest-green items-center text-center justify-center gap-10 text-lg b-beige py-10">
      <p className="text-3xl font-adega">14.08.26</p>

      <img
        src={HomeImage}
        alt="Burley Manor Home"
        className="w-[300px] h-[200px]"
      />

      <p className="text-7xl font-mattedly">Alexander & Charlotte</p>

      <p className="text-2xl font-adega">BURLEY MANOR</p>

      <p className="font-evafiya text-xl">
        Kindly respond by 14.05.26 by filling out the form below
      </p>

      <Button
        variant="secondary"
        size="lg"
        className="font-adega text-xl"
        onClick={onScroll}
      >
        RSVP
      </Button>
    </div>
  )
}
