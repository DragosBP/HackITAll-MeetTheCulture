import { Box, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

function TakeQuiz() {
    const navigate = useNavigate()

    return (
        <Box
            position={"absolute"}
            zIndex={5}
            left={"75%"}
            top={"20%"}
            color={"rgba(255, 255, 255, 1)"}
            width={"20rem"}
            display={"flex"}
            flexDirection={"column"}
            gap={"1rem"}

        >
            <Box
                fontFamily={"Inter"}
                fontSize={"36px"}
                fontWeight={"700"}
                textAlign={"right"}
                
            >
            Test your knowledge
            </Box>
            <Button
                onClick={() => navigate("/quiz")}
                sx={{
                    bgcolor: "rgba(139, 81, 184, 0.8)", // Initial background color
                    borderRadius: "40px",
                    width: "60%",
                    marginLeft: "40%",
                    color: "rgba(0, 0, 0, 1)",
                    fontFamily: 'Inter',
                    fontSize: '20px',
                    fontWeight: "600",
                    padding: ".7rem",
                    transition: "background-color 0.3s", // Smooth transition
                    "&:hover": {
                        bgcolor: "rgba(139, 81, 184, 1)", // Darker background color on hover
                    }
                }}
            >
                Quiz
            </Button>
        </Box>
    )
}

export default TakeQuiz