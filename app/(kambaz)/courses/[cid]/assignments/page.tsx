
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical, BsThreeDotsVertical } from "react-icons/bs";
import { FaPlus, FaCheckCircle } from "react-icons/fa";
import { TiEdit } from "react-icons/ti";
import { RxTriangleDown } from "react-icons/rx";
import Link from "next/link";
import AssignmentControls from "./assignmentControls";

export default function Assignments() {
  return (
    <div>
      <AssignmentControls />
      <br /><br /><br /><br />
      
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
            <ListGroupItem className="wd-lesson p-3 ps-1">
              <div className="d-flex justify-content-between align-items-start">
                <div className="d-flex">
                  <BsGripVertical className="me-2 fs-3" />
                  <TiEdit className="me-3 text-success fs-4" />
                  <div>
                    <Link href="/courses/1234/assignments/123" className="text-decoration-none fw-bold">
                      A1
                    </Link>
                    <div className="text-muted small mt-1">
                      <span className="text-danger">Multiple Modules</span> | <b>Not available until</b> May 6 at 12:00am | <b>Due</b> May 13 at 11:59pm | 100 pts
                    </div>
                  </div>
                </div>
                <div>
                  <FaCheckCircle className="text-success me-2" />
                  <BsThreeDotsVertical />
                </div>
              </div>
            </ListGroupItem>

            <ListGroupItem className="wd-lesson p-3 ps-1">
              <div className="d-flex justify-content-between align-items-start">
                <div className="d-flex">
                  <BsGripVertical className="me-2 fs-3" />
                  <TiEdit className="me-3 text-success fs-4" />
                  <div>
                    <Link href="/courses/1234/assignments/123" className="text-decoration-none fw-bold">
                      A2 
                    </Link>
                    <div className="text-muted small mt-1">
                      <span className="text-danger">Multiple Modules</span> | <b>Not available until</b> May 13 at 12:00am | <b>Due</b> May 20 at 11:59pm | 100 pts
                    </div>
                  </div>
                </div>
                <div>
                  <FaCheckCircle className="text-success me-2" />
                  <BsThreeDotsVertical />
                </div>
              </div>
            </ListGroupItem>

            <ListGroupItem className="wd-lesson p-3 ps-1">
              <div className="d-flex justify-content-between align-items-start">
                <div className="d-flex">
                  <BsGripVertical className="me-2 fs-3" />
                  <TiEdit className="me-3 text-success fs-4" />
                  <div>
                    <Link href="/courses/1234/assignments/123" className="text-decoration-none fw-bold">
                      A3
                    </Link>
                    <div className="text-muted small mt-1">
                      <span className="text-danger">Multiple Modules</span> | <b>Not available until</b> May 20 at 12:00am | <b>Due</b> May 27 at 11:59pm | 100 pts
                    </div>
                  </div>
                </div>
                <div>
                  <FaCheckCircle className="text-success me-2" />
                  <BsThreeDotsVertical />
                </div>
              </div>
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}