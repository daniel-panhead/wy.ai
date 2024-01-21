import parentLogo from "../assets/parent.png"
import childLogo from "../assets/child.png"
import { useNavigate } from "react-router-dom"

const RoleCard = ({ role, className }) => {
    const navigate = useNavigate()
    const roleMap = {
        parent : {
            style : "bg-[#CFDED2]",
            logo : parentLogo,
            role : "Neglectful Parent",
            tagline : "Find your child"
        },
        child : {
            style : "bg-[#F0F7F2]",
            logo : childLogo,
            role : "Lost Child",
            tagline : "Stay where you are!"
        }
    }
    return (
        <div className={roleMap[role].style + 
            " w-[16.25rem] h-[21.125rem] flex flex-col justify-center items-center gap-y-[0.625rem] \
                rounded-2xl border-4 border-[#305F56] " + className}
                onClick={() => {sessionStorage.setItem('role', role); navigate("/capture-corner")}}>
            <img src={roleMap[role].logo} />
            <h2 className="text-4xl text-center font-bold"> { roleMap[role].role } </h2>
            <p> {roleMap[role].tagline} </p>
        </div>
    )
}

export default RoleCard