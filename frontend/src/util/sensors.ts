import { useEffect, useState } from "react"

export const getAccelPermission = async () => {
  // @ts-expect-error 'accelerometer' is a correct query for modern chrome
  return await navigator.permissions.query({ name: 'accelerometer' })
}

export const useAccel = () => {
  const [accel, setAccel] = useState<{ x: number, y: number, z: number } | null>()

  useEffect(() => {
    getAccelPermission().then((res) => {
      if (res.state === "granted") {
        const acl = new Accelerometer({ frequency: 60 });

        const handleReading = () => {
          setAccel({ x: acl.x, y: acl.y, z: acl.z })
        }

        acl.addEventListener("reading", handleReading);

        acl.start();

        return () => {
          acl.removeEventListener("reading", handleReading)
        }
      } else {
        setAccel(null)
      }
    })
  }, [])
  
  return accel
}

export const useMagnet = () => {
  const [magnet, setMagnet] = useState<{ x: number, y: number, z: number } | null>()

  useEffect(() => {
    getAccelPermission().then((res) => {
      if (res.state === "granted") {
        const acl = new Magnetometer({ frequency: 60 });

        const handleReading = () => {
          setMagnet({ x: acl.x, y: acl.y, z: acl.z })
        }

        acl.addEventListener("reading", handleReading);

        acl.start();

        return () => {
          acl.removeEventListener("reading", handleReading)
        }
      } else {
        setMagnet(null)
      }
    })
  }, [])

  return magnet
}