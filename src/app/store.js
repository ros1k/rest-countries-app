import { configureStore } from '@reduxjs/toolkit';
import countriesSlice from '../features/counter/countriesSlice';
import themeReducer from '../features/counter/themeSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    countries: countriesSlice
  }
});
