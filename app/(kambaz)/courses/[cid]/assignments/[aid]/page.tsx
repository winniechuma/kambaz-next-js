import { Button, FormControl, FormLabel, FormSelect, FormCheck, Card } from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="p-4">
      <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
      <FormControl id="wd-name" defaultValue="A1" className="mb-3" />

      <Card body className="mb-3">
        <p>
          The assignment is <span className="text-danger fw-bold">available online</span>
        </p>
        <p>
          Submit a link to the landing page of your Web application running on Netlify.
        </p>
        <p>The landing page should include the following:</p>
        <ul>
          <li>Your full name and section</li>
          <li>Links to each of the lab assignments</li>
          <li>Link to the Kanbas application</li>
          <li>Links to all relevant source code repositories</li>
        </ul>
        <p>
          The Kanbas application should include a link to navigate back to the landing page.
        </p>
      </Card>

      <div className="row mb-3">
        <div className="col-3 text-end">
          <FormLabel htmlFor="wd-points">Points</FormLabel>
        </div>
        <div className="col-9">
          <FormControl id="wd-points" type="number" defaultValue={100} />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-3 text-end">
          <FormLabel htmlFor="wd-group">Assignment Group</FormLabel>
        </div>
        <div className="col-9">
          <FormSelect id="wd-group">
            <option>ASSIGNMENTS</option>
          </FormSelect>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-3 text-end">
          <FormLabel htmlFor="wd-display-grade-as">Display Grade as</FormLabel>
        </div>
        <div className="col-9">
          <FormSelect id="wd-display-grade-as">
            <option>Percentage</option>
          </FormSelect>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-3 text-end">
          <FormLabel htmlFor="wd-submission-type">Submission Type</FormLabel>
        </div>
        <div className="col-9">
          <div className="border p-3">
            <FormSelect id="wd-submission-type" className="mb-3">
              <option>Online</option>
            </FormSelect>

            <FormLabel className="fw-bold">Online Entry Options</FormLabel>
            <FormCheck type="checkbox" id="wd-text-entry" label="Text Entry" />
            <FormCheck type="checkbox" id="wd-website-url" label="Website URL" defaultChecked />
            <FormCheck type="checkbox" id="wd-media-recordings" label="Media Recordings" />
            <FormCheck type="checkbox" id="wd-student-annotation" label="Student Annotation" />
            <FormCheck type="checkbox" id="wd-file-upload" label="File Uploads" />
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-3 text-end">
          <FormLabel>Assign</FormLabel>
        </div>
        <div className="col-9">
          <div className="border p-3">
            <FormLabel htmlFor="wd-assign-to" className="fw-bold">Assign to</FormLabel>
            <FormControl id="wd-assign-to" defaultValue="Everyone" className="mb-3" />

            <FormLabel htmlFor="wd-due-date" className="fw-bold">Due</FormLabel>
            <FormControl 
              id="wd-due-date" 
              type="datetime-local" 
              defaultValue="2024-05-13T23:59" 
              className="mb-3"
            />

            <div className="row">
              <div className="col-6">
                <FormLabel htmlFor="wd-available-from" className="fw-bold">Available from</FormLabel>
                <FormControl 
                  id="wd-available-from" 
                  type="datetime-local" 
                  defaultValue="2024-05-06T00:00"
                />
              </div>
              <div className="col-6">
                <FormLabel htmlFor="wd-available-until" className="fw-bold">Until</FormLabel>
                <FormControl 
                  id="wd-available-until" 
                  type="datetime-local" 
                  defaultValue="2024-05-20T23:59"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr />
      
      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary">Cancel</Button>
        <Button variant="danger">Save</Button>
      </div>
    </div>
  );
}
