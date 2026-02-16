import { IoEllipsisVertical } from "react-icons/io5";
// import GreenCheckmark from "./GreenCheckmark";
import { BsPlus } from "react-icons/bs";
import GreenCheckmark from "../modules/GreenCheckmark";
export default function AssignmentsControlButtons() {
  return (
    <div className="float-end">
      {/* <GreenCheckmark /> */}
      <BsPlus className="fs-4" />
      <IoEllipsisVertical className="fs-4" />
    </div> );}