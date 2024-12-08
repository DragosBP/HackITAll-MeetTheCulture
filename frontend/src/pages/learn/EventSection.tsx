import { Box } from "@mui/material"
import Events from "../../components/event/Event"

function EventSection() {
    return(
        <Box 
            color={"black"}
            display={"flex"}
            flexDirection={"column"}
            width={"100%"}
            height={"100%"}

        >
            <Box
                width={"100%"}
                height={"100%"}
                fontSize={"3.5rem"}
                marginTop={"10%"}
            >
                Participate in ...!
            </Box>
            <Box
                width={"100%"}
                height={"100%"}
                paddingLeft={"17%"}
            >
                <Events/>
            </Box>
        </Box>
    )
}

export default EventSection