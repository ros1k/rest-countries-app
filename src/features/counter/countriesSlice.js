// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { fetchCount } from './counterAPI';
import {
  createSlice,
  createAsyncThunk,
  isFulfilled,

} from '@reduxjs/toolkit'
import Country from '../../components/Country';

const ApiUrl = 'https://restcountries.com/v3.1/all'

export const fetchCountries = createAsyncThunk(
  'countries/fetchAllCountries',
  async () => {
    if (!localStorage.getItem('FetchedCountries')) {
      const response = await fetch(ApiUrl).then(resp => resp.json());
      localStorage.setItem('FetchedCountries', JSON.stringify(response));
      return response;
    } else {
      const response = JSON.parse(localStorage.getItem('FetchedCountries'));
      return response

    }

    // The value we return becomes the `fulfilled` action payload

  }
);

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

export const countriesSlice = createSlice({
  name: 'countries',
  initialState: {
    loading: 'idle',
    data: [],
    filter: 'all',
    lookingFor: '',
    countries: [],

    error: false
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    searchForCountry: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // console.log(action.payload);
      const newCountries = []
      if (state.filter === 'all') {
        state.data.map((e, i) => {
          const country = e.name.common
          if (country.toLowerCase().includes(state.lookingFor)) {
            newCountries.push(e)
          }
          return null
        })
      } else {
        state.data.map((e, i) => {
          if (e.region === state.filter) {
            if (state.lookingFor === "") {
              newCountries.push(e)
            } else {
              const country = e.name.common
              if (country.toLowerCase().includes(state.lookingFor)) {
                newCountries.push(e)
              }
            }
          }
          return null
        })
      }


      state.countries = newCountries;
    },
    setSearchingName: (state, action) => {

      if (action.payload.toLowerCase() !== state.lookingFor) {
        state.lookingFor = action.payload.toLowerCase()
      }


    },
    setFilter: (state, action) => {
      action.payload === "Filter by region" ? state.filter = 'all' : state.filter = action.payload
      const newCountries = []
      state.data.map((e, i) => {
        if (state.filter === 'all') {
          if (state.lookingFor === "") {
            newCountries.push(e)
          } else {
            const country = e.name.common
            if (country.toLowerCase().includes(state.lookingFor)) {
              newCountries.push(e)
            }
          }

        } else {
          if (e.region === state.filter) {
            if (state.lookingFor === "") {
              newCountries.push(e)
            } else {
              const country = e.name.common
              if (country.toLowerCase().includes(state.lookingFor)) {
                newCountries.push(e)
              }
            }
          }
        }
        return null
      })
      state.countries = newCountries;
    },
    // const linkUrl = e.name.common.replace(" ", "_")
    // searchForCountry: (state, action) => {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },

    //   // state.countries = action.payload;
    // },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCountries.pending, state => {
        state.loading = "loading";
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        // When the API call is successful and we get some data,the data becomes the `fulfilled` action payload
        state.loading = 'finished'
        // const linkUrl = e.name.common.replace(" ", "_")
        state.data = action.payload;
        state.countries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, { meta, payload, error }) => {
        state.pending = "error";
        state.error = error;
      });
  },

});

export const { searchForCountry, setFilter, setSearchingName } = countriesSlice.actions;

// export const searchInputMiddleware = store => next => action => {

//   if (action.type === 'countries/searchForCountry') {

//     // const newCountries = []
//     // store.getState().countries.data.map((e, i) => {
//     //   const country = e.name.common
//     //   if (country.toLowerCase().includes(action.payload.toLowerCase())) {
//     //     newCountries.push(e)
//     //   }
//     // })

//     // action.payload = newCountries
//     return next(action)
//   }
//   return next(action)
// }


export default countriesSlice.reducer;

