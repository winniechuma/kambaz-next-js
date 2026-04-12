"use client";
import { ReactNode, useState } from "react";
import CourseNavigation from "./navigation";
<<<<<<< Updated upstream
export default async function CoursesLayout(
  { children, params }: Readonly<{ children: ReactNode; params: Promise<{ cid: string }> }>) {
 const { cid } = await params;
 return (
   <div id="wd-courses">
     <h2>Courses {cid}</h2>
     <hr />
     <table>
       <tbody>
         <tr>
           <td valign="top" width="200"> <CourseNavigation /> </td>
           <td valign="top" width="100%"> {children} </td>
         </tr>
       </tbody>
     </table>
   </div>
=======
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

>>>>>>> Stashed changes
);}
