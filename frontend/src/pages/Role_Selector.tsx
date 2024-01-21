import RoleCard from "../components/RoleCard"

const RoleSelector = () => {

    return (
      <div className="flex flex-col items-center">
          <h1 className="text-[#305F56] text-center drop-shadow-[0_2px_2px_rgba(0,0,0,0.25)] 
          text-[38px] font-[800] mt-[4.81rem]">
            Choose your role
          </h1>

          <RoleCard role="parent" className="mt-[2.61rem]"/>
          <RoleCard role="child" className="mt-[1.31rem]"/>
      </div>
    )
}

export default RoleSelector