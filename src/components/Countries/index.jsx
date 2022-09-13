import { useSelector } from "react-redux"
import styled from "styled-components"
import CountryCard from "./item"

const CountriesList = () => {
  
    const AllCountries = useSelector(state => state.countries.countries)
    return (
        <List>
             {
                AllCountries.map((e,i)=>{ 
                    const linkUrl = e.name.common.replace(" ", "_")
                    return <CountryCard key={i} linkUrl={linkUrl} {...e}/>
                    })} 
        </List>
  )
}

export default CountriesList

const List = styled.ul`
    margin-top: 50px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 80px;
    width: 100%;
    list-style: none;
`