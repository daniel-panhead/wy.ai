import Webcam from "react-webcam";
import { useAhrs } from "../util/sensors";

const Guiding = () => {
  const ahrs = useAhrs();
  const size = { height: window.innerHeight, width: window.innerWidth }

  const isLandscape = size.height <= size.width;
  const ratio = isLandscape ? size.width / size.height : size.height /
    size.width;

  const targetDeg = 48;
  const diff = ahrs ? targetDeg - ahrs.heading : 0

  return (
    <div className="w-full h-full bg-black">
      <div className="absolute z-10 w-full p-6 opacity-60">
        <div className="flex flex-col items-center gap-2">
          <span className="font-extrabold text-light-light-green text-center text-lg">NAVIGATE TO YOUR FRIEND!</span>
          <span className="font-extrabold text-light-light-green text-center text-lg">heading: {ahrs ? (ahrs.heading * (180 / Math.PI)).toFixed(2) : ''}</span>
          <span className="font-extrabold text-light-light-green text-center text-lg">pitch: {ahrs ? (ahrs.pitch * (180 / Math.PI)).toFixed(2) : ''}</span>
          <span className="font-extrabold text-light-light-green text-center text-lg">roll: {ahrs ? (ahrs.roll * (180 / Math.PI)).toFixed(2) : ''}</span>

        </div>
      </div>
      <Webcam width={size.width} height={size.height} videoConstraints={{ aspectRatio: ratio }} />
      <div className="absolute w-full bottom-14">
        <div className="flex flex-col justify-center w-full px-8 text-light-light-green">
          <span className="text-4xl font-semibold">10 FT AWAY</span>
          <span className="text-xl font-medium">{Math.abs(diff - 5) < 0 ? "Go straight" : `Turn ${Math.abs(diff).toFixed(2)} deg ${diff > 0 ? 'left' : 'right'}`}</span>
        </div>
      </div>
      <div className="absolute left-[50%] -ml-3 top-[50%] -mt-3 bg-white rounded-full w-6 h-6 opacity-40 animate-pulse"></div>
    </div>
  )
}

export default Guiding
