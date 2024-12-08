import { Box } from "@mui/material"
import { useEffect, useState } from "react"
import Blob from "./assets/Group.svg"
import TakeQuiz from "./TakeQuiz"
import Title from "./Title"
import Navbar from "../../components/navbar/Navbar"

function Home() {
    const [tookQuiz, setTookQuiz] = useState<null | boolean>(null)


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
        <Box
            bgcolor={"#fdf5ea"}
            height={"100%"}
            width={"100%"}
        >
            <Navbar 
                isHome={true}
                isLearn={false}
                isAbout={false}
            />
            <Box
                zIndex={0}
                position={"absolute"}
                top={0}
                left={0}
                width={"100vw"} // Full viewport width
                height={"100vh"} // Full viewport height
                overflow={"hidden"}
            >
                <img 
                    src={Blob} 
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover", // Ensures the image covers the container
                    }} 
                />
            </Box>

            <Box
                zIndex={2}
            >
                {
                tookQuiz !== null ?
                    <>
                        {
                            !tookQuiz ? 
                            <>
                            <TakeQuiz />
                            <Title />
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
            </Box>
        </Box>
    )
}

export default Home