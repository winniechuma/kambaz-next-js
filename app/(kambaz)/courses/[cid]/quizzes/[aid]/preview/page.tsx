"use client";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import { Button, FormCheck, FormControl } from "react-bootstrap";
import { useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useEffect } from "react";
import * as client from "../../client";

export default function QuizPreview() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const quiz: any = quizzes.find((q: any) => q._id === aid);
  const [answers, setAnswers] = useState<{[key: string]: any}>({});
  const [submitted, setSubmitted] = useState(false);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const [attempts, setAttempts] = useState<any[]>([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchAttempts = async () => {
      if (aid) {
        const data = await client.getAttempts(aid as string);
        setAttempts(data);
        if (data.length > 0) {
          // this is loading the last attempt
          setAnswers(data[0].answers);
          setScore(data[0].score);
          setSubmitted(true);
        }
      }
    };
    fetchAttempts();
  }, [aid]);
  if (!quiz) return <div className="p-4">Quiz not found.</div>;
  const isStudent = currentUser?.role === "STUDENT";
  const attemptsExhausted = isStudent && !quiz.multipleAttempts && attempts.length >= 1
    || isStudent && quiz.multipleAttempts && attempts.length >= quiz.numAttempts;

  const handleSubmit = async () => {
    const calculatedScore = quiz.questions?.filter((q: any) => {
      if (q.type === "Fill in the Blank") {
        return q.correctAnswers?.map((a: string) => a.toLowerCase()).includes(answers[q._id]?.toLowerCase());
      }
      return answers[q._id] === q.correctAnswer;
    }).length;

    setScore(calculatedScore);
    setSubmitted(true);
    await client.saveAttempt(aid as string, answers, calculatedScore);
    const updated = await client.getAttempts(aid as string);
    setAttempts(updated);
  };

  return (
    <div className="p-4">
      <h2>{quiz.title}</h2>
      <p className="text-muted">
        {isStudent ? "Quiz" : "This is a preview of the quiz as students will see it."}
      </p>
      {attempts.length > 0 && isStudent && (
        <p className="fw-bold">
          Last attempt score: {score} / {quiz.questions?.length} &nbsp;
          ({attempts.length} attempt{attempts.length > 1 ? "s" : ""} taken)

        </p>
      )}
      {attempts.length > 0 && isStudent &&(
        <p className="fw-bold">
          Last attempt Date: {attempts[0]?.takenAt ? new Date(attempts[0].takenAt).toLocaleString() : "N/A"}
        </p>
      )}

      {attemptsExhausted && isStudent &&(
        <div className="alert alert-warning">
          You have used all your attempts for this quiz.
        </div>
      )}
      <hr />
      {submitted && (
            <p className="text-muted mt-3">
                {/* Quiz Score: {quiz.questions?.filter((q: any) => answers[q._id] === q.correctAnswer).length} / {quiz.questions?.length} */}
               Quiz Score: {quiz.questions?.filter((q: any) => (answers ?? {})[q._id] === q.correctAnswer).length ?? 0} / {quiz.questions?.length ?? 0}
            </p>
      )}

      {quiz.questions?.map((q: any, index: number) => (
        <div key={q._id} className="border p-3 mb-3">
          <p className="fw-bold">Question {index + 1} ({q.points} pts)</p>
          <p>{q.question}</p>

          {q.type === "Multiple Choice" && (
            <div>
              {q.choices?.map((choice: string, i: number) => (
                <div key={i} className="d-flex align-items-center">
                <FormCheck 
                key={i} 
                type="radio" 
                name={q._id} 
                label={choice} 
                checked={(answers ?? {})[q._id] === i}
                onChange={() => !submitted && !attemptsExhausted && setAnswers({ ...answers, [q._id]: i })}
                disabled={submitted || attemptsExhausted}
        />
        {submitted && i === q.correctAnswer && <FaCheckCircle className="text-success ms-2"> </FaCheckCircle>}
        {submitted && (answers ?? {})[q._id] === i && i !== q.correctAnswer && <FaTimesCircle className="text-danger ms-2"> </FaTimesCircle>}
        </div>
              ))}
            </div>
          )}

          {q.type === "True/False" && (
            <div>
             <div className="d-flex align-items-center">
              <FormCheck type="radio" name={q._id} label="True" 
                checked={(answers ?? {})[q._id] === true}
                onChange={() => !submitted && !attemptsExhausted && setAnswers({ ...answers, [q._id]: true })}
                  disabled={submitted || attemptsExhausted}
              />
              {submitted && q.correctAnswer === true && <FaCheckCircle className="text-success ms-2" />}
              {submitted && (answers ?? {})[q._id] === true && q.correctAnswer !== true && <FaTimesCircle className="text-danger ms-2" />}
              </div>
            <div className="d-flex align-items-center">
              <FormCheck type="radio" name={q._id} label="False" 
                checked={(answers ?? {})[q._id] === false}
                onChange={() => !submitted && !attemptsExhausted && setAnswers({ ...answers, [q._id]: false })}
                disabled={submitted || attemptsExhausted}
              />
              {submitted && q.correctAnswer === false && <FaCheckCircle className="text-success ms-2" />}
              {submitted && (answers ?? {})[q._id] === false && q.correctAnswer !== false && <FaTimesCircle className="text-danger ms-2" />}
            </div>
         </div>

          )}

          {q.type === "Fill in the Blank" && (
              <div>
            <FormControl placeholder="Your answer here" 
            value={(answers ?? {})[q._id] || ""}
            onChange={(e) => !submitted && !attemptsExhausted && setAnswers({ ...answers, [q._id]: e.target.value })}
            disabled={submitted || attemptsExhausted}
           />
            {submitted && (
               q.correctAnswers?.map((a: string) => a.toLowerCase()).includes(answers[q._id]?.toLowerCase())
            ? <FaCheckCircle className="text-success mt-1" />
            : <FaTimesCircle className="text-danger mt-1" />
          )}
             </div>
          )}
          </div>  
        ))}
      <div className="d-flex justify-content-end gap-2 mt-3">
            <Button variant="secondary" onClick={() => router.push(`/courses/${cid}/quizzes/${aid}`)}>
              Back to Details
            </Button>
            {!isStudent && (
            <Button variant="danger" onClick={() => router.push(`/courses/${cid}/quizzes/${aid}/editor`)}>
                Edit Quiz
            </Button>
            )}
     
        {/* {!submitted && (
          <Button variant="danger" onClick={() => setSubmitted(true)}>
            Submit Quiz
          </Button>
        )}
        {submitted && (
            <Button variant="secondary" onClick={() => router.push(`/courses/${cid}/quizzes/`)}>
              Back
            </Button> */}
        {/* )}
         */}
         {!attemptsExhausted && submitted && quiz.multipleAttempts && attempts.length < quiz.numAttempts && (
          <Button variant="warning" onClick={() => {
            setAnswers({});
            setSubmitted(false);
          }}>
            Retake Quiz
          </Button>
        )}
        {!submitted && !attemptsExhausted && (
          <Button variant="danger" onClick={handleSubmit}>
            Submit Quiz
          </Button>
        )}
      </div>
    </div>
  );
}