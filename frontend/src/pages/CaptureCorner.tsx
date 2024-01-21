import { useParams } from "react-router-dom";
import Webcam from "react-webcam";
import { useAccel } from "../hooks/sensors";
import { useEffect } from "react";

const CaptureCorner = () => {
  const { id } = useParams();
  const accel = useAccel();

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
          {
            // @ts-expect-error literally not an issue
            <span className="text-center text-light-light-green text-lg font-semibold">{accel ? accel.x.toFixed(2) : ''} {accel ? accel.y.toFixed(2) : ''} {accel ? accel.z.toFixed(2) : accel}</span>
          }
        </div>
      </div>
      <Webcam width={size.width} height={size.height} videoConstraints={{aspectRatio: ratio}} />
      <div className="absolute w-full bottom-16">
        <div className="flex justify-center">
          <div className="bg-light-light-green rounded-full">
            <button className="rounded-full w-20 h-20 border-black border-4 border-double active:opacity-80"></button>
          </div>
        </div>
      </div>
      <div className="absolute left-[50%] -ml-3 top-[50%] -mt-3 bg-white rounded-full w-6 h-6 opacity-40 animate-pulse"></div>
    </div>
  )
}

export default CaptureCorner
