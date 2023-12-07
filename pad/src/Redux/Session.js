import { createSlice } from '@reduxjs/toolkit';

export const Session = createSlice({
    name: "Session",
    initialState: { value: {
        memNN : null, 
        memID : null,
        memTel : null,
        memMail : null
    }},
    // initialState: { value: {
    //     memNN : "정송훈", 
    //     memID : "admin",
    //     memTel : "010-7223-2241",
    //     memMail : "h1jshmal1@naver.com"
    // }},
    reducers: {
        login: (state, action) => {
            state.value = action.payload
        },
    },
});

export default Session.reducer;
export const { login } = Session.actions;