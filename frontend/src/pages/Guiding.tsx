import Webcam from "react-webcam";
import { useMagnet } from "../util/sensors";

const Guiding = () => {
  const magnet = useMagnet();
  const size = { height: window.innerHeight, width: window.innerWidth }

  const isLandscape = size.height <= size.width;
  const ratio = isLandscape ? size.width / size.height : size.height /
    size.width;

  return (
    <div className="w-full h-full bg-black">
      <div className="absolute z-10 w-full p-6 opacity-60">
        <div className="flex flex-col items-center gap-2">
          <span className="font-extrabold text-light-light-green text-center text-lg">NAVIGATE TO YOUR FRIEND!</span>
          <span className="font-extrabold text-light-light-green text-center text-lg">{magnet ? magnet.x.toFixed(2) : ''} {magnet ? magnet.y.toFixed(2) : ''} {magnet ? magnet.z.toFixed(2) : ''}</span>
          <span className="font-extrabold text-light-light-green text-center text-lg">{magnet ? (Math.atan2(magnet.y, magnet.x) * (180/Math.PI)).toFixed(2) : ''}</span>

        </div>
      </div>
      <Webcam width={size.width} height={size.height} videoConstraints={{ aspectRatio: ratio }} />
      <div className="absolute w-full bottom-14">
        <div className="flex flex-col justify-center w-full px-8 text-light-light-green">
          <span className="text-4xl font-semibold">10 FT AWAY</span>
          <span className="text-xl font-medium">WALK STRAIGHT</span>
        </div>
      </div>
      <div className="absolute left-[50%] -ml-3 top-[50%] -mt-3 bg-white rounded-full w-6 h-6 opacity-40 animate-pulse"></div>
    </div>
  )
}

export default Guiding
