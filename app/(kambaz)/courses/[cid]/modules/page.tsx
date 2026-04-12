<<<<<<< Updated upstream
export default function Modules() {
  return (
    <div>
      {/* Implement Collapse All button, View Progress button, etc. */}
      <button>Collapse All</button> 
      <button>View Progress</button>
      <select id="wd-select-one-choice">
      <option selected value="PUBLISH-ALL">Publish All</option>
      </select>
      <button id="wd-module">+ Module</button>
      <ul id="wd-modules">
        <li className="wd-module">
          <div className="wd-title">Week 1, Lecture 1 - Course Introduction, Syllabus, Agenda</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to the course</li>
                <li className="wd-content-item">Learn what is Web Development</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">READING</span>
              <ul className="wd-content">
                <li className="wd-content-item">Full Stack Developer - Chapter 1 - Introduction</li>
                <li className="wd-content-item">Full Stack Developer - Chapter 2 - Creating User Interfaces With HTML </li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">SLIDES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to Web Development</li>
                <li className="wd-content-item">Creating an HTTP sever with Node.js</li>
                <li className="wd-content-item">Creating a React Application</li>

              </ul>
            </li>
          </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 1, Lecture 2 - Formatting User Interfaces with </div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Learn how to create user interfaces with HTML</li>
                <li className="wd-content-item">Deploy assignment to Netlify</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">SLIDES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to HTML and the DOM</li>
                <li className="wd-content-item">Formatting Web content with Headings and Paragraps</li>
                <li className="wd-content-item">Formatting content with Lists and Tables </li>

              </ul>
            </li>
            </ul>
            </li>
        <li className="wd-module"> <div className="wd-title">Week 2</div> </li>
        <li className="wd-module"> <div className="wd-title">Week 3</div> </li>
      </ul>
    </div>
);}
=======
"use client"
import { FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import ModulesControls from "./modulesControls";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "./LessonControlButtons";
import ModulesControlButtons from "./ModuleControlButtons";
import { useParams } from "next/navigation";
import { useState } from "react";
import { addModule, editModule, updateModule, deleteModule }
  from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
export default function Modules() {
  const {cid} = useParams();
  const[moduleName, setModuleName] = useState("");
  const {modules} = useSelector((state: RootState) => state.modulesReducer);
  const dispatch = useDispatch();

  return (
    <div className = "wd-modules">
  <ModulesControls setModuleName={setModuleName} moduleName={moduleName} 
  addModule={() => {
    dispatch(addModule({name: moduleName, course: cid}));
  setModuleName("");
  }} /><br /><br /><br /><br />
  <ListGroup className="rounded-0" id="wd-modules">
    {modules.
    filter((module: any) => module.course === cid)
    .map ((module: any) => (
    <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
      <div className="wd-title p-3 ps-2 bg-secondary"> 
        <BsGripVertical className="me-2 fs-3" /> 
        {!module.editing && module.name} 
        {module.editing && (
          <FormControl className = "w-50 d-inline-block"
          onChange= {(e) => dispatch(updateModule({...module, name:e.target.value }))}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              dispatch(updateModule ({...module, editing: false}));
            }
          }}
          defaultValue = {module.name} />
        )}
        <ModulesControlButtons moduleId={module._id}
        deleteModule={(moduleId) => {
          dispatch(deleteModule(moduleId));
        }}
        editModule={(moduleId) => dispatch(editModule(moduleId))}/>
        </div>
      {module.lessons && (
      <ListGroup className="wd-lessons rounded-0">
        {module.lessons.map((lesson: any) => (
        <ListGroupItem className="wd-lesson p-3 ps-1">
          <BsGripVertical className="me-2 fs-3" />
          {lesson.name} <LessonControlButtons />
          </ListGroupItem>
      ))}</ListGroup>)}</ListGroupItem>))}</ListGroup></div>
    )};
  
>>>>>>> Stashed changes
