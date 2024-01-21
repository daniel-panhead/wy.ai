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


const smooth = (values: number[], alpha) => {
  const weighted = average(values) * alpha;
  let smoothed: number[] = [];
  for (const i of values) {
    const curr = values[i];
    const prev = smoothed[i - 1] || values[values.length - 1];
    const next = curr || values[0];
    const improved = Number(average([weighted, prev, curr, next]).toFixed(2));
    smoothed.push(improved);
  }
  return smoothed;
}

const average = (data) => {
  const sum = data.reduce(function (sum, value) {
    return sum + value;
  }, 0);
  const avg = sum / data.length;
  return avg;
}

export const useAhrs = () => {
  const permsGranted = useRef(false)
  const [eulerAngles, setEulerAngles] = useState<{ heading: number; pitch: number; roll: number; }>()
  const [madgwick, setMadgwick] = useState<AHRS>()
  const [gData, setGData] = useState<[number[], number[], number[]]>([[], [], []])
  const [aData, setAData] = useState<[number[], number[], number[]]>([[], [], []])
  const [mData, setMData] = useState<[number[], number[], number[]]>([[], [], []])

  useEffect(() => {
    if (!permsGranted.current) {
      getAccelMagnetPermission().then((res) => {
        if (res.state === "granted") {
          permsGranted.current = true
          const madgwick = new AHRS({
            /*
            * The sample interval, in Hz.
            *
            * Default: 20
            */
            sampleInterval: 60,

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

          const makeReadingHandler = (setData: (value: React.SetStateAction<[number[], number[], number[]] | []>) => void, acl: Gyroscope|Accelerometer|Magnetometer) => {
            return () => {
              setData((prev) => [[...prev[0], acl.x], [...prev[1], acl.y], [...prev[2], acl.z]])
            }
          }

          const aReadingHandler = () => {
            setAData((prev) => [[...prev[0], aAcl.x / 9.81], [...prev[1], aAcl.y / 9.81], [...prev[2], aAcl.z / 9.81]])
          }
          
          const gAcl = new Gyroscope({ frequency: 60 })
          const aAcl = new Accelerometer({ frequency: 60 })
          const mAcl = new Magnetometer({ frequency: 10 })

          const gReadHandler = makeReadingHandler(setGData, gAcl)
          const aReadHandler = aReadingHandler;
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
    if (!madgwick || gData[0].length < 6 || aData[0].length < 6) return

    const avgG = gData.map((axisArr) => smooth(axisArr, 0.85).reduce((prev, curr) => prev += curr) / axisArr.length)
    const avgA = aData.map((axisArr) => smooth(axisArr, 0.85).reduce((prev, curr) => prev += curr) / axisArr.length)
    const avgM = mData[0].length === 0 ? [] : mData.map((axisArr) => smooth(axisArr, 0.85).reduce((prev, curr) => prev += curr) / axisArr.length)
    // @ts-expect-error it's fine
    madgwick.update(...avgG, ...avgA, ...avgM)
    setEulerAngles(madgwick.getEulerAngles())

    setGData([[], [], []])
    setAData([[], [], []])
    setMData([[], [], []])
  }, [madgwick, gData, aData, mData])

  return eulerAngles
}