import { Box } from "@mui/material"
import AboutButton from "./AboutButton"
import HomeButton from "./HomeButton"
import LearnButton from "./LearnButton"

interface Props {
    isHome: boolean
    isAbout: boolean
    isLearn: boolean
}

function Navbar({
    isHome,
    isAbout,
    isLearn,
}: Props) {
    return (
        <Box

            display={"flex"}
            flexDirection={"row"}
            width={"30%"}
            position={"absolute"}
            zIndex={20}
            color={"black"}
            fontSize={"5rem"}
            gap={"10%"}
            left={"20%"}
            top={"2%"}
        >
            {!isHome && <HomeButton/>}
            {!isLearn && <LearnButton/>}
            {!isAbout && <AboutButton/>}
        </Box>
    )
}

export default Navbar