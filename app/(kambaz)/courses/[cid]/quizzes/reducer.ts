import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: [],
};
const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    addQuiz: (state, { payload: quiz }) => {
    //   const newQuiz: any = {
    //     _id: uuidv4(),
        // type: quiz.type,
        // points: quiz.points,
        // assignmentGroup: quiz.assignmentGroup,
        // shuffleAnswers: quiz.shuffleAnswers,
    //     timeLimit: quiz.timeLimit,
    //     attempts: quiz.attempts,
    //     numAttempts: quiz.numAttempts,
    //     correctAnswers: quiz.correctAnswers,
    //     accessCode: quiz.accessCode,
    //     questions: quiz.questions,
    //     webcam: quiz.webcam,
    //     lockQuestion: quiz.lockQuestion,
    //     dueDate: quiz.dueDate,
    //     availableFromDate: quiz.availableFromDate,
    //     availableUntilDate: quiz.availableUntilDate,
    //   };
          state.quizzes = [...state.quizzes, quiz] as any;

    //   state.quizzes = [...state.quizzes, newQuiz] as any;
    },
    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter(
        (m: any) => m._id !== quizId);
    },
    updateQuiz: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((m: any) =>
        m._id === quiz._id ? quiz : m
      ) as any;
    },
    editQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.map((m: any) =>
        m._id === quizId ? { ...m, editing: true } : m
      ) as any;
    },
  },
});
export const { addQuiz, deleteQuiz, updateQuiz, editQuiz, setQuizzes } =
  quizzesSlice.actions;
export default quizzesSlice.reducer;