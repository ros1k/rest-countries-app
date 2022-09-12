import { useSelector } from "react-redux"
import styled from "styled-components"


const CountryCard = ({flags,name,population,region,capital}) => {
    const theme = useSelector(state => state.theme)
  
    return (
    <SingleCountry textColor={theme.themeColors.text} bg={theme.themeColors.element}>
        <FlagWrapper>
            <Flag src={flags.png}/>
        </FlagWrapper>
        <CountryInfo>
            <Country>{name.common}</Country>
            <Info><Title>Population:</Title>{population}</Info>
            <Info><Title>Region:</Title>{region}</Info>
            <Info><Title>Capital:</Title>{capital}</Info>
        </CountryInfo>
    </SingleCountry>
  )
}

export default CountryCard

const SingleCountry = styled.li`
    border-radius: 6px;
    display:flex;
    flex-direction: column;
    height: 300px;
    color: ${props => props.textColor};
    background-color: ${props => props.bg};

    &:nth-child(5n),&:nth-child(1){
        margin-left: 0;
    }
    &:nth-child(4n){
        margin-right: 0;
    }
`
const FlagWrapper = styled.div`
    flex: 1 0 30%;
`
const Flag = styled.img`
    width: 100%;
    height: 150px;
`
const CountryInfo = styled.div`
    padding:15px 30px;
    flex: 1 0 70%;
`
const Country = styled.h2`
    font-size:20px;
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