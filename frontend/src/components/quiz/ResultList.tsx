import { Box, Button } from "@mui/material"
import { ResultProps } from "../Intrefaces"
import Result from "./Result"
import { useNavigate } from "react-router-dom"

interface Props {
    results: ResultProps[]
    selectedAnswers: number[]

}

function ResultList({
    results,
    selectedAnswers
}: Props) {

    const navigate = useNavigate();

    const redirectToHome = () => {
        const today = new Date().toISOString().split("T")[0];
        // localStorage.setItem("quizDate", today); // TODO - uncomment tis at the end
        navigate("/"); 
    };

    return (
        <>
        {
            results ?
            <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"space-between"}
                alignContent={"center"}
                gap={"70vh"}
            >
                <Box
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"space-around"}
                >
                    {results.map((result: ResultProps, index: number) => (
                        <Result 
                            result={result}
                            selectedAnswer={selectedAnswers[index]}
                            key={index}
                        />
                    ))}
                    
                </Box>
                <Button
                    onClick={redirectToHome}
                >
                    Return Home
                </Button>
            </Box>
            :
            <>
                Loading
            </>
        }
        </>
    )
}

export default ResultList