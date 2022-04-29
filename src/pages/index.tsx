import { useState, useEffect, FC } from 'react';
import styled from 'styled-components';
import { TaskList, Modal, Commit } from '../components';
import { InputDefault } from '../styles/input/InputDefault';
import { ButtonDefault, ButtonDelete } from '../styles/button';

const MainPage = () => {
  const [isVisibleModalAuthor, setIsVisibleModalAuthor] = useState(false)
  const [isVisibleModalTitle, setIsVisibleModalTitle] = useState(false)
  const [isVisibleModalCard, setIsVisibleModalCard] = useState(false)  

  return (
    <AppSell>
      {/* Модальное окно Author */}
      <Modal active={isVisibleModalAuthor} setActive={setIsVisibleModalAuthor}>
        <p>Заполните имя автора</p>
        <InputDefault
          placeholder='Имя автора'
          type="text"
        />
        <ButtonDefault >Подтвердить</ButtonDefault>
      </Modal>

      {/* Модальное окно Card */}
      <Modal active={isVisibleModalCard} setActive={setIsVisibleModalCard}>        
        <h3>Имя карточки:</h3>
        <p>Автор поста:</p>
        <DescriptionShell>
          <CommitArea
          />
          <ShellButton>
            <ButtonDefault>Добавить описание</ButtonDefault>
            <button><img src="/edit.png" alt="edit" /></button>
            <button><img src="/delete.png" alt="del" /></button>
          </ShellButton>
        </DescriptionShell>
        <CommitShell>
          <InputDefault
            placeholder='Добавь свой классный комментарий'
            type="text"
          />
          <CommitList>
              {/* <Commit /> */}
          </CommitList>
        </CommitShell>
        <ButtonDelete>Delete this card</ButtonDelete>
      </Modal>
      <Title>Task Board</Title>
      {/* <TaskList/> */}
    </AppSell>
  )
}

export default MainPage;

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
const Title = styled.h1`
  font-size: 36px;
  text-align: center;
  margin-bottom: 60px;
  color: gray;
`
const CommitArea = styled.textarea`
  border-radius: 6px;
  -webkit-border-radius: 6px;
  border: 1px solid #DADADA;
  background: #F9F9F9;

  /* Shadows*/
  box-shadow: inset 2px 2px 3px rgba(0, 0, 0, .15);
  -moz-box-shadow: inset 2px 2px 3px rgba(0, 0, 0, 0.15);
  -webkit-box-shadow: inset 2px 2px 3px rgba(0, 0, 0, .15);

  /*Font styles*/
  font-family: «Trebuchet MS», Arial, Helvetica, sans-serif;
  color: #747474;
  font-size: 12;
  font-style: italic;

  /*Spacings*/
  margin-top: 5px;
  height: 18px;
  line-height: 18px;
  padding: 5px;
  width: 100%;
  height: 120px;
  outline: none;
  resize: none 
`
const ShellButton = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`
const CommitList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
  margin: 16px 0;
  overflow: auto;
  max-height: 260px;
  padding: 0 12px;
  &::-webkit-scrollbar {
  width: 12px;               
}
  &::-webkit-scrollbar-track {
  background: #fcd999;   
  border-radius: 20px;
}
  &::-webkit-scrollbar-thumb {
  background-color: #26a69a;    /* цвет плашки */
  border-radius: 20px;       /* закругления плашки */
  border: 3px solid orange;  /* padding вокруг плашки */
}
`
const DescriptionShell = styled.div`
  margin: 16px 0;
  
`
const CommitShell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`