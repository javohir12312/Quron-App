import { configureStore } from '@reduxjs/toolkit';
import ModeSlice from '../slice';

const store = configureStore({
  reducer: {
    Theme: ModeSlice,
  },
});

export default store;