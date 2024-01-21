import Logo from '../assets/logo.svg'
import Dropdown from '../components/Dropdown'

const Home = () => {

  return (
    <div className='flex flex-col p-8 items-center mt-[250px] gap-4'>
      <img src={Logo} alt="" className='w-1/2' />
      <h1 className='text-3xl font-extrabold text-brunswick-green' style={{textShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)'}}>Find your friends!</h1>
      <Dropdown>Select your room</Dropdown>
      
    </div>
  )
}

export default Home
