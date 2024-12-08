import { Box, Button } from "@mui/material";
import { QuizInterface } from "../Intrefaces";

interface Props {
    quiz: QuizInterface
    setSelectedAnswer: (value: number) => void,
    selectedAnswer: number
}

function Quiz({
    quiz,
    setSelectedAnswer,
    selectedAnswer
} : Props) {
    return (
        <Box
            width={"100%"}
            height={"100%"}
            padding={"5%"}
        >
            {quiz ? 
            <Box
                display={"flex"}
                flexDirection={"column"}
                width={"100%"}
                height={"100%"}
                gap={"5vh"}
                alignItems={"center"}
            >
                {quiz.question}
                <Box
                    display={"grid"}
                    gridTemplateColumns={"repeat(2, 1fr)"}
                    gridTemplateRows={"repeat(2, 1fr)"}
                    gap={"10%"}
                    width={"80%"}
                    height={"100%"}
                    
                >
                    {[1, 2, 3, 4].map((answerId) => (
                        <Button
                        key={answerId}
                        variant="outlined"
                        onClick={() => setSelectedAnswer(answerId)}
                        sx={{
                            fontSize: "1.5rem",
                            borderColor: answerId === selectedAnswer ? "rgba(139, 81, 184, 1)" : "rgba(139, 81, 184, 0.8)", // Change border color
                            bgcolor: answerId === selectedAnswer ? "rgba(139, 81, 184, 1)" : "rgba(139, 81, 184, 0.8)", // Change background
                            color: answerId === selectedAnswer ? "white" : "black", // Change text color
                            borderRadius: "40px",
                            transition: "all 0.3s", // Smooth transition for the style change
                        }}
                    >
                        {quiz[`a${answerId}` as keyof Quiz]}
                    </Button>
                    
                    ))}
                </Box>
                </Box>
            :
            <Box>
                Loading...
            </Box>
            }
        </Box>
    )
}

export default Quiz