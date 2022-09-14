// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { fetchCount } from './counterAPI';

import { createSlice } from "@reduxjs/toolkit";

const darkColors = {
  element: 'hsl(209, 23%, 22%)',
  background: 'hsl(207, 26%, 17%)',
  text: 'hsl(0, 0%, 100%)'
}
const lightColors = {
  element: 'hsl(0, 0%, 100%)',
  background: 'hsl(0, 0%, 95%)',
  text: 'hsl(200, 15%, 8%)',
}

const initialState = {
  current: 'Dark',
  themeColors: darkColors
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
// export const incrementAsync = createAsyncThunk(
//   'counter/fetchCount',
//   async (amount) => {
//     const response = await fetchCount(amount);
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    changeTheme: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.current === 'Dark'
        ? (state.current = 'Light') && (state.themeColors = lightColors)
        : (state.current = 'Dark') && (state.themeColors = darkColors);
    }
  },
  // // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // // including actions generated by createAsyncThunk or in other slices.
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(incrementAsync.pending, (state) => {
  //       state.status = 'loading';
  //     })
  //     .addCase(incrementAsync.fulfilled, (state, action) => {
  //       state.status = 'idle';
  //       state.value += action.payload;
  //     });
  // },
});

export const { changeTheme } = themeSlice.actions;


export default themeSlice.reducer;