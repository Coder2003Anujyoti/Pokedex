import {configureStore} from '@reduxjs/toolkit';
import todoSliceReducer from '../Project/todoSlice';
export const store=configureStore({
  reducer:{
    todo:todoSliceReducer
  }
})