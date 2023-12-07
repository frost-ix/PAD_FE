
import { configureStore } from '@reduxjs/toolkit';
import SessionReducer from './Session';

export default configureStore({
  reducer: {
    Session: SessionReducer
  },
})
