"use client";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, FormControl, Row } from "react-bootstrap";
import { addNewCourse, deleteCourse, updateCourse } from "../courses/reducer";
import { enroll, unenroll } from "../enrollments/reducer";
import { RootState } from "../store";
import { useState } from "react";

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const dispatch = useDispatch();

  const [course, setCourse] = useState<any>({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const [showAllCourses, setShowAllCourses] = useState(false);

  const isFaculty = currentUser?.role === "FACULTY";

  // Checking if the current user is enrolled in a specific course
  const isEnrolled = (courseId: string) => {
    return enrollments.some(
      (e: any) => e.user === currentUser?._id && e.course === courseId
    );
  };

  // Filtering courses based on the toggle
  const displayedCourses = showAllCourses
    ? courses
    : courses.filter((c: any) => isEnrolled(c._id));

  const handleCourseClick = (e: any, courseId: string) => {
    if (!isEnrolled(courseId)) {
      e.preventDefault();
      alert("You must be enrolled in this course to access it.");
    }
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">
        Dashboard
        <button
          className={`btn ${showAllCourses ? "btn-primary" : "btn-primary"} float-end`}
          onClick={() => setShowAllCourses(!showAllCourses)}
        >
          {showAllCourses ? "My Courses" : "Enrollments"}
        </button>
        <br /> <br />
      </h1>
      <hr />

      {isFaculty && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={() => dispatch(addNewCourse(course))}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={() => dispatch(updateCourse(course))}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <br />
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            as="textarea"
            value={course.description}
            rows={3}
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        Published Courses ({displayedCourses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {displayedCourses.map((c: any) => (
            <Col key={c._id} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link
                  href={`/courses/${c._id}/home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                  onClick={(e) => handleCourseClick(e, c._id)}
                >
                  <CardImg variant="top" src="/images/reactjs.jpg" width="100%" height={160} />
                  <CardBody>
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {c.name}
                    </CardTitle>
                    <CardText
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {c.description}
                    </CardText>
                    <Button variant="primary">Go</Button>
                    </CardBody>
                    </Link>

                    <CardBody className="pt-0">

                    {isFaculty && (
                      <>
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            if (window.confirm("Are you sure you want to delete this course?")) {
                              dispatch(deleteCourse(c._id));
                            }
                          }}
                          className="btn btn-danger float-end"
                          id="wd-delete-course-click"
                        >
                          Delete
                        </button>
                        <button
                          id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(c);
                          }}
                          className="btn btn-warning me-2 float-end"
                        >
                          Edit
                        </button>
                      </>
                    )}

                    {/* These are the Enroll / Unenroll buttons and are shown when viewing all courses */}
                    {showAllCourses && (
                      <>
                        {isEnrolled(c._id) ? (
                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              dispatch(unenroll({ userId: currentUser?._id, courseId: c._id }));
                            }}
                            className="btn btn-danger float-end me-2"
                          >
                            Unenroll
                          </button>
                        ) : (
                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              dispatch(enroll({ userId: currentUser?._id, courseId: c._id }));
                            }}
                            className="btn btn-success float-end me-2"
                          >
                            Enroll
                          </button>
                        )}
                      </>
                    )}
                  </CardBody>
                {/* </Link> */}
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
