import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation, useParams  } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const exampleData = {
  name:"",
  population: "",
  region:"",
  subregion:"",
  capital:"",
  tld:"",
  currencies:"",
  languages:"",
  flag:"",
  bordercountries:[]
}

const Country = () => {
  const theme = useSelector(state => state.theme)
  const data = useSelector(state => state.countries)
  const [countryData,setCountryData] = useState({})
  const [currentCountry,setCurrentCountry] = useState(exampleData)
  let params = useParams();
  const navigate = useNavigate();
  const location = useLocation();


  
  useEffect(() => {
    data.countries.map((e)=>{
      if(e.name.common.replace(" ", "_") === params.countryID){
        let test = "";
        for(let x of Object.keys(e.languages)){
            test += e.languages[x] + ", "
            //cioc
        }
        test = test.substring(0 , test.length-2)

        setCurrentCountry(e)
        setCountryData({
          name:e.name.common,
          population: e.population,
          region: e.region,
          subregion:e.subregion,
          capital:e.capital,
          tld:e.tld,
          currencies: Object.values(e.currencies)[0]['name'],
          languages: test,
          flag:e.flags.png,
          bordercountries:e.borders
        })
      }
    })
    

  },[data,location.pathname])

  const findBorderCountries = (borders, allCountries) =>{
    const bordersArray = []
    borders.map((border) => {
      allCountries.map(singleCountry => {
        if(singleCountry.cca3 === border){
          const linkUrl = singleCountry.name.common.replace(" ", "_")
          bordersArray.push(<BorderButton 
                textColor={theme.themeColors.text} 
                bg={theme.themeColors.element} 
                key={linkUrl} 
                to={"/"+linkUrl}>
              {singleCountry.name.common}
              </BorderButton>)
        }
      })
    })

      return bordersArray
   
  }

  return (
    <Wrapper textColor={theme.themeColors.text}>
      <NavWrapper>
        <BackButton textColor={theme.themeColors.text} bg={theme.themeColors.element} onClick={() => navigate(-1)}> back </BackButton>
      </NavWrapper>
      <InfoWrapper>
        <Flag src={countryData?.flag}/>
        <Info>
          <Name >{countryData?.name}</Name>
          <Details textColor={theme.themeColors.text}>
            <Desc>Native Name:<span>{countryData?.name}</span></Desc>
            <Desc>Population:<span>{countryData?.population}</span></Desc>
            <Desc>Region:<span>{countryData?.region}</span></Desc>
            <Desc>Sub Region:<span>{countryData?.subregion}</span></Desc>
            <Desc>Capital:<span>{countryData?.capital}</span></Desc>
            <Desc>Top Level Domain:<span>{countryData?.tld}</span></Desc>
            <Desc>Currencies:<span>{countryData?.currencies } </span></Desc>
            <Desc>Languages:<span>{countryData?.languages}</span></Desc>
          </Details>
          <OtherLinks>
          <OtheLinksText>Border countries:</OtheLinksText>
          {countryData.bordercountries ? findBorderCountries(countryData.bordercountries, data.data) : null}
        </OtherLinks>
        </Info>
        
      </InfoWrapper>
      
    </Wrapper>
  )
}

export default Country;


const BorderButton = styled(Link)`
    display: flex;
    text-decoration: none;
    color: ${props => props.textColor};
    border-radius: 2px;
    margin-left: 10px;
    padding:2px 15px;
    background-color: ${props => props.bg};
    box-shadow: 0px 0px 4px 0px #1e1e1e;
`
const Wrapper = styled.div`
  max-width:1440px;
  margin: 0 auto;
  padding: 50px;
  color:${props => props.textColor};
`

const BackButton = styled.button`
     display: flex;
    text-decoration: none;
    color: ${props => props.textColor};
    border-radius: 2px;
    cursor: pointer;
    padding:5px 25px;
    border: none;
    background-color: ${props => props.bg};
    box-shadow: 0px 0px 4px 0px #2c2c2c;
    text-transform: capitalize;
`
const NavWrapper = styled.div`
  margin-bottom: 50px;
`
const InfoWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 20px;


`
const Flag = styled.img`
  height: 300px;
`
const Info = styled.div`
  display:flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`
const Name = styled.h2`
  margin-bottom: 30px;
`
const Details = styled.div`
  max-height: 150px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-bottom: 50px;
`
const Desc = styled.p`
  font-weight: 600;
  font-size:14px;
  margin-bottom: 10px;
  span{
    margin-left: 5px;
    font-weight: 400;
  }
`
const OtherLinks = styled.div`
  display: flex;
  align-items: center;
`
const OtheLinksText = styled.p`
  font-weight: 600;
`
