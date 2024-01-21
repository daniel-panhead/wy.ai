import { useEffect, useRef, useState } from "react"
import AHRS from 'ahrs'
// import AHRS from 'ahrs/build/www-ahrs.js'

export const getAccelPermission = async () => {
  // @ts-expect-error 'accelerometer' is a correct query for modern chrome
  return await navigator.permissions.query({ name: 'accelerometer' })
}

const getMagnetPermission = async () => {
  // @ts-expect-error 'accelerometer' is a correct query for modern chrome
  return await navigator.permissions.query({ name: 'magnetometer' })
}

const getAccelMagnetPermission = async () => {
  const accelPerms = await getAccelPermission()
  if (accelPerms.state !== "granted") {
    console.log("Failed to get accelerometer permissions")
    return accelPerms
  } else {
    return await getMagnetPermission()
  }
  
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

// export const useMagnet = () => {
//   const [magnet, setMagnet] = useState<{ x: number, y: number, z: number } | null>()

//   useEffect(() => {
//     getAccelPermission().then((res) => {
//       if (res.state === "granted") {
//         const acl = new Magnetometer({ frequency: 60 });

//         const handleReading = () => {
//           setMagnet({ x: acl.x, y: acl.y, z: acl.z })
//         }

//         acl.addEventListener("reading", handleReading);

//         acl.start();

//         return () => {
//           acl.removeEventListener("reading", handleReading)
//         }
//       } else {
//         setMagnet(null)
//       }
//     })
//   }, [])

//   return magnet
// }

export const useAhrs = () => {
  const permsGranted = useRef(false)
  const [eulerAngles, setEulerAngles] = useState<{ heading: number; pitch: number; roll: number; }>()
  const [madgwick, setMadgwick] = useState<AHRS>()
  const [gData, setGData] = useState<[number, number, number] | []>([])
  const [aData, setAData] = useState<[number, number, number] | []>([])
  const [mData, setMData] = useState<[number, number, number] | []>([])

  useEffect(() => {
    if (!permsGranted.current) {
      getAccelPermission().then((res) => {
        if (res.state === "granted") {
          permsGranted.current = true
          const madgwick = new AHRS({
            /*
            * The sample interval, in Hz.
            *
            * Default: 20
            */
            sampleInterval: 10,

            /*
            * Choose from the `Madgwick` or `Mahony` filter.
            *
            * Default: 'Madgwick'
            */
            algorithm: 'Madgwick',

            /*
            * The filter noise value, smaller values have
            * smoother estimates, but have higher latency.
            * This only works for the `Madgwick` filter.
            *
            * Default: 0.4
            */
            beta: 0.4,

            /*
            * The filter noise values for the `Mahony` filter.
            */
            kp: 0.5, // Default: 0.5
            ki: 0, // Default: 0.0

            /*
            * When the AHRS algorithm runs for the first time and this value is
            * set to true, then initialisation is done.
            *
            * Default: false
            */
            doInitialisation: false,
          });

          setMadgwick(madgwick)

          const makeReadingHandler = (setData, acl: Gyroscope|Accelerometer|Magnetometer) => {
            return () => {
              setData([acl.x, acl.y, acl.z])
            }
          }
          
          const gAcl = new Gyroscope({ frequency: 10 })
          const aAcl = new Accelerometer({ frequency: 10 })
          const mAcl = new Magnetometer({ frequency: 10 })

          const gReadHandler = makeReadingHandler(setGData, gAcl)
          const aReadHandler = makeReadingHandler(arr => setAData(arr.map(el => el / 9.81)), aAcl)
          const mReadHandler = makeReadingHandler(setMData, mAcl)
          
          gAcl.addEventListener("reading", gReadHandler);
          aAcl.addEventListener("reading", aReadHandler);
          mAcl.addEventListener("reading", mReadHandler);

          gAcl.start()
          aAcl.start()
          mAcl.start()
          console.log("done init")

          return () => {
            gAcl.removeEventListener("reading", gReadHandler);
            aAcl.removeEventListener("reading", aReadHandler);
            mAcl.removeEventListener("reading", mReadHandler);
          }
        }
      })
    }
  }, [])

  useEffect(() => {
    if (!madgwick || gData.length == 0 || aData.length == 0) return
    console.log(gData)
    madgwick.update(...gData, ...aData, ...mData)
    setEulerAngles(madgwick.getEulerAngles())
  }, [madgwick, gData, aData, mData])

  return eulerAngles
}