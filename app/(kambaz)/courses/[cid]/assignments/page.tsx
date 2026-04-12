import Link from "next/link";
<<<<<<< Updated upstream

export default function Assignments() {
 return (
  <div id="wd-assignments">
   <input placeholder="Search for Assignments"
          id="wd-search-assignment" />
   <button id="wd-add-assignment-group">+ Group</button>
   <button id="wd-add-assignment">+ Assignment</button>
   <h3 id="wd-assignments-title">
    ASSIGNMENTS 40% of Total <button>+</button> </h3>
   <ul id="wd-assignment-list">
    <li className="wd-assignment-list-item">
     <Link href="/courses/1234/assignments/123"
           className="wd-assignment-link" >
      A1 - ENV + HTML
     </Link> 
    <div>
    Multiple Modules | <b>Not available until</b> May 6 at 12:00am |
    <br />
    <b>Due</b> May 13 at 11:59pm | 100 pts
  </div>
     </li>
    <li className="wd-assignment-list-item">
      {/* Complete On Your Own */}
      <Link href="/courses/1234/assignments/123"
           className="wd-assignment-link" >
      A2 - CSS + BOOTSTRAP
     </Link>
     <div>
     Multiple Modules | <b>Not available until</b> May 13 at 12:00am |
     <br />
    <b>Due</b> May 20 at 11:59pm | 100 pts
    </div>
    </li>
     <li className="wd-assignment-list-item">
      <Link href="/courses/1234/assignments/123"
           className="wd-assignment-link" >
      A3 -JAVASCRIPT + REACT
     </Link>
     <div> 
     Multiple Modules | <b>Not available until</b> May 20 at 12:00am |
     <br />
    <b>Due</b> May 27 at 11:59pm | 100 pts
    </div>
    </li>
   </ul>
  </div>
);}
=======
import AssignmentControls from "./assignmentControls";
import * as db from "../../../database";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { RootState } from "@/app/(kambaz)/store";
import { addAssignment, editAssignment, updateAssignment, deleteAssignment }
  from "./reducer";
import AssignmentControlButtons from "./assignmentControlButtons";

export default function Assignments() {
  const { cid } = useParams();

  const {assignments} = useSelector((state: RootState) => state.assignmentsReducer);
  const dispatch = useDispatch();
  return (
    <div>
      <AssignmentControls 
      // setAssignmentName={setAssignmentName} assignmentName={assignmentName}
      // addAssignment = {() => {
      //   dispatch(addAssignment({title: assignmentName, course: cid}));
      //   setAssignmentName("");
      // }} 
      />
      <br /><br /><br /><br />
     
      {/* <ModulesControls setModuleName={setModuleName} moduleName={moduleName} 
        addModule={() => {
          dispatch(addModule({name: moduleName, course: cid}));
        setModuleName("");
        }} /><br /><br /><br /><br /> */}

      
      <ListGroup className="rounded-0" id="wd-assignments">
        <ListGroupItem className="wd-assignment p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            <RxTriangleDown className="me-2" />
            ASSIGNMENTS
            <span className="float-end">
              <span className="border rounded-pill px-3 py-1 bg-white me-2">40% of Total</span>
              <FaPlus className="me-2" />
              <BsThreeDotsVertical />
            </span>
          </div>

          <ListGroup className="wd-assignment-list rounded-0">
           {assignments
           .filter ((assignment: any) => assignment.course === cid)
           .map ((assignment: any) => (
            <ListGroupItem key={assignment._id} className="wd-lesson p-3 ps-1">
              <div className="d-flex justify-content-between align-items-start">
                <div className="d-flex">
                  <BsGripVertical className="me-2 fs-3" />
                  <TiEdit className="me-3 text-success fs-4" />
                  <div>
                    <Link href={`/courses/${cid}/assignments/${assignment._id}`} className="text-decoration-none fw-bold">
                      {assignment.title}
                    </Link>
                    <div className="text-muted small mt-1">
                      <span className="text-danger">Multiple Modules</span> | {" "} <b>Not available until</b> {assignment.availableUntilDate} | <b>Due</b> {assignment.dueDate} | {assignment.points} pts
                    </div>
                  </div>
                </div>
                 <AssignmentControlButtons
                      assignmentId={assignment._id}
                      deleteAssignment={(id) => dispatch(deleteAssignment(id))}
                      editAssignment={(id) => dispatch(editAssignment(id))} />
                {/* <div>
                  <FaCheckCircle className="text-success me-2" />
                  <BsThreeDotsVertical />
                </div> */}
              </div>
            </ListGroupItem>
           ))} </ListGroup></ListGroupItem>
           </ListGroup>
           </div>
  )};
>>>>>>> Stashed changes
