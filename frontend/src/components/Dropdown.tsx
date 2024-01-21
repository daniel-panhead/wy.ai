import { useState } from "react";
import { useNavigate } from "react-router-dom";
import w_atrium from "../assets/West Atrium.jpg"
import e_atrium from "../assets/East Atrium.jpg"

const roomsList = [
  {
    name: 'West Atrium',
    src: w_atrium
  },
  {
    name: 'East Atrium',
    src: e_atrium
  }
]

const Dropdown = ({children}) => {
  const [active, setActive] = useState(false)
  const navigate = useNavigate()
  return (
    <div className="gap-0 flex flex-col">
      <div
        className="relative z-10 flex items-center w-[280px] justify-center gap-4 bg-cambridge-blue border-sea-green border-2 px-6 py-4 rounded-2xl drop-shadow-xl"
        onClick={() => {setActive((prev) => !prev)}}  
      >
        <span>{children}</span>
        <svg width="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 2H26.0052" stroke="black" stroke-width="3" stroke-linecap="round" />
          <path d="M2 12H26.0052" stroke="black" stroke-width="3" stroke-linecap="round" />
          <path d="M2 22H26.0052" stroke="black" stroke-width="3" stroke-linecap="round" />
        </svg>
      </div>
      {active &&
        <div className={"relative flex flex-col items-center gap-2 bg-element-bg border-ash-grey border-2 -mt-4 py-4 rounded-xl drop-shadow-xl"}>
          {roomsList.map((roomObj) => {
            return (
              <div className="flex flex-row items-center py-2 px-8 active:bg-slate-100"
              onClick={() => {navigate("/select-role")}}>
                <span className="w-[165px] my-2 px-8 py-2 rounded-tl-md rounded-bl-md bg-ash-grey-lite">{roomObj.name}</span>
                <img src={roomObj.src} className="w-14 h-14 bg-white rounded-md border-sea-green border-2" />
              </div>
            );
          })}
          
        </div>
      }
    </div>
  );
}

export default Dropdown