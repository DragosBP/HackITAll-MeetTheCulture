import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

function LearnButton () {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate("/learn")
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
            Learn
        </Button>
    )
}

export default LearnButton