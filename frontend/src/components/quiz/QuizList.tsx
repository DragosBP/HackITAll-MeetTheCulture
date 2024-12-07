import { useEffect, useState } from "react"
import Quiz from "./Quiz"
import { Box, Button } from "@mui/material"
import fetch_url from "../../providers/url.provider"
import { QuizInterface, ResultProps } from "./Intrefaces";

interface Answer {
    id: string,
    ans: number,
}

const url: string = fetch_url();

function QuizList() {
    
    const [quizes, setQuizes] = useState<QuizInterface[]>([])
    const [nr, setNr] = useState(0)
    
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [selectedAnswers, setSelectedAnswers] = useState([0, 0, 0, 0, 0])

    const [results, setResults] = useState<ResultProps[]>([])

    useEffect(() => {
        let isFetched = false;

        const func = async () => {
            if (isFetched)
                return

            const response =  await fetch(url + "/quiz/all", {
                method: "get"
            })

            if (response.status === 200) {
                response.json().then((data) => {
                    console.log(data)
                    setQuizes(data)
                })
            }
        }

        func()

        return () => {
            isFetched = true; 
        };
    }, [])

    useEffect(() => {
        const sendAnswers = () => {
            fetch(url + "verify", {
                method: "post",
                headers: {
                    "Content-Type": "application/json" // Ensure the server expects JSON data
                },
                body: JSON.stringify(answers) 
            }).then((response) => {
                if (response.status === 200) {
                    response.json().then((data) => {
                        console.log(data)
                        setResults(data)
                    })
                } else {
                    console.log("Eroare la trimitere de raspunsuri")
                }
            })
        }
        
        if (nr === 5)
            sendAnswers()
        
    }, [answers, nr])

    const addAnswer = (id: string, ans: number) => {
        setAnswers((prevAnswers) => [...prevAnswers, {
            id,
            ans
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