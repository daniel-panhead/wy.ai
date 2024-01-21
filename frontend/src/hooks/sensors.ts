import { useEffect, useState } from "react";

export const getAccelPermission = async () => {
  // @ts-expect-error 'accelerometer' is a correct query for modern chrome
  return await navigator.permissions.query({ name: 'accelerometer' })
}

export const useAccel = () => {
  const [accels, setAccels] = useState()

  useEffect(() => {

    getAccelPermission().then((res) => {
      if (res.state === "granted") {
        // @ts-expect-error object exists in JS Web API
        const acl = new Accelerometer({ frequency: 60 });

        const handleReading = () => {
          setAccels(acl)
          console.log(`Acceleration along the X-axis ${acl.x}`);
          console.log(`Acceleration along the Y-axis ${acl.y}`);
          console.log(`Acceleration along the Z-axis ${acl.z}`);
        }

        acl.addEventListener("reading", handleReading);

        acl.start();

        return () => {
          acl.removeEventListenenr("reading", handleReading)
        }
      } else {
        setAccels(null)
      }
    })
  }, [])

  return accels
}