import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
function HomeButton () {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate("/")
    }

    return (
        <Button
            onClick={handleClick}
            sx={{
                color: "black",
                fontSize: "1.5rem",
                fontWeight: "500",
                font: "Inter",
                borderRadius: "25px"
            }}
        >
            Home
        </Button>
    )
}

export default HomeButton