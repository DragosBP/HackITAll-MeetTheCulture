import { Box } from "@mui/material"
import CustomForm from "../../components/form/Form"

function ForumSection() {
    return (
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
                Suggest your own events!
            </Box>
            <CustomForm/>
        </Box>
    )
}

export default ForumSection