export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" defaultValue="A1 - ENV + HTML" /><br /><br />
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
      </textarea>
      <br />
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" defaultValue={100} />
          </td>
        </tr>

        {/* Complete on your own */}
         <tr>
            <td align="right" valign="top">
            <label htmlFor="wd-assignment">Assignment Group</label>
          </td>
             <td>
            <select id="wd-select-assign-group">
                <option selected value="assignments">ASSIGNMENTS</option>
            </select>
          </td>
        </tr>

         <tr>
            <td align="right" valign="top">
            <label htmlFor="wd-display-grade">Display Grade as</label>
          </td>
             <td>
            <select id="wd-select-grade-display">
                <option selected value="percentage">Percentage</option>
            </select>
          </td>
        </tr>

         <tr>
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
            <label htmlFor="wd-online-entry">Online Entry Options</label><br/>

            <input type="checkbox" name="check-entry-option" id="wd-chkbox-text"/>
            <label htmlFor="wd-chkbox-text">Text Entry</label><br/>

            <input type="checkbox" name="check-entry-option" id="wd-chkbox-website"/>
            <label htmlFor="wd-chkbox-website">Website URL</label><br/>

            <input type="checkbox" name="check-entry-option" id="wd-chkbox-media"/>
            <label htmlFor="wd-chkbox-media">Media Recordings</label><br/>

            <input type="checkbox" name="check-entry-option" id="wd-chkbox-student"/>
            <label htmlFor="wd-chkbox-student">Student Annotation</label><br/>

            <input type="checkbox" name="check-entry-option" id="wd-chkbox-file"/>
            <label htmlFor="wd-chkbox-file">File Uploads</label>

        </tr>

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-assign">Assign to</label>
          </td>
          <td>
            <input id="wd-assign" defaultValue="Everyone"
             />
          </td>
        </tr>

         <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-due">Due</label>
          </td>
          <td>
            <input type="date"
            id="wd-due" 
            defaultValue="2024-05-13"
             />
          </td>
        </tr>

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-available-from">Available from</label>
          </td>
          
          <td>
            <input type="date"
            id="wd-available-from" 
            defaultValue="2024-05-06"
             />
          </td> 

           <td align="right" valign="top">
            <label htmlFor="wd-until">Until</label>
          </td><br />

          <td>
            <input type="date"
            id="wd-until" 
            defaultValue="2024-05-20"
             />
          </td>
        </tr>
        <tr>
            <td>
                <button> Cancel </button>
                <button> Save </button>
            </td>
        </tr>
      </table>


    </div>
);}
