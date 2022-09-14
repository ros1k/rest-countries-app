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
    @media (max-width: 1300px) {
        grid-template-columns: repeat(3, 1fr);
        align-content: space-between;
        justify-content: space-evenly;
  }
  @media (max-width: 992px) {
        grid-template-columns: repeat(2, 1fr);
        align-content: space-between;
        justify-content: space-evenly;
  }
  @media (max-width: 768px) {
        grid-template-columns: repeat(1, 1fr);
        align-content: space-between;
        justify-content: space-evenly;
  }
`