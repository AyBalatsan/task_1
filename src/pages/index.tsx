import React, { useState,  useEffect, FC} from 'react';
import styled from 'styled-components';
import {TaskList, Modal, Commit}  from '../components';
import { InputDefault } from '../styles/input/InputDefault';
import { ButtonDefault, ButtonDelete} from '../styles/button';
import {InfoCard, AllInformation} from '../types'
 
type Author = string | null
type List = {id: number, title: string}

interface AllDataProps {          
  listTitle: Array<List> 
}

const MainPage: FC<AllDataProps> = ({listTitle}) => {  
  // Открытие окна автора
  const[isVisibleModal, setIsVisibleModal] = useState(false)
  // Открытие изменения заголовков
  const[isVisibleTitle, setIsVisibleTitle] = useState(false)
  // Открытие карточки
  const[isVisibleCard, setIsVisibleCard] = useState(false)
  // Хранение имени автора
  const[nameAuthor, setNameAuthor] = useState<string | null>(null)
  // Данные строки title
  const[valueTitle, setValueTitle] = useState('') 
  // Хранение id title
  const[idTitle, setIdTitle] = useState(0) 
  // Хранение информации Card
  const[infoCard, setInfoCard] = useState<InfoCard>() 
  // Смотрит есть ли имя автора, если нет активирует модалку 
  let jAuthor: Author = localStorage.getItem('author') !== null ? JSON.parse(String(localStorage.getItem('author'))) : null
    
  useEffect(() => {
    if (jAuthor == null) {
      setIsVisibleModal(true)
      setNameAuthor(jAuthor)
    } else {
      setNameAuthor(jAuthor)
      setIsVisibleModal(false)
    }
  }, [])  

  const addAuthor = () => {
    localStorage.setItem('author', JSON.stringify(nameAuthor))
    setIsVisibleModal(false)
  }

  // Изменение имени Title
  let jList = localStorage.getItem('TitleList') !== null ? JSON.parse(String(localStorage.getItem('TitleList'))) : listTitle

  const [stateTitleList, setStateTitleList] = useState(jList)
  // Тут нужно переписать, перерисовка происходит при перезагрузки

  useEffect(() => {
    localStorage.setItem('TitleList', JSON.stringify(stateTitleList))   
  }, [stateTitleList]) 

  const editTitle = () => {
    const body =  stateTitleList.map((item: List) => {
      if (item.id === idTitle) {
        item.title = valueTitle
      }
      return item
    })    
    setStateTitleList(body)
    setIsVisibleTitle(false)
  }
  
  // добавление комментариев 
  const [bodyCard, setBodyCard] = useState()
  const [description, setDescription] = useState()
  const [descValue, setDescValue] = useState('')
  useEffect(() => {
    if (infoCard !== undefined) {
      const infoCards = JSON.parse(String(localStorage.getItem(infoCard.nameKeyList)))
      const setBody = () => infoCards
      setBodyCard(setBody())
      const description = setBody().find((item: { id: number; }) => item.id === infoCard.CardID).description
      setDescription(description)      
    }
  }, [infoCard])
  // const addDescription = () => {
  //   if (descValue == '') {
  //     const body = infoCards.map((item: AllInformation) => {
  //       if (item.id === infoCard.CardID) {
  //         item.description = descValue
  //       }
  //       return item
  //     })
  //     localStorage.setItem(infoCard.nameKeyList, body)
  //   }
  // }

  return (      
    <AppSell>
      {/* Модальное окно Author */}
      <Modal active={isVisibleModal} setActive={setIsVisibleModal}>
        <p>Заполните имя автора</p>
        <InputDefault
          placeholder='Имя автора'
          type="text"
          onChange={event => setNameAuthor(event.target.value)}          
        />
        <ButtonDefault onClick={() => addAuthor()}>Подтвердить</ButtonDefault>
      </Modal>
      {/* Модальное окно Title */}
      <Modal active={isVisibleTitle} setActive={setIsVisibleTitle}>
        <p>Изменить название блока задач</p>
        <InputDefault
          placeholder='Новое наименование задачи'
          type="text"
          onChange={event => setValueTitle(event.target.value)}
        />
        <ButtonDefault onClick={() => editTitle()}>Подтвердить</ButtonDefault>
      </Modal>
      {/* Модальное окно Card */}
      <Modal active={isVisibleCard} setActive={setIsVisibleCard}>
        
        <h3>Имя карточки: {infoCard?.CardTitle}</h3>
        <p>Автор поста: {nameAuthor}</p>
        <p>Description: {description}</p>
        <CommitArea 
          defaultValue={description}
          onChange= {event => setDescValue(event.target.value)}
        />
        <ShellButton>
          <ButtonDefault
            // onClick={addDescription()}
          >Добавить описание</ButtonDefault>
          <button><img src="/edit.png" alt="edit" /></button>
          <button><img src="/delete.png" alt="del" /></button>
        </ShellButton>
        <CommitList>
            {/* {listCommit.map(commit => (
              <Commit key={commit.id} commit={commit.text} />
            ))} */}
          </CommitList>
        <ButtonDelete>Delete this card</ButtonDelete>
      </Modal>
      <Title>Task Board</Title>
      <TaskList 
        jList={jList}
        setInfoCard={setInfoCard}
        setIdTitle={setIdTitle}
        setIsVisibleTitle={setIsVisibleTitle}
        setIsVisibleCard={setIsVisibleCard}
      />
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
`