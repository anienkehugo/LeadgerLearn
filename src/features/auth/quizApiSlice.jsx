import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

// Create an adapter for quizzes
const quizzesAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const initialState = quizzesAdapter.getInitialState();

export const quizApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuizzes: builder.query({
      query: () => ({
        url: "/quiz",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedQuizzes = responseData.map((quiz) => {
          quiz.id = quiz._id;
          return quiz;
        });
        return quizzesAdapter.setAll(initialState, loadedQuizzes);
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            { type: "Quiz", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Quiz", id })),
          ];
        } else return [{ type: "Quiz", id: "LIST" }];
      },
    }),
    addNewQuiz: builder.mutation({
      query: (initialQuiz) => ({
        url: "/quiz",
        method: "POST",
        body: {
          ...initialQuiz,
        },
      }),
      invalidatesTags: [{ type: "Quiz", id: "LIST" }],
    }),
    updateQuiz: builder.mutation({
      query: (updatedQuiz) => ({
        url: "/quiz",
        method: "PATCH",
        body: {
          ...updatedQuiz,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Quiz", id: arg.id }],
    }),
    deleteQuiz: builder.mutation({
      query: ({ id }) => ({
        url: `/quiz/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Quiz", id: arg.id }],
    }),
  }),
});

export const {
  useGetQuizzesQuery,
  useAddNewQuizMutation,
  useUpdateQuizMutation,
  useDeleteQuizMutation,
} = quizApiSlice;

// Returns the query result object
export const selectQuizzesResult = quizApiSlice.endpoints.getQuizzes.select();

// Creates memoized selector
const selectQuizzesData = createSelector(
  selectQuizzesResult,
  (quizzesResult) => quizzesResult.data // normalized state object with ids & entities
);

// GetSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllQuizzes,
  selectById: selectQuizById,
  selectIds: selectQuizIds,
} = quizzesAdapter.getSelectors(
  (state) => selectQuizzesData(state) ?? initialState
);
