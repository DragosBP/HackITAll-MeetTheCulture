import { Box } from "@mui/material"

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
                Suggest your own suggestions!
            </Box>
        </Box>
    )
}

export default ForumSection