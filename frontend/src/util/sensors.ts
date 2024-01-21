export const listenAccel = (frequency = 60, setAccels) => {
  // @ts-expect-error part of the Generic Sensors API
  const acl = new Accelerometer({ frequency: frequency });

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

export const getAccelPermission = async () => {
  // @ts-expect-error 'accelerometer' is a correct query for modern chrome
  return await navigator.permissions.query({ name: 'accelerometer' })
  
}