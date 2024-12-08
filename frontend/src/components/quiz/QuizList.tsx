import { useEffect, useState } from "react"
import Quiz from "./Quiz"
import { Box, Button } from "@mui/material"
import fetch_url from "../../providers/url.provider"
import { QuizInterface, ResultProps } from "../Intrefaces";
import ResultList from "./ResultList";
import Blob from "./assets/Group.svg"


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
            } else {
                console.log("Problem with fetching quizes")
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
            <Box
                zIndex={0}
                position={"absolute"}
                maxHeight={"100vh"}
                width={"100%"}
                overflow={"hidden"}
            >
                <img width={"100%"} src={Blob} />
            </Box>
            <Box
                bgcolor={"rgba(251, 255, 241, 1)"}
                height={"100%"}
                width={"100%"}
                color={"black"}
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"center"}
            >
                {
                nr < 5 ?
                <Box
                    height={"90vh"} // Change the height of the section
                    width={"90%"}
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    fontSize={"2rem"}
                    zIndex={2}
                >
                {
                    <Quiz
                        quiz={quizes[nr]}
                        setSelectedAnswer={setSelectedAnswer}
                        selectedAnswer={selectedAnswers[nr]}
                    />
                }
                {
                    <Box 
                        display={"flex"}
                        gap={"2rem"}
                    >
                        <Button
                            onClick={() => {
                                removeLastAnswer()
                                setNr(nr - 1)
                            }}
                            disabled={nr === 0}
                            sx={{
                                bgcolor: nr === 0 ? "grey" : "rgba(67, 67, 238, 1)",
                                color: "black",
                                borderRadius: "25px",
                                fontSize: "1.2rem",
                                width: "15rem",
                                transition: "background-color 0.3s", // Smooth transition for hover effect
                                "&:hover": {
                                    bgcolor: selectedAnswers[nr] === 0 ? "darkgrey" : "rgba(50, 50, 200, 1)", // Slightly darker shade on hover
                                }
                            }}
                            >
                            Prev Question
                        </Button>

                        <Button
                            onClick={() => {
                                addAnswer(quizes[nr].id, selectedAnswers[nr])
                                setNr(nr + 1)
                            }}
                            disabled={selectedAnswers[nr] === 0}
                            sx={{
                                color: "black",
                                bgcolor: selectedAnswers[nr] === 0 ? "grey" : "rgba(67, 67, 238, 1)",
                                borderRadius: "25px",
                                width: "15rem",
                                fontSize: "1.2rem",
                                transition: "background-color 0.3s", // Smooth transition for hover effect
                                "&:hover": {
                                    bgcolor: selectedAnswers[nr] === 0 ? "darkgrey" : "rgba(50, 50, 200, 1)", // Slightly darker shade on hover
                                }
                            }}
                            >
                            {nr === 4 ? <>Finish Quiz</> : <>Next Question</>}
                        </Button>
                    </Box>
                }
                </Box>
                : 
                <ResultList 
                    results={results}
                    selectedAnswers={selectedAnswers}
                />
                }
            </Box>
        </>
    )
}

export default QuizList