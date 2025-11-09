import HomeImage from '@/assets/Burley-Manor-Home.png'
import LogoBeige from '@/assets/Logo-Biege.png'
import WeddingLiner from '@/assets/Wedding-liner.png'
import { Button } from './components/ui/button'

function App() {
  return (
    <>
      <div className='flex flex-col items-center gap-10 text-lg b-beige py-10'>
        <p className='text-xl'>14.08.26</p>

        <img src={HomeImage} alt="Burley Manor Home" className='w-[300px] h-[200px]' />

        <p className='text-4xl font-mattedly'>Alexander & Charlotte</p>

        <p className='text-3xl font-normal'>BURLEY MANOR</p>

        <Button variant="outline" size={'lg'}>
          RSVP
        </Button>
      </div>



      <div className='grid grid-cols-2 bg-forest-green text-beige py-5'>

        <div className='flex justify-center relative'>
          <img src={WeddingLiner} className='w-[200px] h-[200px] absolute -bottom-10' />
        </div>


        <div className='flex flex-col items-center'>
          <p>WE CAN'T WAIT TO</p>

          <p className='text-xl'>Celebrate with you</p>

          <img src={LogoBeige} className='w-[150px] h-[150px]' />

          <p>Kindly respond by *insert date* by filling out the form below</p>

        </div>
      </div>


      {/* // Night before */}
      <div className='grid grid-cols-2 bg-beige py-15'>

        <div>
          <p>The Night Before</p>
          <p>THURSDAY 13TH AUGUST 2026</p>

          <p>Please list only the names on your invitation tag and let us know if you'll be joining us</p>
        </div>

      </div>

    </>
  )
}

export default App
