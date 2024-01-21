import { useParams, useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { useAccel } from "../util/sensors";
import { useEffect } from "react";

const findDistance = async () => {
    // Assuming that role, location, and angle are already stored in the session  
    // the array of angles should be stringified
    sessionStorage.setItem('role', "parent") // Temporary
    sessionStorage.setItem('room', "West Wing")

    let floatAngles = []
    for (let i = 0; i < 3; i++) {
      floatAngles.push(parseFloat(sessionStorage.getItem(String(i))))
    }

    let res = await fetch("http://localhost:8000/coords", {
        method : "POST",
        mode : "cors",
        body : JSON.stringify({
            role : sessionStorage.getItem("role"),
            room : sessionStorage.getItem("room"),
            angles : floatAngles
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })

    // let res = await fetch("http://localhost:8000")

    console.log(await res.json())
}

const CaptureCorner = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const accel = useAccel();

  const capture = (accel) => {
    let angle = accel != null ? Math.acos(9.8/accel.x) : 0
    console.log(angle)

    sessionStorage.setItem(id, String(angle))
    if (Number(id) == 2 && angle != 0) {
      findDistance()
    }
  }

  useEffect(() => {
    console.log(accel)
  }, [accel])

  const size = {height: window.innerHeight, width: window.innerWidth}

  const isLandscape = size.height <= size.width;
  const ratio = isLandscape ? size.width / size.height : size.height /
    size.width;

  return (
    <div className="w-full h-full bg-black">
      <div className="absolute z-10 w-full p-6 opacity-60">
        <div className="flex flex-col items-center gap-2">
          <span className="font-extrabold text-light-light-green text-center text-lg">CAPTURE CORNER {id}</span>
          <span className="text-center text-light-light-green text-lg">Line up the corner with the glowing dot in the center!</span>
          <span className="text-center text-light-light-green text-lg font-semibold">{accel ? accel.z.toFixed(2) : ''}</span>
        </div>
      </div>
      <Webcam width={size.width} height={size.height} videoConstraints={{aspectRatio: ratio}} />
      <div className="absolute w-full bottom-16">
        <div className="flex justify-center">
          <div className="bg-light-light-green rounded-full">
            <button className="rounded-full w-20 h-20 border-black border-4 border-double active:opacity-80"
              onClick={() => { capture(accel); navigate("/capture-corner/" + (Number(id) < 2 ? Number(id) + 1 : 0))}}></button>
          </div>
        </div>
      </div>
      <div className="absolute left-[50%] -ml-3 top-[50%] -mt-3 bg-white rounded-full w-6 h-6 opacity-40 animate-pulse"></div>
    </div>
  )
}

export default CaptureCorner
