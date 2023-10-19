import { Card, Container, Row, Col, Button} from "react-bootstrap";
import RootLayout from "@/app/layout";
import importQuestions from "@/data/questions.json"
import { useState, useEffect, use } from 'react'
import { IAnswer, IQuestion } from "@/interfaces/questions";
import Notiflix from "notiflix";
import Image from "next/image";

function Quiz() {
    const [questionId, setQuestionId] = useState(0);
    const [question, setQuestion] = useState({} as IQuestion);
    //let questions = [];
    const [questions, setQuestions] = useState([] as Array<IQuestion>);
    const [results, setResults] = useState({
        good: 0,
        bad: 0
    })

    useEffect(() => {
        setQuestions(importQuestions);
        let num = 0;
        num = Math.floor(Math.random() * questions.length)
        setQuestionId(num);
    }, [])

    useEffect(() => {
        setQuestion(questions[questionId]); // egyszerű adatszerkezet
        // összetett adatszerkezet (tömb, objektum)
        setQuestion((prevState) => ({
            ...prevState, // a.a,a.b,a.c
            ...questions[questionId]
        }))
    }, [questionId, questions])

    const answerClick = (answer: IAnswer) => {
        //1 == "1" - true
        //1 === "1" - false
        if (answer.id === question.correctAnswer) {
            Notiflix.Notify.success("Jó válasz!")
            setResults((prepState) => ({
                ...prepState,
                good: prepState.good + 1
            }))
        } else {
            Notiflix.Notify.failure("Rossz válasz!")
            setResults((prepState) => ({
                ...prepState,
                bad: prepState.bad + 1
            }))
        }

        //questions.splice(questionId, 1);
        setQuestions(questions.filter(q => q.id !== question.id))
    }

    return (
        <RootLayout>
            {questions.length > 0 && results.good+results.bad < 5 ? (
                <>
                    <Card.Header>
                        <h2 className="d-flex justify-content-center">{question.question}</h2>
                        <br/>
                        <h3>5/{results.good+results.bad}</h3>
                    </Card.Header>
                    <Card.Body>
                        <Container>
                            <Row>
                                {question.answers && question.answers.map(a => (
                                    <Col
                                        sm={12}
                                        md={6}
                                        className="text-center py-5 answer"
                                        onClick={() => {
                                            answerClick(a)
                                        }}
                                        key={a.id}
                                    >
                                        {a.answer}
                                    </Col>
                                ))}
                            </Row>
                        </Container>
                    </Card.Body>
                </>
            ) : (
                <>
                    <Card.Header>
                        <h2>Köszönjük, hogy játszottál velünk!</h2>
                        <h4>Szeretettel várunk a nyílt napunkon!</h4>
                    </Card.Header>
                    <Card.Body>
                        <Container>
                            <Row>
                                <Col ms={6}> <Image src={"/logo.png"} width={200} height={200} alt="Logo"/></Col>
                                <Col sm={6} className="p-2">
                                    <h3>Jó válaszok: {results.good}</h3>
                                    <h3>Rossz válaszok: {results.bad}</h3>

                                    </Col>

                            </Row>
                                <Row>
                                <Col className="d-flex justify-content-center">
                                    <Button id="AllButton" onClick={() => {
                                        location.href="/"
                                    }}>Vissza a fő oldalra</Button>
                                </Col>
                            </Row>
                        </Container>
                    </Card.Body>
                </>
            )}
        </RootLayout>
    );
}

export default Quiz