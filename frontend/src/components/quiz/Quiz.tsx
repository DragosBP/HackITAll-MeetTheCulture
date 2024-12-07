import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react"

interface Quiz {
    question: string,
    answer1: string,
    answer2: string,
    answer3: string,
    answer4: string
}

function Quiz() {
    const [quiz, setQuiz] = useState<Quiz>();
    const [disabled, setDisabled] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState(0)
    const [givenAnswer, setgivenAnswer] = useState(0)

    useEffect(() => {
        setQuiz({
            question: "Alege 1",
            answer1: "1",
            answer2: "2",
            answer3: "3",
            answer4: "4"
        })
    }, [])

    const fetchCorrectAnswer = (): number => {
        return 1;
    };
    
    const checkAnswer = async (id: number) => {
        const answer = fetchCorrectAnswer(); // Ensure async behavior for clarity
        setDisabled(true);
        setCorrectAnswer(answer)

        // Use the "id" comparison here, since the state may not have updated
        setgivenAnswer(id)
        if (id === answer) { // Hard-code or pass the updated answer instead
            isCorrect(id);
        } else {
            isWrong(id);
        }
    };
    

    const isCorrect = (id: number) => {
        console.log("DAAAAA " + id)
    }

    const isWrong = (id: number) => {
        console.log("NUUUUU " + id)
    }
    return (
        <>
            {quiz ? 
            <Box
                
            >
                {quiz.question}
                <Box>
                    {[1, 2, 3, 4].map((answerId) => (
                        <Button
                            key={answerId}
                            variant="outlined"
                            onClick={() => checkAnswer(answerId)}
                            disabled={disabled}
                            sx={{
                                borderColor: "pink",
                                ":disabled": {
                                    borderColor: answerId === correctAnswer ? "green" : givenAnswer === answerId ? "red" : "gray"
                                }
                            }}
                        >
                            {quiz[`answer${answerId}` as keyof Quiz]}
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