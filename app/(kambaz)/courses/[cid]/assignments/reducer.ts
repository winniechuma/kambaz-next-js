import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../../database";

import { v4 as uuidv4 } from "uuid";
const initialState = {
  assignments: assignments,
};
const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload: assignment }) => {
      const newAssignment: any = {
        _id: uuidv4(),
        // lessons: [],
        title: assignment.title,
        description: assignment.description,
        points: assignment.points,
        dueDate: assignment.dueDate,
        availableFromDate: assignment.availableFromDate,
        availableUntilDate: assignment.availableUntilDate,
         course: assignment.course,
      };
      state.assignments = [...state.assignments, newAssignment] as any;
    },
    deleteAssignment: (state, { payload: moduleId }) => {
      state.assignments = state.assignments.filter(
        (m: any) => m._id !== moduleId);
    },
    updateAssignment: (state, { payload: module }) => {
      state.assignments = state.assignments.map((m: any) =>
        m._id === module._id ? module : m
      ) as any;
    },
    editAssignment: (state, { payload: moduleId }) => {
      state.assignments = state.assignments.map((m: any) =>
        m._id === moduleId ? { ...m, editing: true } : m
      ) as any;
    },
  },
});
export const { addAssignment, deleteAssignment, updateAssignment, editAssignment } =
  assignmentsSlice.actions;
export default assignmentsSlice.reducer;