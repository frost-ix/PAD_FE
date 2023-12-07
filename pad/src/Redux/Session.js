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
    //     memNN : "admin", 
    //     memID : "admin",
    //     memTel : "010-1234-1234",
    //     memMail : "admin1@naver.com"
    // }},
    reducers: {
        login: (state, action) => {
            state.value = action.payload
        },
    },
});

export default Session.reducer;
export const { login } = Session.actions;