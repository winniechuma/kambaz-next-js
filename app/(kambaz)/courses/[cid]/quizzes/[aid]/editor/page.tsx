"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button, FormControl, FormLabel, FormSelect, FormCheck, Nav } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../../store";

import { setQuizzes } from "../../reducer";
import * as client from "../../client";
import { v4 as uuidv4 } from "uuid";

export default function QuizEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const existingQuiz: any = quizzes.find((a: any) => a._id === aid);
  const isNew = aid === "new";

  const [activeTab, setActiveTab] = useState("details");

  const [title, setTitle] = useState(existingQuiz?.title || "");
  const [description, setDescription] = useState(existingQuiz?.description || "");
  const [points, setPoints] = useState(existingQuiz?.points || 100);
  const [dueDate, setDueDate] = useState(existingQuiz?.dueDate || "");
  const [availableFromDate, setAvailableFromDate] = useState(existingQuiz?.availableFromDate || "");
  const [availableUntilDate, setAvailableUntilDate] = useState(existingQuiz?.availableUntilDate || "");
  const [quizType, setQuizType] = useState(existingQuiz?.quizType || "Graded Quiz");
  const [assignmentGroup, setAssignmentGroup] = useState(existingQuiz?.assignmentGroup || "Quizzes");
  const [shuffleAnswers, setShuffleAnswers] = useState(existingQuiz?.shuffleAnswers ?? true);
  const [timeLimit, setTimeLimit] = useState(existingQuiz?.timeLimit || 20);
  const [multipleAttempts, setMultipleAttempts] = useState(existingQuiz?.multipleAttempts ?? false);
  const [numAttempts, setNumAttempts] = useState(existingQuiz?.numAttempts || 1);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(existingQuiz?.showCorrectAnswers || "Immediately");
  const [accessCode, setAccessCode] = useState(existingQuiz?.accessCode || "");
  const [oneQuestionAtATime, setOneQuestionAtATime] = useState(existingQuiz?.oneQuestionAtATime ?? true);
  const [webcamRequired, setWebcamRequired] = useState(existingQuiz?.webcamRequired ?? false);
  const [lockQuestions, setLockQuestions] = useState(existingQuiz?.lockQuestions ?? false);
  const [questions, setQuestions] = useState<any[]>(existingQuiz?.questions || []);

  const totalPoints = questions.reduce((sum: number, q: any) => sum + (q.points || 0), 0);

  const buildQuizObject = () => ({
    title, description, points: totalPoints, dueDate, availableFromDate, availableUntilDate,
    quizType, assignmentGroup, shuffleAnswers, timeLimit, multipleAttempts,
    numAttempts, showCorrectAnswers, accessCode, oneQuestionAtATime,
    webcamRequired, lockQuestions, questions, course: cid,
  });

  const handleSave = async () => {
    if (isNew && quizType) {
      const newQuiz = await client.createQuiz(cid as string, buildQuizObject());
      dispatch(setQuizzes([...quizzes, newQuiz]));
    } else {
      const updatedQuiz = { ...existingQuiz, ...buildQuizObject() };
      await client.updateQuiz(updatedQuiz);
      dispatch(setQuizzes(quizzes.map((a: any) => a._id === aid ? updatedQuiz : a)));
    }
    router.push(`/courses/${cid}/quizzes`);
  };

  const handleSaveAndPublish = async () => {
    if (isNew) {
      const newQuiz = await client.createQuiz(cid as string, { ...buildQuizObject(), published: true });
      dispatch(setQuizzes([...quizzes, newQuiz]));
    } else {
      const updatedQuiz = { ...existingQuiz, ...buildQuizObject(), published: true };
      await client.updateQuiz(updatedQuiz);
      dispatch(setQuizzes(quizzes.map((a: any) => a._id === aid ? updatedQuiz : a)));
    }
    router.push(`/courses/${cid}/quizzes`);
  };

  const handleCancel = () => router.push(`/courses/${cid}/quizzes`);

  const addQuestion = () => {
    const newQuestion = {
      _id: uuidv4(),
      type: "Multiple Choice",
      title: "New Question",
      question: "",
      points: 1,
      choices: ["", "", "", ""],
      correctAnswer: 0,
      editing: true,
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (id: string, updates: any) => {
    setQuestions(questions.map((q) => q._id === id ? { ...q, ...updates } : q));
  };

  const deleteQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q._id !== id));
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="fw-bold">Points {totalPoints}</span>
        <span className="text-muted">{existingQuiz?.published ? "✅ Published" : "🚫 Not Published"}</span>
      </div>

      <Nav variant="tabs" className="mb-3">
        <Nav.Item>
          <Nav.Link active={activeTab === "details"} onClick={() => setActiveTab("details")}>Details</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link active={activeTab === "questions"} onClick={() => setActiveTab("questions")}>Questions</Nav.Link>
        </Nav.Item>
      </Nav>

      {activeTab === "details" && (
        <div>
          <FormLabel htmlFor="wd-name">Name Quiz</FormLabel>
          <FormControl id="wd-name" value={title} onChange={(e) => setTitle(e.target.value)} className="mb-3" />

          <FormLabel htmlFor="wd-description">Quiz Instructions</FormLabel>
          <FormControl as="textarea" id="wd-description" rows={4} value={description}
            onChange={(e) => setDescription(e.target.value)} className="mb-3" />

          <div className="row mb-3">
            <FormLabel>Quiz Type</FormLabel>
            <FormSelect value={quizType} onChange={(e) => setQuizType(e.target.value)} className="mb-3">
              <option>Graded Quiz</option><option>Practice Quiz</option>
              <option>Graded Survey</option><option>Ungraded Survey</option>
            </FormSelect>

            <FormLabel htmlFor="wd-points">Points</FormLabel>
            <FormControl id="wd-points" type="number" value={totalPoints}
              readOnly className="mb-3" />

            <FormLabel>Assignment Group</FormLabel>
            <FormSelect value={assignmentGroup} onChange={(e) => setAssignmentGroup(e.target.value)} className="mb-3">
              <option>Quizzes</option><option>Exams</option>
              <option>Assignments</option><option>Project</option>
            </FormSelect>

            <FormLabel>Shuffle Answers</FormLabel>
            <FormSelect value={shuffleAnswers ? "Yes" : "No"}
              onChange={(e) => setShuffleAnswers(e.target.value === "Yes")} className="mb-3">
              <option>Yes</option><option>No</option>
            </FormSelect>

            <FormLabel>Time Limit (minutes)</FormLabel>
            <FormControl type="number" value={timeLimit}
              onChange={(e) => setTimeLimit(Number(e.target.value))} className="mb-3" />

            <FormLabel>Multiple Attempts</FormLabel>
            <FormSelect value={multipleAttempts ? "Yes" : "No"}
              onChange={(e) => setMultipleAttempts(e.target.value === "Yes")} className="mb-3">
              <option>No</option><option>Yes</option>
            </FormSelect>

            {multipleAttempts && (
              <>
                <FormLabel>How Many Attempts</FormLabel>
                <FormControl type="number" min={1} value={numAttempts}
                  onChange={(e) => setNumAttempts(Number(e.target.value))} className="mb-3" />
              </>
            )}

            <FormLabel>Show Correct Answers</FormLabel>
            <FormSelect value={showCorrectAnswers}
              onChange={(e) => setShowCorrectAnswers(e.target.value)} className="mb-3">
              <option>Immediately</option><option>After Due Date</option><option>Never</option>
            </FormSelect>

            <FormLabel>Access Code</FormLabel>
            <FormControl value={accessCode} onChange={(e) => setAccessCode(e.target.value)} className="mb-3" />

            <FormLabel>One Question at a Time</FormLabel>
            <FormSelect value={oneQuestionAtATime ? "Yes" : "No"}
              onChange={(e) => setOneQuestionAtATime(e.target.value === "Yes")} className="mb-3">
              <option>Yes</option><option>No</option>
            </FormSelect>

            <FormLabel>Webcam Required</FormLabel>
            <FormSelect value={webcamRequired ? "Yes" : "No"}
              onChange={(e) => setWebcamRequired(e.target.value === "Yes")} className="mb-3">
              <option>No</option><option>Yes</option>
            </FormSelect>

            <FormLabel>Lock Questions After Answering</FormLabel>
            <FormSelect value={lockQuestions ? "Yes" : "No"}
              onChange={(e) => setLockQuestions(e.target.value === "Yes")} className="mb-3">
              <option>No</option><option>Yes</option>
            </FormSelect>
          </div>

          <div className="row mb-3">
            <div className="col-9">
              <div className="border p-3">
                <FormLabel htmlFor="wd-due-date" className="fw-bold">Due</FormLabel>
                <FormControl id="wd-due-date" type="datetime-local" value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)} className="mb-3" />
                <div className="row">
                  <div className="col-6">
                    <FormLabel className="fw-bold">Available from</FormLabel>
                    <FormControl type="datetime-local" value={availableFromDate}
                      onChange={(e) => setAvailableFromDate(e.target.value)} />
                  </div>
                  <div className="col-6">
                    <FormLabel className="fw-bold">Until</FormLabel>
                    <FormControl type="datetime-local" value={availableUntilDate}
                      onChange={(e) => setAvailableUntilDate(e.target.value)} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "questions" && (
        <div>
          {questions.length === 0 && (
            <p className="text-muted">No questions yet. Click + New Question to add one.</p>
          )}

          {questions.map((q: any) => (
            <div key={q._id} className="border p-3 mb-3">
              <div className="d-flex justify-content-between mb-2">
                <FormControl value={q.title} onChange={(e) => updateQuestion(q._id, { title: e.target.value })}
                  className="me-2" placeholder="Question title" />
                <FormSelect value={q.type} onChange={(e) => updateQuestion(q._id, { type: e.target.value })}
                  className="me-2" style={{ width: "200px" }}>
                  <option>Multiple Choice</option>
                  <option>True/False</option>
                  <option>Fill in the Blank</option>
                </FormSelect>
                <FormControl type="number" value={q.points} onChange={(e) => updateQuestion(q._id, { points: Number(e.target.value) })}
                  style={{ width: "80px" }} className="me-2" />
                <Button variant="danger" size="sm" onClick={() => deleteQuestion(q._id)}>Delete</Button>
              </div>

              <FormControl as="textarea" rows={2} placeholder="Question text"
                value={q.question} onChange={(e) => updateQuestion(q._id, { question: e.target.value })}
                className="mb-2" />

              {q.type === "Multiple Choice" && (
                <div>
                  {q.choices.map((choice: string, i: number) => (
                    <div key={i} className="d-flex align-items-center mb-1">
                      <FormCheck type="radio" name={q._id} checked={q.correctAnswer === i}
                        onChange={() => updateQuestion(q._id, { correctAnswer: i })} className="me-2" />
                      <FormControl value={choice} onChange={(e) => {
                        const newChoices = [...q.choices];
                        newChoices[i] = e.target.value;
                        updateQuestion(q._id, { choices: newChoices });
                      }} placeholder={`Choice ${i + 1}`} />
                    </div>
                  ))}
                </div>
              )}

              {q.type === "True/False" && (
                <div>
                  <div className="d-flex align-items-center mb-1">
                    <FormCheck type="radio" name={q._id} checked={q.correctAnswer === true}
                      onChange={() => updateQuestion(q._id, { correctAnswer: true })} className="me-2" />
                    <span>True</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <FormCheck type="radio" name={q._id} checked={q.correctAnswer === false}
                      onChange={() => updateQuestion(q._id, { correctAnswer: false })} className="me-2" />
                    <span>False</span>
                  </div>
                </div>
              )}

        {q.type === "Fill in the Blank" && (
        <div>
            <FormLabel>Correct Answer(s)</FormLabel>
            {(q.correctAnswers || [""]).map((ans: string, i: number) => (
            <div key={i} className="d-flex mb-1">
                <FormControl
                value={ans}
                placeholder={`Answer ${i + 1}`}
                onChange={(e) => {
                    const updated = [...(q.correctAnswers || [""])];
                    updated[i] = e.target.value;
                    updateQuestion(q._id, { correctAnswers: updated });
                }}
                className="me-2"
                />
                <Button variant="danger" size="sm" onClick={() => {
                const updated = (q.correctAnswers || [""]).filter((_: any, idx: number) => idx !== i);
                updateQuestion(q._id, { correctAnswers: updated });
                }}>Remove</Button>
            </div>
            ))}
            <Button variant="secondary" size="sm" className="mt-1" onClick={() =>
            updateQuestion(q._id, { correctAnswers: [...(q.correctAnswers || [""]), ""] })
            }>+ Add Answer</Button>
        </div>
        )}


            </div>
          ))}

          <div className="d-flex justify-content-center">
            <Button variant="secondary" onClick={addQuestion}>+ New Question</Button>
          </div>
        </div>
      )}

      <hr />
      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
        <Button variant="danger" onClick={handleSave}>Save</Button>
        <Button variant="success" onClick={handleSaveAndPublish}>Save & Publish</Button>
      </div>
    </div>
  );
}