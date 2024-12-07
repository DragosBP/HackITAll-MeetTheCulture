import { Box } from "@mui/material"
import { ResultProps } from "./Intrefaces"
import { useEffect, useState } from "react"

interface Props {
    result: ResultProps
    selectedAnswer: number
}

function Result({
    result,
    selectedAnswer
}: Props) {

    const [answer, setAnswer] = useState("")
    const [correct, setCorrect] = useState("") 

    useEffect(() => {
        const updateAns = () => {
            if (selectedAnswer === 1) {
                setAnswer(result.a1)
                return
            }
            if (selectedAnswer === 2) {
                setAnswer(result.a2)
                return
            }
            if (selectedAnswer === 3) {
                setAnswer(result.a3)
                return
            }
            if (selectedAnswer === 4) {
                setAnswer(result.a4)
                return
            }
        }

        const updateCor = () => {
            if (result.ca === 1) {
                setCorrect(result.a1)
                return
            }
            if (result.ca === 2) {
                setCorrect(result.a2)
                return
            }
            if (result.ca === 3) {
                setCorrect(result.a3)
                return
            }
            if (result.ca === 4) {
                setCorrect(result.a4)
                return
            }
        }

        updateAns()
        updateCor()
    }, [result.a1, result.a2, result.a3, result.a4, result.ca, selectedAnswer])

    return (
        <>
            <Box>
                {`
                Question: ${result.question}
                `}
            </Box>
            {
                result.correct ? 
                <Box
                    color={"green"}
                >
                    {`
                    Your Answer: ${answer}
                    `}
                </Box>
                :
                <>
                    <Box
                        color={"red"}    
                    >
                        {`
                        Your Answer: ${answer}
                        `}
                    </Box>

                    <Box>
                        {`
                        Your Answer: ${correct}
                        `}
                    </Box>
                </>
            }
        </>
    )
}

export default Result