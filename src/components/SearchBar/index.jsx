
import { useSelector } from "react-redux"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faChevronDown,faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { useRef, useState } from "react"


const FilterValues = ['Africa','America','Asia','Europa','Oceania','Clear Filter']


const SearchBar = () => {
    const theme = useSelector(state => state.theme)
    const textColor = theme.themeColors.text;
    const elBackground = theme.themeColors.element;
    const [currentFilter, setCurrentFilter] = useState('Filter by region ')
    const selectRef = useRef();
    const listItemRef = useRef([])
    const handleSelectClick = (e) =>{

        if(e.target.classList.contains('active')){
            e.target.classList.remove('active')
        }else{
            e.target.classList.add('active')  
        }
    }
    const handleClickListItem = (e) =>{
        setCurrentFilter(e.target.dataset['value'])
    }

  return (
    <SearchBarWrapper>
        <SearchWrapper bg={elBackground} >
            <SearchIcon icon={faMagnifyingGlass} />
            <Search textColor={theme.themeColors.text}/>
        </SearchWrapper>
        <SelectButton 
            textColor={textColor}
            bg={elBackground} 
            onClick={e => handleSelectClick(e)}
            ref={selectRef}
            >
            {currentFilter}
            <FontAwesomeIcon className="down" icon={faChevronDown} />
            <FontAwesomeIcon className="up" icon={faChevronUp} />
            <List 
                onMouseLeave= { (e) => selectRef.current.classList.remove('active') }
                textColor={textColor} 
                bg={elBackground}>
                {FilterValues.map((e,i)=>{
                    return <ListItem 
                                onClick={e => handleClickListItem(e)}
                                key={i} 
                                ref={listItemRef.current[i]} 
                                data-value={e === "Clear Filter"? "Filter by region " : e}
                                >
                                    {e}</ListItem>
                })}
                
            </List>
        </SelectButton>
        
    </SearchBarWrapper>
  )
}

export default SearchBar


const SearchBarWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const SearchWrapper = styled.div`
    border-radius: 6px;
    padding:10px;
    background-color: ${props => props.bg};
    
`
const SearchIcon = styled(FontAwesomeIcon)`
   margin: 0 25px 0 15px;
`
const Search = styled.input.attrs({
    onChange: null,
    type: 'text',
    placeholder: 'Search for a country ...'
  })`
    &:active,&:focus&:focus-visible{
        border:none;
        outline:none;
    }
    background-color: transparent;
    border:none;
    color:${props => props.textColor};
    &::placeholder{
      color:${props => props.textColor}
    
  }
`
const List = styled.ul`
    position: absolute;
    opacity:0;
    top:40px;
    left:0;
    width:100%;
    height: 0;
    list-style-type: none;
    display:flex;
    flex-direction:column;
    align-items: flex-start;
    transition: all 0.2s ease;
 
    color:${props => props.textColor};
    li{
        background-color: ${props => props.bg};
    }
`
const ListItem = styled.li`
    width:100%;
    padding:10px 10px 10px 20px;
    display:flex;
    text-align: left;
    color:${props => props.textColor};

    cursor: pointer;
    background-color: ${props => props.bg};
    &:first-child{
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
    }
    &:last-child{
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
    }
    &:hover{
        background-color: brightness(85%)
    }
`

const SelectButton = styled.button`
    position: relative;
    padding:10px 10px 10px 20px;
    display:flex;
    justify-content: space-between;
    flex-direction: row;
    background-color: ${props => props.bg};
    color:${props => props.textColor};
    border:none;
    border-radius: 6px;
    cursor: pointer;
    width:145px;
    &:after{
        position: absolute;
        content:"";
        bottom:-50%;
        left:0;
        display:none;
        width:100%;
        height:200px;
        z-index: 0;
    }
    & svg{
        margin-left:10px; 
        &.down{
        
        display:inline-block;
        }
        &.up{
            display:none;
        }
    }
    
    &.active {
        &:after{
            display:inline-block;
        }
        svg.up{
            display:inline-block;
        }
        svg.down{
            display:none;
        }
      ul{
        opacity:1;
        height: auto;
      }
    }
    
`
