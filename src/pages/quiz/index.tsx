import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import RootLayout from "@/app/layout";
import importQuestions from "@/data/questions.json";
import importScoring from "@/data/scoring.json";
import { IAnswer, IQuestion } from "@/interfaces/questions";
import { IScoring } from "@/interfaces/scoring";
import Notiflix from "notiflix";
import Image from "next/image";

function Quiz() {
    const [questionId, setQuestionId] = useState(0);
    const [question, setQuestion] = useState({} as IQuestion);
    const [questions, setQuestions] = useState([] as Array<IQuestion>);
    const [results, setResults] = useState({
        good: 0,
        bad: 0,
    });

    useEffect(() => {
        setQuestions(importQuestions);
    }, []);

    useEffect(() => {
        let num = Math.floor(Math.random() * questions.length);
        setQuestionId(num);
    }, [questions]);

    useEffect(() => {
        setQuestion(questions[questionId]);
        setQuestion((prevState) => ({
            ...prevState,
            ...questions[questionId],
        }));
    }, [questionId, questions]);

    const answerClick = (answer: IAnswer) => {
        if (answer.id === question.correctAnswer) {
            Notiflix.Notify.success("Jó válasz!");
            setResults((prepState) => ({
                ...prepState,
                good: prepState.good + 1,
            }));
        } else {
            Notiflix.Notify.failure("Rossz válasz!");
            setResults((prepState) => ({
                ...prepState,
                bad: prepState.bad + 1,
            }));
        }

        setQuestions(questions.filter((q) => q.id !== question.id));
    };
    let point = importScoring.find((p: IScoring) =>{ return p.id === 1}) || importScoring[0];
    if ((results.bad+results.good)===5) {
        point = importScoring.find((p: IScoring) =>{ return p.id === results.good}) || importScoring[4];
    }
    return (
        <RootLayout>
            {questions.length > 0 && results.good + results.bad < 5 ? (
                <>
                    <Card.Header>
                        <h2 className="d-flex justify-content-center">{question.question}</h2>
                        <br />
                        <h3>{results.good + results.bad}/5</h3>
                    </Card.Header>
                    <Card.Body>
                        <Container>
                            <Row>
                                {question.answers &&
                                    question.answers.map((a) => (
                                        <Col
                                            sm={12}
                                            md={6}
                                            className="text-center py-5 answer"
                                            onClick={() => {
                                                answerClick(a);
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
                                <Col ms={6}>
                                    <Image
                                        src={point.image}
                                        width={200}
                                        height={200}
                                        alt="Pont kép"
                                    />
                                </Col>
                                <Col sm={6} className="p-2">
                                    <h5>{point.title}  5/{results.good}</h5>
                                    <h6>{point.description}</h6>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="d-flex justify-content-center">
                                    <Button id="AllButton" onClick={() => { location.href = "/"; }}>
                                        Vissza a fő oldalra
                                    </Button>
                                </Col>
                            </Row>
                        </Container>
                    </Card.Body>
                </>
            )}
        </RootLayout>
    );
}

export default Quiz;
