import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

// Create an adapter for quiz attempts
const quizAttemptsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.dateAttempted.localeCompare(a.dateAttempted),
});

const initialState = quizAttemptsAdapter.getInitialState();

export const quizAttemptApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all quiz attempts
    getQuizAttempts: builder.query({
      query: () => ({
        url: "/quizAttempt",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedAttempts = responseData.map((attempt) => {
          attempt.id = attempt._id; // Use _id as the id
          return attempt;
        });
        return quizAttemptsAdapter.setAll(initialState, loadedAttempts);
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            { type: "QuizAttempt", id: "LIST" },
            ...result.ids.map((id) => ({ type: "QuizAttempt", id })),
          ];
        } else return [{ type: "QuizAttempt", id: "LIST" }];
      },
    }),

    // Add a new quiz attempt
    addNewQuizAttempt: builder.mutation({
      query: (initialAttempt) => ({
        url: "/quizAttempt",
        method: "POST",
        body: { ...initialAttempt },
      }),
      invalidatesTags: [{ type: "QuizAttempt", id: "LIST" }],
    }),

    // Update a quiz attempt
    updateQuizAttempt: builder.mutation({
      query: ({ quizId, updatedAttempt }) => ({
        url: `/quizAttempt`, // No need to pass ids in URL
        method: "PATCH",
        body: { quizId, ...updatedAttempt }, // Pass quizId in the body
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "QuizAttempt", id: arg.quizId },
      ],
    }),

    deleteQuizAttempt: builder.mutation({
      query: ({ id }) => ({
        url: `/quizAttempt`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "QuizAttempt", id: arg },
      ],
    }),

    // Fetch a specific quiz attempt by quizId
    getQuizAttemptById: builder.query({
      query: (quizId) => ({
        url: `/quizAttempt/${quizId}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        responseData.id = responseData._id;
        return responseData;
      },
      providesTags: (result, error, arg) => [{ type: "QuizAttempt", id: arg }],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetQuizAttemptsQuery,
  useAddNewQuizAttemptMutation,
  useUpdateQuizAttemptMutation,
  useDeleteQuizAttemptMutation,
  useGetQuizAttemptByIdQuery,
} = quizAttemptApiSlice;

// Returns the query result object
export const selectQuizAttemptsResult =
  quizAttemptApiSlice.endpoints.getQuizAttempts.select();

// Creates memoized selector
const selectQuizAttemptsData = createSelector(
  selectQuizAttemptsResult,
  (quizAttemptsResult) => quizAttemptsResult.data // normalized state object with ids & entities
);

// GetSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllQuizAttempts,
  selectById: selectQuizAttemptById,
  selectIds: selectQuizAttemptIds,
} = quizAttemptsAdapter.getSelectors(
  (state) => selectQuizAttemptsData(state) ?? initialState
);
