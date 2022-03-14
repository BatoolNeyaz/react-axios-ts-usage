import { ReactElement } from "react";
import styled from "styled-components";
import CreateEmployee from "./components/CreateEmployee";
import GetEmployee from "./components/GetEmployee";
import UpdateEmployee from "./components/UpdateEmployee";
//import BG_Image from "./style/background.png"
//Used Styled Components

const MainDivWrapper = styled.div`
  display: grid;
  grid-template-columns: 10% 90%;
  height: 100vh;
`;

const SidebarDiv = styled.div`
  height: 100%;
  background-color: black;
`;
const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
   
  width: 100%;
`;

function App(): ReactElement {
  return (
    <MainDivWrapper>
      <SidebarDiv></SidebarDiv>
      <MainDiv>
        <GetEmployee></GetEmployee>
        <CreateEmployee></CreateEmployee>
        <UpdateEmployee></UpdateEmployee>
      </MainDiv>
    </MainDivWrapper>
  );
}

export default App;
