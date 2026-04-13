"use client";
import { ReactNode, useState } from "react";
import CourseNavigation from "./navigation";
import { FaAlignJustify } from "react-icons/fa";
import { courses } from "../../database";
import { RootState } from "../../store";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
export default function CoursesLayout({ children }: { children: ReactNode }) {
 const { cid } = useParams();
 const {courses} =useSelector((state: RootState) => state.coursesReducer);
 const course = courses.find((course: any) => course._id === cid);
 const [open, setOpen] = useState(true);
 return (
  <div id="wd-courses">
  <h2 className="text-danger">
      <FaAlignJustify className="me-4 fs-4 mb-1" onClick = {() => setOpen(!open)}/>
      {course?.name} </h2> <hr />
  <div className="d-flex">
    {open && (
    <div className="d-none d-md-block">
      <CourseNavigation />
    </div>
    )}
    <div className="flex-fill">
      {children}
    </div></div>
</div>

);}
