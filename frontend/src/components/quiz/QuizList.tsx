import { useEffect, useState } from "react"
import Quiz from "./Quiz"
import { Box, Button } from "@mui/material"

interface QuizInterface {
    id: string,
    question: string,
    answer1: string,
    answer2: string,
    answer3: string,
    answer4: string
}

interface Answer {
    id: string,
    answer: number,
}

function QuizList() {
    
    const [quizes, setQuizes] = useState<QuizInterface[]>([])
    const [nr, setNr] = useState(0)
    
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [selectedAnswers, setSelectedAnswers] = useState([0, 0, 0, 0, 0])

    useEffect(() => {
        setQuizes([
            {
                id: "1",
                question: "Alege 1",
                answer1: "1",
                answer2: "2",
                answer3: "3",
                answer4: "4"
            },
            {
                id: "2",
                question: "Alege 2",
                answer1: "1",
                answer2: "2",
                answer3: "3",
                answer4: "4"
            },
            {
                id: "3",
                question: "Alege 3",
                answer1: "1",
                answer2: "2",
                answer3: "3",
                answer4: "4"
            },
            {
                id: "4",
                question: "Alege 4",
                answer1: "1",
                answer2: "2",
                answer3: "3",
                answer4: "4"
            },
            {
                id: "5",
                question: "Alege",
                answer1: "1",
                answer2: "2",
                answer3: "3",
                answer4: "4"
            }
        ])
    }, [])

    useEffect(() => {
        const sendAnswers = () => {
            console.log(answers)
        }
        
        if (nr === 5)
            sendAnswers()
        
    }, [answers, nr])

    const addAnswer = (id: string, answer: number) => {
        setAnswers((prevAnswers) => [...prevAnswers, {
            id,
            answer
        }]);
    }

    const removeLastAnswer = () => {
        setAnswers((prevAnswers) => prevAnswers.slice(0, -1));
    }

    const setSelectedAnswer = (value: number) => {
        setSelectedAnswers((prevSelectedAnswer) => {
            const newArray = [...prevSelectedAnswer]; // Create a shallow copy
            newArray[nr] = value; // Update the specific position
            return newArray;
          });
    }    

    return(
        <>
            {
            nr < 5 ?
            <Box
                height={"90vh"} // Change the height of the section
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"space-between"}
                alignItems={"center"}
                fontSize={"2rem"}
            >
            {
                <Quiz
                    quiz={quizes[nr]}
                    setSelectedAnswer={setSelectedAnswer}
                    selectedAnswer={selectedAnswers[nr]}
                />
            }
            {
                <Box>
                    <Button
                        onClick={() => {
                            removeLastAnswer()
                            setNr(nr - 1)
                        }}
                        disabled={nr === 0}
                        >
                        Prev Question
                    </Button>

                    <Button
                        onClick={() => {
                            addAnswer(quizes[nr].id, selectedAnswers[nr])
                            setNr(nr + 1)
                        }}
                        disabled={selectedAnswers[nr] === 0}
                        >
                        {nr === 4 ? <>Finish Quiz</> : <>Next Question</>}
                    </Button>
                </Box>
            }
            </Box>
            : 
            <Box
                fontSize={"2rem"}
            >
            </Box>
            }
        </>
    )
}

export default QuizList