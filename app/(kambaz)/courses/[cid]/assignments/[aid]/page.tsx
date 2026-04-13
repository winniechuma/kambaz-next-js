"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button, FormControl, FormLabel, FormSelect, FormCheck, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/(kambaz)/store";
import { addAssignment, updateAssignment } from "../reducer";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
  const existingAssignment: any = assignments.find((a: any) => a._id === aid);
  const isNew = aid === "new";
  
  const [title, setTitle] = useState(existingAssignment?.title || "");
  const [description, setDescription] = useState(existingAssignment?.description || "");
  const [points, setPoints] = useState(existingAssignment?.points || 100);
  const [dueDate, setDueDate] = useState(existingAssignment?.dueDate || "");
  const [availableFromDate, setAvailableFromDate] = useState(existingAssignment?.availableFromDate || "");
  const [availableUntilDate, setAvailableUntilDate] = useState(existingAssignment?.availableUntilDate || "");
  
  const handleSave = () => {
    if (isNew) {
      dispatch(
        addAssignment({
          title,
          description,
          points,
          dueDate,
          availableFromDate,
          availableUntilDate,
          course: cid,
        })
      );
    } else {
      dispatch(
        updateAssignment({
          ...existingAssignment,
          title,
          description,
          points,
          dueDate,
          availableFromDate,
          availableUntilDate,
        })
      );
    }
    router.push(`/courses/${cid}/assignments`);
  };

  const handleCancel = () => {
    router.push(`/courses/${cid}/assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="p-4">
      <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
      <FormControl
        id="wd-name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-3"
      />

      <FormLabel htmlFor="wd-description">Description</FormLabel>
      <FormControl
        as="textarea"
        id="wd-description"
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mb-3"
      />

      <div className="row mb-3">
        <div className="col-3 text-end">
          <FormLabel htmlFor="wd-points">Points</FormLabel>
        </div>
        <div className="col-9">
          <FormControl
            id="wd-points"
            type="number"
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
          />
        </div>
      </div>

         {/* <tr>
            <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
             <td>
            <select id="wd-select-submission-type">
                <option selected value="online">Online</option>
            </select>
          </td>
        </tr>

        <tr>
            <td align="right" valign="top"></td>
            <label htmlFor="wd-online-entry">Online Entry Options</label><br/> */}

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

            {/* <input type="checkbox" name="check-entry-option" id="wd-chkbox-media"/>
            <label htmlFor="wd-checkbox-media">Media Recordings</label><br/> */}
      <div className="row mb-3">
        <div className="col-3 text-end">
          <FormLabel htmlFor="wd-assign">Assign</FormLabel>
        </div>
        <div className="col-9">
          <div className="border p-3">
            <FormLabel htmlFor="wd-due-date" className="fw-bold">Due</FormLabel>
            <FormControl
              id="wd-due-date"
              type="datetime-local"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="mb-3"
            />

            <div className="row">
              <div className="col-6">
                <FormLabel htmlFor="wd-available-from" className="fw-bold">Available from</FormLabel>
                <FormControl
                  id="wd-available-from"
                  type="datetime-local"
                  value={availableFromDate}
                  onChange={(e) => setAvailableFromDate(e.target.value)}
                />
              </div>
              <div className="col-6">
                <FormLabel htmlFor="wd-available-until" className="fw-bold">Until</FormLabel>
                <FormControl
                  id="wd-available-until"
                  type="datetime-local"
                  value={availableUntilDate}
                  onChange={(e) => setAvailableUntilDate(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr />

      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
        <Button variant="danger" onClick={handleSave}>Save</Button>
      </div>
    </div>
  );
}
