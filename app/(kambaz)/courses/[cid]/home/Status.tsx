import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";
import { Button } from "react-bootstrap";
{/* Find more icons */}
import { MdHome } from "react-icons/md";
import { CgLoadbarSound } from "react-icons/cg";
import { LiaBullhornSolid } from "react-icons/lia";
import { FaBell } from "react-icons/fa";

export default function CourseStatus() {
 return (
   <div id="wd-course-status" style={{ width: "350px" }}>
     <h2>Course Status</h2>
     <div className="d-flex">
       <div className="w-50 pe-1">
         <Button variant="secondary" size="lg" className="w-100 text-nowrap ">
           <MdDoNotDisturbAlt className="me-2 fs-5" /> Unpublish </Button> </div>
       <div className="w-50">
         <Button variant="success" size="lg" className="w-100">
           <FaCheckCircle className="me-2 fs-5" /> Publish </Button> </div>
     </div>
     <br />
     <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
       <BiImport className="me-2 fs-5" /> Import Existing Content </Button>
     <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
       <LiaFileImportSolid className="me-2 fs-5" /> Import from Commons </Button>
     {/* Complete the rest of the buttons */}
     <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
       <MdHome className="me-2 fs-5" /> Choose Home Page </Button>
       <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
       <CgLoadbarSound className="me-2 fs-5" /> View Course Screen </Button>
       <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
       <LiaBullhornSolid className="me-2 fs-5" /> New Announcement </Button>
       <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
       <CgLoadbarSound className="me-2 fs-5" /> New Analytics </Button>
       <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
       <FaBell className="me-2 fs-5" /> View Course Notifications </Button>
   </div> );}

// export default function CourseStatus() {
//   return (
//     <div id="wd-course-status">
//       <h2>Course Status</h2>
//       <button>Unpublish</button> <button>Publish</button>
//       {/* Complete on your own */}
//       <button>View Course Notifications</button>
//       <button>View Course Calendar</button>
//       <button>Course Analytics</button>
//       <button>View Course Stream</button>
//       <button>New Announcements</button>
//       <button>Choose Home Page</button>
//       <button>Import Existing Content</button>
//     </div> );}


