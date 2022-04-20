import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import { ListCard, ListTitle} from '../../types';
import { Card, Modal } from '../';
import { InputDefault } from '../../styles/input/InputDefault';
import { ButtonDefault } from '../../styles/button/ButtonDefault';


interface MainTaskProps {
  author: string | null,
  title: string,
  setStateTitleList: any,
  id: number
}
const listCard: Array<ListCard> = []

const MainTask: FC<MainTaskProps> = (props)=> {    

  const [isVisibleModal, setIsVisibleModal] = useState(false)
  let valueTitle: string 
  const JListTitle = JSON.parse(String(localStorage.getItem('TitleList')))


  // Для карточек
  let jListCard = localStorage.getItem('Card' + props.id) !== null ? JSON.parse(String(localStorage.getItem('Card' + props.id))) : listCard
  const [stateCard, setStateCard] = useState(jListCard)
  const [newName, setNewName]= useState('')

  useEffect(() => {
    localStorage.setItem('Card' + props.id, JSON.stringify(stateCard))
  }, [stateCard])

  const addCard = (event: { key: string; }) => {
    if (event.key === 'Enter' && newName !== '') {
      console.log(stateCard);
      setStateCard( [
        ...stateCard,
        {
          id: Date.now(),
          title: newName,
          comments: 0
        }
      ])
    }
  }

  // Исправление названия досок с задачами
  const editTitle = (title: string, id: number) => {
    const body: Array<ListTitle> =  JListTitle.map((item: ListTitle) => {
      if (item.id === id) {
        item.title = title
      }
      return item
    })    
    props.setStateTitleList(body)
    setIsVisibleModal(false)
  }

  return (
    <ItemTask>
      <h2 onClick={() => setIsVisibleModal(true)}>{props.title}</h2>
      <Modal active={isVisibleModal} setActive={setIsVisibleModal}>
        <p>Изменить название блока задач</p>
        <InputDefault
          placeholder='Новое наименование задачи'
          type="text"
          onChange={event => valueTitle = event.target.value}
        />
        <ButtonDefault onClick={() => editTitle(valueTitle, props.id)}>Подтвердить</ButtonDefault>
      </Modal>
      <InputDefault
        type="text"
        value={newName}
        onChange={event => setNewName(event.target.value)}
        onKeyPress={addCard}
        placeholder='Todo name'
       />
      <ListTask>
        {/* {stateCard.map((item: { id: number; title: string; comments: number; }) =>(
          <Card key={item.id} author={props.author} title={item.title} comments={item.comments}  />
      ))} */}
      </ListTask>
    </ItemTask>
  )
}

export default MainTask

const ListTask = styled.ul`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px 0;
  justify-content: center;
`
const ItemTask = styled.li`
  width: 100%;
  min-height: 200px;
  border: 4px solid #f7dab4;
  border-radius: 24px;
  background-color: #faf0e3;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

