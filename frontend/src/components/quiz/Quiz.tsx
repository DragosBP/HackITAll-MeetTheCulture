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
        <>
            {quiz ? 
            <Box
                display={"flex"}
                flexDirection={"column"}
                width={"80%"}
                height={"80%"}
                gap={"5vh"}
            >
                {quiz.question}
                <Box
                    display={"grid"}
                    gridTemplateColumns={"repeat(2, 1fr)"}
                    gridTemplateRows={"repeat(2, 1fr)"}
                    gap={"10%"}
                    width={"100%"}
                    height={"100%"}
                    
                >
                    {[1, 2, 3, 4].map((answerId) => (
                        <Button
                            key={answerId}
                            variant="outlined"
                            onClick={() => setSelectedAnswer(answerId)}
                            sx={{
                                fontSize: "1.5rem",
                                borderColor: answerId === selectedAnswer ? "green" : "pink",
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
        </>
    )
}

export default Quiz