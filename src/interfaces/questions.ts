export interface IQuestion {
    id: number;
    question: string;
    correctAnswer: number;
    answers: Array<IAnswer>;
}

export interface IAnswer {
    id: number;
    answer: string;
}