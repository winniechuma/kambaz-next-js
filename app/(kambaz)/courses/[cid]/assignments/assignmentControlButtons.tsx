import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { FaPencil, FaTrash } from "react-icons/fa6";
export default function AssignmentControlButtons({assignmentId, deleteAssignment, editAssignment}: {assignmentId: string; deleteAssignment: (assignmentId: string) =>
     void; editAssignment: (assignmentId: string) => void}) {
  return (
    <div className="float-end">
      <FaPencil onClick={() => editAssignment(assignmentId)} className="text-primary me-3" />
      <FaTrash className="text-danger me-2 mb-1" onClick={() => {
          if (window.confirm("Are you sure you want to remove this assignment?")) {
            deleteAssignment(assignmentId);
          }}} />
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
    </div> );}
