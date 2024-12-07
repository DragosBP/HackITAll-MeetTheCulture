import { Box } from "@mui/material"

interface ResultProps {
    question: string,
    correct: boolean,
    correctAnswer?: number,
    triviaFact?: string
}

interface Props {
    result: ResultProps
}

function Result({
    result    
}: Props) {

    return (
        <>
        <Box>
            {``}
        </Box>
        </>
    )
}

export default Result