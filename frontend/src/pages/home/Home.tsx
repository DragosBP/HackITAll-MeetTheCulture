import { Button } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Home() {
    const [tookQuiz, setTookQuiz] = useState<null | boolean>(null)

    const navigate = useNavigate()

    useEffect(() => {
        const checkQuizStatus = () => {
            const quizDate = localStorage.getItem("quizDate");
            const today = new Date().toISOString().split("T")[0]; // Get the current date in "YYYY-MM-DD" format

            if (!quizDate) {
                // If no date is stored, user hasn't taken the quiz
                setTookQuiz(false);
            } else if (quizDate === today) {
                // If the stored date matches today's date, user has taken the quiz
                setTookQuiz(true);
            } else {
                // If the stored date is different, update it to today's date
                setTookQuiz(false);
            }
        };

        checkQuizStatus();
    }, [])

    return (
        <>
            {
            tookQuiz !== null ?
                <>
                    {
                        !tookQuiz ? 
                        <>
                            <Button
                                onClick={() => navigate("/quiz")}
                            >
                                Take today's quiz
                            </Button>
                        </>
                        :
                        <>
                            You already took the quiz today
                        </>
                    }
                </>
            : 
            <>
                Loading
            </>
            }
        </>
    )
}

export default Home