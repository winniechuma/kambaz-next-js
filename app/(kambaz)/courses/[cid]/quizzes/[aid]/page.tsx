"use client";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { Button } from "react-bootstrap";
import { PiPencilFill } from "react-icons/pi";

export default function QuizDetails() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const quiz: any = quizzes.find((q: any) => q._id === aid);  
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  if (!quiz) return <div className="p-4">Quiz not found.</div>;

  return (
    <div className="p-4">
        {currentUser?.role === "FACULTY" && (
      <div className="d-flex justify-content-end gap-2 mb-4">
        <Button variant="secondary" onClick={() => router.push(`/courses/${cid}/quizzes/${aid}/preview`) }>
          Preview
        </Button>
        <Button variant="secondary" onClick={() => router.push(`/courses/${cid}/quizzes/${aid}/editor`)}>
          <PiPencilFill  /> Edit
        </Button>
      </div>
        )}

      <h2>{quiz.title}</h2>
      <hr />
       {currentUser?.role === "STUDENT" && (
        <div className="d-flex justify-content-center mb-3">
          <Button variant="danger" onClick={() => router.push(`/courses/${cid}/quizzes/${aid}/preview`)}>Start Quiz</Button>
        </div>
      )}

      <table className="table table-borderless w-50">
        <tbody>
          <tr>
            <td className="text-end fw-bold">Quiz Type</td>
            <td>{quiz.quizType || "Graded Quiz"}</td>
          </tr>
          <tr>
            <td className="text-end fw-bold">Points</td>
            <td>{quiz.questions.reduce((sum: number, q: any) => sum + (q.points || 0), 0)}</td>
          </tr>
          <tr>
            <td className="text-end fw-bold">Assignment Group</td>
            <td>{quiz.assignmentGroup || "Quizzes"}</td>
          </tr>
          <tr>
            <td className="text-end fw-bold">Shuffle Answers</td>
            <td>{quiz.shuffleAnswers ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td className="text-end fw-bold">Time Limit</td>
            <td>{quiz.timeLimit || 20} Minutes</td>
          </tr>
          <tr>
            <td className="text-end fw-bold">Multiple Attempts</td>
            <td>{quiz.multipleAttempts ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td className="text-end fw-bold">Show Correct Answers</td>
            <td>{quiz.showCorrectAnswers || "Immediately"}</td>
          </tr>
          <tr>
            <td className="text-end fw-bold">One Question at a Time</td>
            <td>{quiz.oneQuestionAtATime ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td className="text-end fw-bold">Webcam Required</td>
            <td>{quiz.webcamRequired ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td className="text-end fw-bold">Lock Questions After Answering</td>
            <td>{quiz.lockQuestions ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td className="text-end fw-bold">Due Date</td>
            <td>{quiz.dueDate || "—"}</td>
          </tr>
          <tr>
            <td className="text-end fw-bold">Available From</td>
            <td>{quiz.availableFromDate || "—"}</td>
          </tr>
          <tr>
            <td className="text-end fw-bold">Until</td>
            <td>{quiz.availableUntilDate || "—"}</td>
          </tr>
        </tbody>
      </table>
     <div className="d-flex justify-content-end gap-2 mb-4">

        <Button variant="secondary" onClick={() => router.push(`/courses/${cid}/quizzes/`)}>
                Back
        </Button>
    </div>
    </div>
  );
}