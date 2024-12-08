import { Box, Button } from "@mui/material"
import { useEffect } from "react"
import { gsap } from "gsap"
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
        // localStorage.setItem("quizDate", today); // TODO - uncomment this at the end
        navigate("/"); 
    };

    useEffect(() => {
        // Apply fade-in effect when results are available
        if (results) {
            gsap.fromTo(".result-list-wrapper", 
                { opacity: 0 }, 
                { opacity: 1, duration: 1, stagger: 0.5 }
            );
        }
    }, [results]); // Trigger animation when results are loaded

    return (
        <>
        {
            results ?
            <Box
                className="result-list-wrapper" // Wrap everything with a class for GSAP targeting
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
