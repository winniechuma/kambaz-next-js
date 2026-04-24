"use client";
// i need the above?
import { Dropdown } from "react-bootstrap";
import { FaBan } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { useRouter, useParams } from "next/navigation";

export default function QuizControlButtons({ quizId, deleteQuiz, editQuiz, togglePublish, published }:
  { quizId: string; deleteQuiz: (quizId: string) => void; editQuiz: (quizId: string) => void; togglePublish: () => void; published: boolean }) {
  const router = useRouter();
  const { cid } = useParams();

  return (
    <div className="d-flex align-items-center gap-2">
      <span onClick={togglePublish} style={{ cursor: "pointer" }}>
        {published
          ? <FaCheckCircle className="text-success fs-5" />
          : <FaBan className="text-secondary fs-5" />}
      </span>

      <Dropdown align="end">
        <Dropdown.Toggle variant="white" className="border-0 p-0" id={`dropdown-${quizId}`}>
          ⋮
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => router.push(`/courses/${cid}/quizzes/${quizId}/editor`)}>
            Edit
          </Dropdown.Item>
          <Dropdown.Item onClick={() => {
            if (window.confirm("Are you sure you want to delete this quiz?")) {
              deleteQuiz(quizId);
            }
          }} className="text-danger">
            Delete
          </Dropdown.Item>
          <Dropdown.Item onClick={togglePublish}>
            {published ? "Unpublish" : "Publish"}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}