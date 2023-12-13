import { createSlice } from '@reduxjs/toolkit';

export const Session = createSlice({
    name: "Session",
    initialState: { value: {
        memNN : null, 
        memID : null,
        memTel : null,
        memMail : null
    }},
    reducers: {
        login: (state, action) => {
            state.value = action.payload
        },
    },
});

export default Session.reducer;
export const { login } = Session.actions;