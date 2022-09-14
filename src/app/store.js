import { configureStore } from '@reduxjs/toolkit';
import countriesSlice from '../features/counter/countriesSlice';
import themeReducer from '../features/counter/themeSlice';
import { searchInputMiddleware } from '../features/counter/countriesSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    countries: countriesSlice
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(searchInputMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});
