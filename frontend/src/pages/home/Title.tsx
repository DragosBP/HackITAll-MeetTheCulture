import { Box } from "@mui/material";

function Title() {
    return (
        <Box
            position={"absolute"}
            zIndex={5}
            display={"flex"}
            flexDirection={"column"}
            color={"black"}
            fontFamily={"Inter"}
            fontSize={"7rem"}
            fontWeight={600}
            textAlign={"left"}
            top={"10%"}
            left={"5%"}
        >
            <Box>
                Meet
            </Box>
            <Box
                paddingLeft={"40%"}
            >
                The
            </Box>
            <Box
                paddingLeft={"80%"}
            >
                Culture
            </Box>
        </Box>
    )
}

export default Title