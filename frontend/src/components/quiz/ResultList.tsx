import { ResultProps } from "./Intrefaces"
import Result from "./Result"

interface Props {
    results: ResultProps[]
    selectedAnswers: number[]

}

function ResultList({
    results,
    selectedAnswers
}: Props) {

    return (
        <>
        {
            results ?
            <>
                {
                    results.map((result: ResultProps, index: number) => {
                        <Result 
                            result={result}
                            selectedAnswer={selectedAnswers[index]}
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