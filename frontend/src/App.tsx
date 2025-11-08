import HomeImage from '@/assets/Burley-Manor-Home.png'
import { Button } from './components/ui/button'

function App() {
  return (
    <div className='flex flex-col items-center gap-10 text-lg b-beige'>
      <p className='text-xl'>14.08.26</p>

      <div className=''>
        <img src={HomeImage} alt="Burley Manor Home" />
      </div>

      <p className='text-4xl font-mattedly'>Alexander & Charlotte</p>

      <p className='text-3xl font-normal'>BURLEY MANOR</p>

      <Button variant="outline" size={'lg'}>
        RSVP
      </Button>
    </div>
  )
}

export default App
