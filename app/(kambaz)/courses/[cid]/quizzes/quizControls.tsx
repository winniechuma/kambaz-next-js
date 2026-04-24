
"use client";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { BsSearch, BsThreeDotsVertical } from "react-icons/bs";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

export default function QuizControls() {
  const router = useRouter();
  const { cid } = useParams();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  return (
    <div className="d-flex justify-content-between align-items-center mb-3 text-nowrap">
      <InputGroup style={{ width: '300px' }}>
        <InputGroupText className="bg-white border-end-0">
          <BsSearch />
        </InputGroupText>
        <FormControl type="text" placeholder="Search for Quiz"
          className="border-start-0" />
      </InputGroup>

        {currentUser?.role === "FACULTY" && (
            <Button variant="danger" size="lg" className="me-1 float-end"
                id="wd-add-assignment"
                onClick={() => router.push(`/courses/${cid}/quizzes/new/editor`)}>

                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Quiz
            </Button>
        )}

      <Button variant="secondary" size="lg" className="me-1 float-end"
        id="wd-add-assignment-group">
        <BsThreeDotsVertical className="position-relative me-2" style={{ bottom: "1px" }} />
      </Button>
    </div>
  );
}