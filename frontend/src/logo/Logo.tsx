import { Box } from "@mui/material"
import LogoSVG from "./logo.svg"

function Logo() {
    return (
        <Box
            zIndex={10}
            position={"absolute"}
            top={"1rem"}
            left={"1rem"}
        >
            <img src={LogoSVG} />
        </Box>
    )
}

export default Logo