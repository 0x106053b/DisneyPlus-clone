import styled from 'styled-components'
import './App.css';
import Nav from "./components/Nav"
import Banner from "./components/Banner"

function App() {
  return (
    <Container>
      <Nav></Nav>
      <Banner></Banner>
    </Container>
  );
}

export default App;

const Container = styled.main`
  position : relative;
  min-height : calc(1000vh - 250px);
  overflow-x : hidden;
  display : block;
  padding : 0 calc(3.5vw + 5px);
  top : 72px;

  &:after{
    background : url("/images/home-background.png") center center / cover no-repeat fixed;
    content : "";
    position : absolute;
    inset : 0px;
    opacity : 1;
    z-index : -1;
  }
`;