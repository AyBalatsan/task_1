import React, { useState } from 'react';
import styled from 'styled-components';
import ListMainTask from './components/MainTasks/MainTasks';
import { PopUp } from './components/PopUp';
import { InputDefault } from './components/styled_components/input/InputDefault';
import { ButtonDefault } from './components/styled_components/button/ButtonDefault';

function App() {
  const[modalActive, setModalActive] = useState(true)
  return (
    <AppWrapper>
      <AppSell>
        <PopUp active={modalActive} setActive={setModalActive}>
          <p>Заполните имя автора</p>
          <InputDefault 
            placeholder='Имя автора'
            type="text"
          />
          <ButtonDefault onClick={() => setModalActive(false)}>Ок</ButtonDefault>
        </PopUp>
        <TitleH1>Task Board</TitleH1>
        <ListMainTask />
      </AppSell>
    </AppWrapper>
  );
}

export default App;

const AppWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(45deg, rgba(132,133,240,1) 0%, rgba(254,168,215,1) 100%);
  width: 100%;
  min-height: 100vh;
  padding: 60px 40px;
  position: relative;
`
const AppSell = styled.div`
  width: 100%;
  min-height: 80vh;
  background-color: antiquewhite;
  padding: 30px 20px;
  position: relative;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
`
const TitleH1 = styled.h1`
  font-size: 36px;
  text-align: center;
  margin-bottom: 60px;
  color: gray;
`
