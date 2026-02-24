import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, FormControl, InputGroup } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import { BsSearch } from "react-icons/bs";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
export default function AssignmentControls() {
 return (
   <div className="d-flex justify-content-between align-items-center mb-3 text-nowrap">
    {/* Search Bar */}
    <InputGroup style={{ width: '300px' }}>
      <InputGroupText className="bg-white border-end-0">
        <BsSearch />
      </InputGroupText>
      <FormControl
        type="text"
        placeholder="Search..."
        className="border-start-0"
      />
    </InputGroup>
     

     <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-assignment">
       <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
       Assignment
     </Button>
     <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-add-assignment-group">
       <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
       Group
     </Button>
    
   </div>
);}
