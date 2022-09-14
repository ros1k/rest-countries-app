import React, { useEffect } from 'react';
import Header from './components/Header';
import styled from 'styled-components';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet } from "react-router-dom";

import { fetchCountries } from './features/counter/countriesSlice'

function App() {

  const theme = useSelector(state => state.theme)
  const data = useSelector(state => state.countries)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCountries())
  }, [localStorage.getItem('FetchedCountries')])


  return (
    <AppWrapper
      textColor={theme.themeColors.text}
      backgroundColor={theme.themeColors.background}
    >
      <Header />
      <Outlet />
      <div className="footer"></div>
    </AppWrapper>
  );
}

export default App;

const AppWrapper = styled.div`
  color: ${props => props.textColor};
  background-color: ${props => props.backgroundColor};
  min-height: 100vh;
`