import { configureStore } from '@reduxjs/toolkit';
import userReducer from './modules/user/user.slice';

export default configureStore({
  reducer: {
    user: userReducer,
  },
})