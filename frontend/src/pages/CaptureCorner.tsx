import { useParams } from "react-router-dom";
import Webcam from "react-webcam";

const CaptureCorner = () => {
  const { id } = useParams();

  return (
    <div className="w-full h-full">
      <div className="absolute z-10 w-full p-6 opacity-60">
        <div className="flex flex-col items-center">
          <span className="font-extrabold text-light-light-green text-center">CAPTURE CORNER {id}</span>  
        </div>
      </div>
      <Webcam width={window.innerWidth} height={window.innerHeight} />
      <div className="absolute w-full bottom-16">
        <div className="flex justify-center">
          <div className="bg-white rounded-full">
            <button className="rounded-full w-20 h-20 border-black border-4 border-double active:opacity-80"></button>
          </div>
        </div>
      </div>
      <div className="absolute left-[50%] -ml-2 top-[50%] -mt-2 bg-white w-4 h-4 opacity-20"></div>
    </div>
  )
}

export default CaptureCorner
