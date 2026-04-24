"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";

import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical, BsThreeDotsVertical } from "react-icons/bs";
import { RxTriangleDown } from "react-icons/rx";
import { TiEdit } from "react-icons/ti";
import * as client from "./client";
import { useEffect, useState } from "react";
import { setQuizzes } from "./reducer";
import QuizControls from "./quizControls";
import QuizControlButtons from "./quizControlButtons";
import { editQuiz } from "./reducer";

export default function Quizzes() {
  const { cid } = useParams();

  const {quizzes} = useSelector((state: RootState) => state.quizzesReducer);
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState("name");
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  const onUpdateQuiz = async (quiz: any) => {
      await client.updateQuiz(quiz);
      const newQuizzes = quizzes.map((m: any) => m._id === quiz._id ? quiz : m );
      dispatch(setQuizzes(newQuizzes));
    };


  const onRemoveQuiz = async (quizId: string) => {
      await client.deleteQuiz(quizId);
      dispatch(setQuizzes(quizzes.filter((m: any) => m._id !== quizId)));
    };

    const fetchQuizzes = async () => {
      const data = await client.findQuizzesForCourse(cid as string);
      dispatch(setQuizzes(data));
    };
    useEffect(() => {
      fetchQuizzes();
    }, []);

    const onCreateQuiz = async (quiz: any) => {
    if (!cid) return;
    const newQuiz = await client.createQuiz(cid as string, quiz);
    dispatch(setQuizzes([...quizzes, newQuiz]));
  };

  function getAvailabilityLabel(quiz: any) {
  const now = new Date();
  const from = quiz.availableFromDate ? new Date(quiz.availableFromDate) : null;
  const until = quiz.availableUntilDate ? new Date(quiz.availableUntilDate) : null;
  if (until && now > until) return <span className="text-danger fw-bold">Closed</span>;
  if (from && now < from) return <span><b>Not available until</b> {from.toLocaleDateString()}</span>;
  return <span className="text-success fw-bold">Available</span>;
}

const onTogglePublish = async (quiz: any) => {
  const updated = { ...quiz, published: !quiz.published };
  await client.updateQuiz(updated);
  dispatch(setQuizzes(quizzes.map((m: any) => m._id === quiz._id ? updated : m)));
};

const sortedQuizzes = [...quizzes]
  .filter((quiz: any) => currentUser?.role === "STUDENT" ? quiz.published : true)
  .sort((a: any, b: any) => {
    if (sortBy === "name") return a.title?.localeCompare(b.title);
    if (sortBy === "dueDate") return new Date(a.dueDate || 0).getTime() - new Date(b.dueDate || 0).getTime();
    if (sortBy === "availableDate") return new Date(a.availableFromDate || 0).getTime() - new Date(b.availableFromDate || 0).getTime();
    return 0;
  });
  
  return (
    <div>
      <QuizControls 
      />
      <div className="d-flex justify-content-end mb-2">
      <select className="form-select w-auto" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="name">Sort by Name</option>
        <option value="dueDate">Sort by Due Date</option>
        <option value="availableDate">Sort by Available Date</option>
      </select>
    </div>
      <br />
      
      
      <ListGroup className="rounded-0" id="wd-assignments">
        <ListGroupItem className="wd-assignment p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            <RxTriangleDown className="me-2" />
            Assignment Quizzes
          </div>

          <ListGroup className="wd-quiz-list rounded-0">
           {sortedQuizzes
           .map ((quiz: any) => (
            <ListGroupItem key={quiz._id} className="wd-lesson p-3 ps-1">
              <div className="d-flex justify-content-between align-items-start">
                <div className="d-flex">
                  <BsGripVertical className="me-2 fs-3" />
                  <TiEdit className="me-3 text-success fs-4" />
                  <div>
                    <Link href={`/courses/${cid}/quizzes/${quiz._id}`} className="text-decoration-none fw-bold">
                      {quiz.title}
                    </Link>

                    <div className="text-muted small mt-1">
                      {getAvailabilityLabel(quiz)} | <b>Due</b> {quiz.dueDate} | 
                      {quiz.questions?.reduce((sum: number, q: any) => sum + (q.points || 0), 0) || quiz.points} pts
                      {quiz.questions && <> | {quiz.questions.length} Questions</>}
                    </div>
                    
                  </div>
                </div>

                {currentUser?.role === "FACULTY" && (
                 <QuizControlButtons
                      quizId={quiz._id}
                      published={quiz.published ?? false}
                      deleteQuiz={(id) => onRemoveQuiz(id)}
                      editQuiz={(id) => dispatch(editQuiz(id))} 
                      togglePublish={() => onTogglePublish(quiz)}
                  />
                )}
          
              </div>
            </ListGroupItem>
           ))} </ListGroup></ListGroupItem>
           </ListGroup>
           </div>
  )};
