const findDistance = async () => {
    // Assuming that role, location, and angle are already stored in the session  
    // the array of angles should be stringified

    let strAngles = JSON.parse(sessionStorage.getItem("angles"))
    for (let i = 0; i < strAngles.length; i++) {
        strAngles[i] = parseFloat(strAngles[i])
    }

    let res = await fetch("http://localhost:60906/coords", {
        method : "POST",
        body : JSON.stringify({
            role : sessionStorage.getItem("role"),
            room : sessionStorage.getItem("room"),
            angles : strAngles
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    console.log(res.json)
}

const Camera = () => {
    sessionStorage.setItem('role', "parent")
    sessionStorage.setItem('room', "West Wing")
    sessionStorage.setItem('angles', JSON.stringify([45, 23, 12]))
    return(
        <div onClick={findDistance}>
            CAMERA
        </div>
    )
}

export default Camera