import Logo from '../assets/logo.svg'
import Dropdown from '../components/Dropdown'
import { useEffect, useState } from 'react'

const Home = () => {
  const [accelPerm, setAccelPerm] = useState<PermissionStatus>()

  useEffect(() => {
    const asyncFunc = async () => {
      const accel = await navigator.permissions.query({ name: 'accelerometer' })
      setAccelPerm(accel);
    };

    asyncFunc();
  }, [])

  return (
    <div className='flex flex-col p-8 items-center gap-4'>
      <img src={Logo} alt="" className='w-1/2' />
      <h1 className='text-3xl font-extrabold text-brunswick-green' style={{textShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)'}}>Find your friends!</h1>
      <Dropdown></Dropdown>
    </div>
  )
}

export default Home
