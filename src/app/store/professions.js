import { createSlice } from "@reduxjs/toolkit";
import professionSevice from "../services/profession.service";

const professionsSlice = createSlice({
    name: "professions",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        professionsRequested: (state) => {
            state.isLoading = true;
        },
        professionsRecieved: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        professionsRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: professionsReducer, actions } = professionsSlice;

const { professionsRequested, professionsRecieved, professionsRequestFiled } =
    actions;

function isOutDated(date) {
    if (Date.now() - date > 10 * 60 * 1000) {
        return true;
    }
    return false;
}

export const loadProfessionsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().professions;
    if (isOutDated(lastFetch)) {
        dispatch(professionsRequested());
        try {
            const { content } = await professionSevice.get();
            dispatch(professionsRecieved(content));
        } catch (error) {
            dispatch(professionsRequestFiled(error.message));
        }
    }
};

export const getProfessions = () => (state) => state.professions.entities;
export const getProfessionsLoadingStatus = () => (state) =>
    state.professions.isLoading;

export const getProfessionsByIds = (id) => (state) => {
    const professions = state.professions.entities;
    if (professions) {
        return professions.find((p) => p._id === id);
    }
};

export default professionsReducer;
