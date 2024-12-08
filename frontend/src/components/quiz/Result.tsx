import { Box } from "@mui/material"
import { ResultProps } from "../Intrefaces"
import { useState } from "react"

interface Props {
    result: ResultProps
    selectedAnswer: number
}

function Result({
    result,
    selectedAnswer
}: Props) {

    const [isCorrect] = useState(result.ca === selectedAnswer)

    return (
        <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            bgcolor={"rgba(139, 81, 184, 0.8)"}
            borderRadius={"40px"}
            width={"80%"}
        >
            <Box
                width={"50%"}
                alignSelf={"center"}
            >
                {`
                Question: ${result.question}
                `}
            </Box>
            <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                width={"50%"}
            >
                <Box
                    color={result.ca === 1 ? "green" : isCorrect || selectedAnswer !== 1 ? "black" : "red"}
                >
                    {result.a1}
                </Box>
                <Box
                    color={result.ca === 2 ? "green" : isCorrect || selectedAnswer !== 2 ? "black" : "red"}
                >
                    {result.a2}
                </Box>
                <Box
                    color={result.ca === 3 ? "green" : isCorrect || selectedAnswer !== 3 ? "black" : "red"}
                >
                    {result.a3}
                </Box>
                <Box
                    color={result.ca === 4 ? "green" : isCorrect || selectedAnswer !== 4 ? "black" : "red"}
                >
                    {result.a4}
                </Box>
            </Box>
        </Box>
    )
}

export default Result