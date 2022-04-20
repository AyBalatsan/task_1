import React, { useState,  useEffect} from 'react';
import styled from 'styled-components';
import {MainTasks, Modal}  from '../components';
import { InputDefault } from '../styles/input/InputDefault';
import { ButtonDefault } from '../styles/button/ButtonDefault';

type Author = string | null

const MainPage = () => {
  const[modalActive, setModalActive] = useState(false)
  const[nameUser, setNameUser] = useState<string | null>(null)

  let jAuthor: Author = localStorage.getItem('author') !== null ? JSON.parse(String(localStorage.getItem('author'))) : null
    
  useEffect(()=>{
    if (jAuthor == null) {
        setModalActive(true)  
        setNameUser(jAuthor)      
    } else {
        setNameUser(jAuthor)
        setModalActive(false)
    }
  }, [])

  useEffect(() =>{
    localStorage.setItem('author', JSON.stringify(nameUser))
  }, [nameUser])  
    let valueAuthor: string
    const addAuthor = (value:string) =>{
      setNameUser(value)
      setModalActive(false)
    }
  return (
      
      <AppSell>
        <Modal active={modalActive} setActive={setModalActive}>
          <p>Заполните имя автора</p>
          <InputDefault 
            placeholder='Имя автора'
            type="text"
            onChange={event => valueAuthor = event.target.value}            
          />
          <ButtonDefault onClick={() => addAuthor(valueAuthor)}>Подтвердить</ButtonDefault>
        </Modal>
        <TitleH1>Task Board</TitleH1>
        <MainTasks author={nameUser} />
      </AppSell>
  );
}

{/* <ListMainTask author={nameUser} /> */}
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
const TitleH1 = styled.h1`
  font-size: 36px;
  text-align: center;
  margin-bottom: 60px;
  color: gray;
`
