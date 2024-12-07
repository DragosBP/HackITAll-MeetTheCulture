import Result from "./Result"

interface ResultProps {
    question: string,
    correct: boolean,
    correctAnswer?: number,
    triviaFact?: string
}

interface Props {
    results: ResultProps[]
    selectedAnswers: number[]

}

function ResultList({
    results
}: Props) {

    return (
        <>
        {
            results ?
            <>
                {
                    results.map((result: ResultProps) => {
                        <Result 
                            result={result}
                        />
                    })
                }
            </> : 
            <>
                Loading
            </>
        }
        </>
    )
}

export default ResultList