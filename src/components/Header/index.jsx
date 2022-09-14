import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { changeTheme } from "../../features/counter/themeSlice"
import Container from '../Container'
import { faMoon , faSun } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"


const Header = () => {
    const theme = useSelector(state => state.theme);
    const dispatch = useDispatch();
    
  return (
    <HeaderWrapper 
        bg={theme.themeColors.element}
    >
        <Container flex={'row'}>
            <HeaderLink to="/" textcolor={theme.themeColors.text}>Where in the world? </HeaderLink>
            <ThemeChanger 
                textColor={theme.themeColors.text}
                onClick={() => dispatch(changeTheme())}>
                <FontAwesomeIcon icon={theme.current === "Dark"? faSun : faMoon}/> {theme.current==='Dark' ? "Light":"Dark"} Mode
            </ThemeChanger>
        </Container>
    </HeaderWrapper>
  )
}

export default Header

const HeaderWrapper = styled.header`
    background-color: ${props => props.bg};
 
`
const HeaderLink = styled(Link)`
     color: ${props => props.textcolor};
     text-decoration: none;
`
const ThemeChanger = styled.button`
    cursor: pointer;
    background-color: transparent;
    border:none;
    color:${props => props.textColor}
`
