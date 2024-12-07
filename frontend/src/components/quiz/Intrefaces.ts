export interface QuizInterface {
    id: string,
    question: string,
    a1: string,
    a2: string,
    a3: string,
    a4: string
}

export interface ResultProps {
    question: string,
    correct: boolean,
    correctAnswer?: number,
    triviaFact?: string
}
