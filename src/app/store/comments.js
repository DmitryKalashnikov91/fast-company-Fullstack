import { createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsRecieved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        commentDeleted: (state, action) => {
            state.entities.filter((c) => c._id !== action.payload);
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;

const {
    commentsRequested,
    commentsRecieved,
    commentsRequestFiled,
    commentCreated,
    commentDeleted
} = actions;

export const loadCommetsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(userId);
        dispatch(commentsRecieved(content));
    } catch (error) {
        dispatch(commentsRequestFiled(error.message));
    }
};

export const addComment = (userId) => async (dispatch) => {
    dispatch(commentCreated());
    try {
        const { data } = await commentService.commentCreated(userId);
        return data;
    } catch (error) {
        dispatch(commentsRequestFiled(error.message));
    }
};
export const removeComment = (userId) => async (dispatch) => {
    dispatch(commentDeleted());
    try {
        const { data } = await commentService.commentDeleted(userId);
        return data;
    } catch (error) {
        dispatch(commentsRequestFiled(error.message));
    }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;

export default commentsReducer;
