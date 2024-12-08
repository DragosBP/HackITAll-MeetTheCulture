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
                justifyContent={"space-around"}
                alignContent={"center"}
                width={"100%"}
                >
                <Box
                    gap={"3rem"}
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"space-around"}
                    alignItems={"center"}
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
                    sx={{
                        color: "black",
                        bgcolor: "rgba(67, 67, 238, 1)",
                        borderRadius: "25px",
                        width: "15rem",
                        fontSize: "1.2rem",
                        alignSelf: "center"
                    }}
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