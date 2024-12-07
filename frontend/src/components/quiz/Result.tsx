import { Box } from "@mui/material"
import { ResultProps } from "./Intrefaces"

interface Props {
    result: ResultProps
}

function Result({
    result    
}: Props) {

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
                    Your Answer: ${result.question}
                    `}
                </Box>
                :
                <>
                    <Box>
                        {`
                        Your Answer: ${result.question}
                        Correct Answer: ${result.question}
                        `}
                    </Box>
                </>
            }
        </>
    )
}

export default Result