import { useState, useEffect, FC } from 'react';
import styled from 'styled-components';
import { TaskList, Modal, Commit } from '../components';
import { InputDefault } from '../styles/input/InputDefault';
import { ButtonDefault, ButtonDelete } from '../styles/button';
import { InfoCard, AllInformation, ListTitle, LocalStorageTitle } from '../types'

type Author = string | null
type List = { id: number, title: string }

interface AllDataProps {
  mockDateTitle: Array<List>
}

const MainPage: FC<AllDataProps> = ({ mockDateTitle }) => {

  const [isVisibleModalTitle, setIsVisibleModalTitle] = useState(false)
  const [isVisibleModalCard, setIsVisibleModalCard] = useState(false)

  // const [nameAuthor, setNameAuthor] = useState<Author>(null)
  // Данные строки title
  const [valueTitle, setValueTitle] = useState('')
  // Хранение id title
  const [titleBodyItem, setTitleBodyItem] = useState<ListTitle>()  
  // Смотрит есть ли имя автора, если нет активирует модалку 
  let authorInformation: Author = localStorage.getItem('author') !== null ? JSON.parse(String(localStorage.getItem('author'))) : null

  const initialisVisibleModalAuthor = !Boolean(authorInformation)
  const [isVisibleModalAuthor, setIsVisibleModalAuthor] = useState(initialisVisibleModalAuthor)
  const [nameAuthor, setNameAuthor] = useState<Author>(authorInformation)

  const addAuthor = () => {
    if (nameAuthor) {
      localStorage.setItem('author', JSON.stringify(nameAuthor))
      setIsVisibleModalAuthor(false)
    }
  }

  const listOfSection: string | null = localStorage.getItem('TitleList')
  let informationTitle = listOfSection !== null ? JSON.parse(listOfSection) : mockDateTitle
  const [listOfTitle, setListOfTitle] = useState<LocalStorageTitle>(informationTitle)
  
  useEffect(() => {
    localStorage.setItem('TitleList', JSON.stringify(listOfTitle))
  }, [listOfTitle])

  const editTitle = () => {
    if (Array.isArray(listOfTitle)) {
      const body = listOfTitle?.map((item: List) => {
        if (item.id === titleBodyItem?.id) {
          item.title = valueTitle
        }
        return item
      })
      setListOfTitle(body)
      setIsVisibleModalTitle(false)
    }
  }

  // добавление Description 
  const [bodyCard, setBodyCard] = useState<Array<AllInformation>>()
  const [cardDescription, setCardDescription] = useState()
  const [descValue, setDescValue] = useState('')
  // добавление comment
  const [cardComments, setCardComments] = useState<List[]>()
  const [cardCommentValue, setCardCommentValue] = useState('')
  // Хранение информации Card
  const [infoCard, setInfoCard] = useState<InfoCard>()
  useEffect(() => {
    
    if (infoCard !== undefined) {
      const infoCards = JSON.parse(String(localStorage.getItem(infoCard.nameKeyList)))
      setBodyCard(infoCards)
      const description = infoCards.find((item: { id: number; }) => item.id === infoCard.CardID).description
      setCardDescription(description)
      const arrayOfComments = infoCards.find((item: { id: number; }) => item.id === infoCard.CardID).comments
      setCardComments(arrayOfComments)
    }
  }, [infoCard, cardComments, cardDescription, bodyCard])


  const addDescription = () => {
    if (descValue !== '') {      
      const body = bodyCard?.map((item: AllInformation) => {
        if (item.id === infoCard?.CardID) {
          item.description = descValue
        }
        return item
      })
      if (infoCard) {
        localStorage.setItem(infoCard.nameKeyList, JSON.stringify(body))
        setDescValue('')
      }
    }
  }
  const deleteDescription = () => {
    if (descValue !== '') {
      const body = bodyCard?.map((item: AllInformation) => {
        if (item.id === infoCard?.CardID) {
          item.description = ''
        }
        return item
      })
      if (infoCard) {
        localStorage.setItem(infoCard.nameKeyList, JSON.stringify(body))
      }
    }
  }
  const addComment = (event: { key: string; }) => {
    if (event.key === 'Enter' && cardCommentValue !== '') {
      const body = bodyCard?.map((item: AllInformation) => {
        if (item.id === infoCard?.CardID) {
          item.comments.push({ id: Date.now(), title: cardCommentValue })
        }
        return item
      })
      if (infoCard) {
        localStorage.setItem(infoCard.nameKeyList, JSON.stringify(body))
      } 
    }
  }
  const deleteCommit = (id: number) => {
    const nameKeyThisList = infoCard?.nameKeyList
    if (nameKeyThisList) {
      const body = bodyCard?.map((item: AllInformation) => {
        if (item.id === infoCard?.CardID) {
          setCardComments(item.comments.filter(subItem => subItem.id !== id))
          return { ...item, comments: item.comments.filter(subItem => subItem.id !== id) }
        }
        return item
      })
      if (infoCard) {
        localStorage.setItem(nameKeyThisList, JSON.stringify(body))
      }
    }
  }
  const editCommit = (id: number, text: string) => {
    const nameKeyThisList = infoCard?.nameKeyList
    if (nameKeyThisList) {
      const body = bodyCard?.map((item: AllInformation) => {
        if (item.id === infoCard?.CardID) {
          item.comments.map((subitem) => {
            if (subitem.id === id) {
              subitem.title = text
            }
            return subitem
          })
        }
        return item
      })
      if (infoCard) {
        localStorage.setItem(nameKeyThisList, JSON.stringify(body))
      }
    }
  }
  const deleteCard = () => {
    const nameKeyThisList = infoCard?.nameKeyList
    if (nameKeyThisList) {
      const body = bodyCard?.filter((subItem: AllInformation) => subItem.id !== infoCard.CardID)
      if (infoCard) {
        localStorage.setItem(nameKeyThisList, JSON.stringify(body))
      }
      setIsVisibleModalCard(false)
    }
  }
  const onClickCard = (id: number, title: string, nameKeyCard: string): void => {
    setIsVisibleModalCard(true)
    setInfoCard({
      CardID: id,
      CardTitle: title,
      comments: [],
      nameKeyList: nameKeyCard
    })
  }
  const onClickTitle = (id: number, title: string): void => {
    setIsVisibleModalTitle(true)
    setTitleBodyItem({ id, title })
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
        <h3>Имя карточки: {infoCard?.CardTitle}</h3>
        <p>Автор поста: {nameAuthor}</p>
        <DescriptionShell>
          <p>Description: {cardDescription}</p>
          <CommitArea
            value={descValue}
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
            {cardComments?.map((commit: List) => (
              <Commit
                key={commit.id}
                id={commit.id}
                commit={commit.title}
                deleteCommit={deleteCommit}
                editCommit={editCommit}
              />
            ))}
          </CommitList>
        </CommitShell>
        <ButtonDelete
          onClick={() => deleteCard()}
        >Delete this card</ButtonDelete>
      </Modal>
      <Title>Task Board</Title>
      <TaskList
        listOfTitle={listOfTitle}
        onClickCard={onClickCard}
        onClickTitle={onClickTitle}
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