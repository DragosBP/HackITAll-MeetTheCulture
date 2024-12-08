import { Box } from "@mui/material"
import SongList from "../../components/song/SongList"

function SongSection() {
    return(
        <Box 
            color={"black"}
            paddingTop={"5%"}
            display={"flex"}
            flexDirection={"column"}
            height={"100%"}
        >
            <Box
                height={"100%"}
                justifyContent={"center"}
                textAlign={"center"}
                // marginTop={"20%"}
                alignContent={"center"}
                fontSize={"3rem"}
            >
                Listen to the top songs of today from different cultures.
            </Box>
            <Box
                height={"100%"}
                display={"flex"}
                justifyContent={"center"}
            >
                <SongList />
            </Box>
        </Box>
    )
}

export default SongSection