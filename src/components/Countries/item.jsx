import { useSelector } from "react-redux"
import styled from "styled-components"
import { Link }from 'react-router-dom'
import {useState} from 'react'




const CountryCard = ({flags,name,population,region,capital,linkUrl}) => {
    const theme = useSelector(state => state.theme)
    const [nameLength, setNameLength] = useState(name.common.length)
 
  
    return (
    <SingleCountry textColor={theme.themeColors.text} bg={theme.themeColors.element}>
        <LinkWrapper to={"/" + linkUrl}></LinkWrapper>
            <FlagWrapper>
                <Flag src={flags.png}/>
            </FlagWrapper>
            <CountryInfo>
                <Country style={{fontSize: nameLength < 25 ? '18px' : '15px'}}>{name.common}</Country>
                <Info><Title>Population:</Title>{population}</Info>
                <Info><Title>Region:</Title>{region}</Info>
                <Info><Title>Capital:</Title>{capital}</Info>
            </CountryInfo>
    </SingleCountry>
  )
}

export default CountryCard

const SingleCountry = styled.li`
    position:relative;
    border-radius: 6px;
    display:flex;
    flex-direction: column;
    height: 300px;
    color: ${props => props.textColor};
    background-color: ${props => props.bg};
    margin:0 auto;
    @media (max-width: 992px) {
        height: 350px;
    }
    &:nth-child(5n),&:nth-child(1){
        margin-left: 0;
    }
    &:nth-child(4n){
        margin-right: 0;
    }
    @media (max-width: 768px) {
        width: 300px;
        margin:0 auto;
        &:nth-child(5n),&:nth-child(1){
            margin:0 auto;
        }
        &:nth-child(4n){
            margin:0 auto;
        }
    }
  
`
const LinkWrapper = styled(Link)`
    position: absolute;
    display:block;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
`
const FlagWrapper = styled.div`
    flex: 1 0 30%;
`
const Flag = styled.img`
    width: 100%;
   
    @media (max-width: 992px) {
        height: 200px;
  }
`
const CountryInfo = styled.div`
    padding:15px 30px;
    flex: 1 0 70%;
`
const Country = styled.h2`
    font-size:18px;
    font-weight:700;
    text-transform: capitalize;
    margin-bottom: 10px;
`
const Info = styled.p`
    display: flex;
    font-size:14px;
    text-transform: capitalize;
    margin-bottom: 2px;
`
const Title = styled.span`
    font-size:14px;
    margin-right: 5px;
    font-weight: 600;
`