import React, { useState, useEffect, FC } from 'react';
import styled from 'styled-components';
import { TaskList, Modal, Commit } from '../components';
import { InputDefault } from '../styles/input/InputDefault';
import { ButtonDefault, ButtonDelete } from '../styles/button';
import { InfoCard, AllInformation, ListTitle } from '../types'

type Author = string | null
type List = { id: number, title: string }

interface AllDataProps {
  listTitle: Array<List>
}

const MainPage: FC<AllDataProps> = ({ listTitle }) => {
  const [isVisibleModalAuthor, setIsVisibleModalAuthor] = useState(false)
  const [isVisibleModalTitle, setIsVisibleModalTitle] = useState(false)
  const [isVisibleModalCard, setIsVisibleModalCard] = useState(false)

  const [nameAuthor, setNameAuthor] = useState<Author>(null)
  // Данные строки title
  const [valueTitle, setValueTitle] = useState('')
  // Хранение id title
  const [titleBodyItem, setTitleBodyItem] = useState<ListTitle>()
  // Хранение информации Card
  const [infoCard, setInfoCard] = useState<InfoCard>()

  // Смотрит есть ли имя автора, если нет активирует модалку 
  let authorInformation: Author = localStorage.getItem('author') !== null ? JSON.parse(String(localStorage.getItem('author'))) : null

  useEffect(() => {
    if (authorInformation === null) {
      setIsVisibleModalAuthor(true)
    } else {
      setNameAuthor(authorInformation)
    }
  }, [])

  const addAuthor = () => {
    if (nameAuthor) {
      localStorage.setItem('author', JSON.stringify(nameAuthor))
      setIsVisibleModalAuthor(false)
    }    
  }  
   
  // Изменение имени Title
  let informationTitle = localStorage.getItem('TitleList') !== null ? JSON.parse(String(localStorage.getItem('TitleList'))) : listTitle
  const [titleList, setTitleList] = useState(informationTitle)
  // Тут нужно переписать, перерисовка происходит при перезагрузки Убрать в название Title

  useEffect(() => {
    localStorage.setItem('TitleList', JSON.stringify(titleList))
  }, [titleList])

  const editTitle = () => {    
    const body = titleList.map((item: List) => {
      if (item.id === titleBodyItem?.id) {
        item.title = valueTitle
      }
      return item
    })
    setTitleList(body)
    setIsVisibleModalTitle(false)
  }

  // добавление Description 
  const [bodyCard, setBodyCard] = useState()
  const [cardDescription, setCardDescription] = useState()
  const [descValue, setDescValue] = useState('')
  const [redrawingDescription, setRedrawingDescription] = useState(false)
  // добавление comment
  const [cardComments, setCardComments] = useState<List[]>([] as List[])
  const [cardCommentValue, setCardCommentValue] = useState('')
  const [redrawingCommit, setRedrawingCommit] = useState(false)
  useEffect(() => {
    if (infoCard !== undefined) {
      console.log(infoCard);      
      const infoCards = JSON.parse(String(localStorage.getItem(infoCard.nameKeyList)))
      const setBody = () => infoCards
      setBodyCard(setBody())
      const description = setBody().find((item: { id: number; }) => item.id === infoCard.CardID).description
      setCardDescription(description)
      const arrayOfComments = setBody().find((item: { id: number; }) => item.id === infoCard.CardID).comments
      setCardComments(arrayOfComments)
    }
  }, [infoCard, redrawingDescription])

  const addDescription = () => {
    if (descValue !== '') {
      const body = (bodyCard || []).map((item: AllInformation) => {
        if (item.id === infoCard?.CardID) {
          item.description = descValue
        }
        return item
      })
      if (infoCard) {
        localStorage.setItem(infoCard.nameKeyList, JSON.stringify(body))
      }
      setRedrawingDescription(!redrawingDescription)      
    }
  }
  const deleteDescription = () => {
    if (descValue !== '') {
      const body = (bodyCard || []).map((item: AllInformation) => {
        if (item.id === infoCard?.CardID) {
          item.description = ''
        }
        return item
      })
      if (infoCard) {
        localStorage.setItem(infoCard.nameKeyList, JSON.stringify(body))
      }
      setRedrawingDescription(!redrawingDescription)      
    }
  }
  const addComment = (event: { key: string; }) => {
    if (event.key === 'Enter' && cardCommentValue !== '') {
      const body = (bodyCard || []).map((item: AllInformation) => {
        if (item.id === infoCard?.CardID) {
          item.comments.push({id: Date.now(), title: cardCommentValue}) 
        }
        return item
      })
      if (infoCard) {
        localStorage.setItem(infoCard.nameKeyList, JSON.stringify(body))
      }
      // setRedrawingCommit(!redrawingCommit)    
      setRedrawingDescription(!redrawingDescription)  
    }
  }
  
  return (
    <AppSell>
      {/* Модальное окно Author */}
      <Modal active={isVisibleModalAuthor} setActive={setIsVisibleModalAuthor}>
        <p>Заполните имя автора</p>
        <InputDefault
          placeholder='Имя автора'
          type="text"
          onChange={event => setNameAuthor(event.target.value)}
        />
        <ButtonDefault onClick={() => addAuthor()}>Подтвердить</ButtonDefault>
      </Modal>
      {/* Модальное окно Title */}
      <Modal active={isVisibleModalTitle} setActive={setIsVisibleModalTitle}>
        <p>Изменить название блока задач</p>
        <InputDefault
          defaultValue={titleBodyItem?.title}
          type="text"
          onChange={event => setValueTitle(event.target.value)}          
        />
        <ButtonDefault onClick={() => editTitle()}>Подтвердить</ButtonDefault>
      </Modal>
      {/* Модальное окно Card */}
      <Modal active={isVisibleModalCard} setActive={setIsVisibleModalCard}>
        {/*Ветвление в компоненте */}
        <h3>Имя карточки: {infoCard?.CardTitle}</h3>
        <p>Автор поста: {nameAuthor}</p>
        <DescriptionShell>
          <p>Description: {cardDescription}</p>
          <CommitArea
            onChange={event => setDescValue(event.target.value)}
          />
          <ShellButton>
            <ButtonDefault
              onClick={() => addDescription()}
            >Добавить описание</ButtonDefault>
            <button><img src="/edit.png" alt="edit" /></button>
            <button
              onClick={() => deleteDescription()}
            ><img src="/delete.png" alt="del" /></button>
          </ShellButton>
        </DescriptionShell>
        <CommitShell>
          <InputDefault
            placeholder='Добавь свой классный комментарий'
            type="text"
            onChange={event => setCardCommentValue(event.target.value)}
            onKeyPress={addComment}
          />
          <CommitList>
            {(cardComments || []).map((commit: List) => (
              <Commit key={commit.id} commit={commit.title} />
            ))}            
          </CommitList>
        </CommitShell>
        <ButtonDelete>Delete this card</ButtonDelete>
      </Modal>
      <Title>Task Board</Title>
      <TaskList
        titleList={titleList}
        setInfoCard={setInfoCard}
        setTitleBodyItem={setTitleBodyItem}
        setIsVisibleModalTitle={setIsVisibleModalTitle}
        setIsVisibleModalCard={setIsVisibleModalCard}
        redrawingCommit={redrawingCommit}
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