import { Box, Button } from "@mui/material"
import SpecialDay from "../../components/specialDay/SpecialDay"
import { useNavigate } from "react-router-dom"


function DaySection() {
    const navigate = useNavigate()

    return(
        <Box 
            color={"black"}
            display={"flex"}
            flexDirection={"column"}
            height={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={"7px"}
        >
            <Box
                sx={{
                    textAlign: "center",
                    color: "#000000",
                    fontFamily: '"FixelText", Sans-serif',
                    fontSize: "24px",
                    fontWeight: 400,
                    textTransform: "uppercase",
                    lineHeight: 1.2,
                  }}
            >
                Meet The Culture!
            </Box>
            <Box
                sx={{
                    color: "#000000",
                    fontFamily: '"alias-union", Sans-serif',
                    fontSize: "32px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    fontStyle: "italic",
                    width: "350px"
                  }}
            >
                A place where worlds unite!
            </Box>
            <SpecialDay/>
            <Box
                fontWeight={"600"}
                fontSize={"1.2rem"}
            >
                If you haven't already, you can test your knowledge about other cultures here:
            </Box>
            <Button
                onClick={() => navigate("/quiz")}
                sx={{
                    bgcolor: "#FF88DC", // Initial background color
                    borderRadius: "40px",
                    border: "2px solid #FF70C8",
                    width: "10%",
                    color: "rgba(0, 0, 0, 1)",
                    fontFamily: 'Inter',
                    fontSize: '20px',
                    fontWeight: "600",
                    padding: ".7rem",
                    transition: "background-color 0.3s", // Smooth transition
                    "&:hover": {
                        bgcolor: "rgba(139, 81, 184, 1)", // Darker background color on hover
                        borderColor: "rgba(100, 50, 150, 1)", // Darker border on hover
                    }
                }}
            >
                Quiz
            </Button>
        </Box>
    )
}

export default DaySection