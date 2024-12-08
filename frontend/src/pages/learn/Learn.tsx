import { Box } from "@mui/material"
import Navbar from "../../components/navbar/Navbar"

function Learn() {
    return (
        <Box
            bgcolor={"rgba(251, 255, 241, 1)"}
            height={"100%"}
            width={"100%"}
        >
            <Navbar 
                isHome={true}
                isLearn={false}
                isAbout={false}
            />
        </Box>
    )
}

export default Learn