import styled from "styled-components"

const Container = ({children,flex}) => {
  return (
    <ContainerWrapper flex={flex}>
       {children}
    </ContainerWrapper>
  )
}

export default Container

const ContainerWrapper = styled.div`
    display:flex;
    flex-direction: ${props => props.flex || "column"};
    justify-content: space-between;
    align-items: center;
    max-width: 1440px;
    margin: 0 auto;
    padding: 30px 50px;
`