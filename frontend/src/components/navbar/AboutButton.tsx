import { Button } from "@mui/material"

function AboutButton () {

    const handleClick = () => {
        console.log("ABOUT")
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
            About
        </Button>
    )
}

export default AboutButton