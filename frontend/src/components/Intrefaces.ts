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
    a1: string,
    a2: string,
    a3: string,
    a4: string
    ca: number
    correct: boolean
}

export interface SongInterface {
    name: string
    artist: string
    country: string
    img: string
    link: string
}
