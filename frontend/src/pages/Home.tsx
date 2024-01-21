import Logo from '../assets/logo.svg'
import Dropdown from '../components/Dropdown'
import { useEffect, useState } from 'react'
import { Accelerometer } from '../sensors/motion-sensors'

const Home = () => {
  const [accelPerm, setAccelPerm] = useState<PermissionStatus>()
  const [accels, setAccels] = useState({x: 0, y: 0, z: 0})

  useEffect(() => {
    const asyncFunc = async () => {
      //@ts-expect-error it's fine ok
      const accel = await navigator.permissions.query({ name: 'accelerometer' })
      setAccelPerm(accel);
    };

    asyncFunc();
  }, [])

  useEffect(() => {
    if (accelPerm?.state == "granted") {
      const acl = new Accelerometer({ frequency: 60 });

      acl.addEventListener("reading", () => {
        setAccels({
          x: acl.x,
          y: acl.y,
          z: acl.z
        })
        console.log(`Acceleration along the X-axis ${acl.x}`);
        console.log(`Acceleration along the Y-axis ${acl.y}`);
        console.log(`Acceleration along the Z-axis ${acl.z}`);
      });

      acl.start();
    }
  }, [accelPerm])

  return (
    <div className='flex flex-col p-8 items-center gap-4'>
      <img src={Logo} alt="" className='w-1/2' />
      <p>{accelPerm ? accelPerm.state : ''}</p>
      <p>
        x: {accels.x}
        <br />
        y: {accels.y}
        <br />
        z: {accels.z}
      </p>
      <h1 className='text-3xl font-extrabold text-brunswick-green' style={{textShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)'}}>Find your friends!</h1>
      <Dropdown></Dropdown>
    </div>
  )
}

export default Home
