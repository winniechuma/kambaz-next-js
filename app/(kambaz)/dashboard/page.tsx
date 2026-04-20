"use client";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, FormControl, Row } from "react-bootstrap";
import { setCourses } from "../courses/reducer";
import { RootState } from "../store";
import { useEffect, useState } from "react";
import * as courseClient from "../courses/client";
import * as enrollmentClient from "../enrollments/client";

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const dispatch = useDispatch();
  const [showAllCourses, setShowAllCourses] = useState(false);

  const [course, setCourse] = useState<any>({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const [enrolledCourseIds, setEnrolledCourseIds] = useState<Set<string>>(new Set());

  const fetchEnrollments = async () => {
    const myCourses = await courseClient.findMyCourses();
    setEnrolledCourseIds(new Set(myCourses.map((c: any) => c._id)));
  };

  const fetchCourses = async () => {
    try {
      const courses = showAllCourses
        ? await courseClient.fetchAllCourses()
        : await courseClient.findMyCourses();
      dispatch(setCourses(courses));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchEnrollments();
  }, [currentUser, showAllCourses]);

  const onAddNewCourse = async () => {
    const newCourse = await courseClient.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
  };

  const onDeleteCourse = async (courseId: string) => {
    await courseClient.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((c) => c._id !== courseId)));
  };

  const onUpdateCourse = async () => {
    await courseClient.updateCourse(course);
    dispatch(setCourses(courses.map((c) =>
      c._id === course._id ? course : c
    )));
  };

  const onEnroll = async (courseId: string) => {
    await enrollmentClient.enrollUserInCourse(currentUser._id, courseId);
    fetchCourses();
    fetchEnrollments();
  };

  const onUnenroll = async (courseId: string) => {
    await enrollmentClient.unenrollUserFromCourse(currentUser._id, courseId);
    fetchCourses();
    fetchEnrollments();
  };

  const isFaculty = currentUser?.role === "FACULTY";

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">
        Dashboard
        <button className="btn btn-primary float-end"
          onClick={() => setShowAllCourses(!showAllCourses)}>
          {showAllCourses ? "My Courses" : "Enrollments"}
        </button>
      </h1>
      <hr />

      {isFaculty && (
        <>
          <h5>
            New Course
            <button onClick={onAddNewCourse} className="btn btn-primary float-end"
              id="wd-add-new-course-click">Add</button>
            <button className="btn btn-warning float-end me-2"
              onClick={onUpdateCourse}
              id="wd-update-course-click">Update</button>
          </h5>
          <br />
          <FormControl value={course.name} className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })} />
          <FormControl as="textarea" value={course.description} rows={3}
            onChange={(e) => setCourse({ ...course, description: e.target.value })} />
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((c: any) => (
            <Col key={c._id} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link href={`/courses/${c._id}/home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark">
                  <CardImg variant="top" src="/images/reactjs.jpg" width="100%" height={160} />
                  <CardBody>
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {c.name}
                    </CardTitle>
                    <CardText className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}>
                      {c.description}
                    </CardText>
                    <Button variant="primary">Go</Button>
                  </CardBody>
                </Link>
                <CardBody className="pt-0">
                  {isFaculty && (
                    <>
                      <button onClick={(event) => {
                        event.preventDefault();
                        onDeleteCourse(c._id);
                      }} className="btn btn-danger float-end" id="wd-delete-course-click">Delete</button>
                      <button id="wd-edit-course-click"
                        onClick={() => setCourse(c)}
                        className="btn btn-warning me-2 float-end">Edit</button>
                    </>
                  )}

                  {showAllCourses && (
                    enrolledCourseIds.has(c._id) ? (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        onUnenroll(c._id);
                      }}
                      className="btn btn-danger float-end me-2">
                      Unenroll
                    </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          onEnroll(c._id);
                        }}
                        className="btn btn-success float-end me-2">
                        Enroll
                      </button>
                    )
                  )}
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}