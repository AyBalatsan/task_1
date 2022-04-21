import React, { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import { ListCard, InfoCard} from '../../types';
import { InputDefault } from '../../styles/input/InputDefault';
import {Card} from '..';
interface MainTaskProps {
  title: string,
  id: number
  setIsVisibleTitle: {(modal: boolean): void;},
  setIsVisibleCard: {(modal: boolean): void}
  setIdTitle: {(modal: number): void;}
  setInfoCard: {(modal: InfoCard): void}
}
const listCard: Array<ListCard> = []

const TaskItem: FC<MainTaskProps> = ({id, title, setIsVisibleTitle, setIsVisibleCard, setIdTitle, setInfoCard})=> {    

  // Для карточек
  let jListCard = localStorage.getItem('Card' + id) !== null ? JSON.parse(String(localStorage.getItem('Card' + id))) : listCard
  const [stateCard, setStateCard] = useState(jListCard)
  const [newName, setNewName]= useState('')

  useEffect(() => {
    localStorage.setItem('Card' + id, JSON.stringify(stateCard))
  }, [stateCard])

  const addCard = (event: { key: string; }) => {
    if (event.key === 'Enter' && newName !== '') {      
      setStateCard( [
        ...stateCard,
        {
          id: Date.now(),
          title: newName,
          description: 'opis',
          comments: []
        }
      ])
      setNewName('')
    }
  }
  return (
    <ItemTaskWrapper>
      <h2 onClick={()=> {
        setIsVisibleTitle(true)
        setIdTitle(id)
      }}>{title}</h2>      
      <InputDefault
        type="text"
        value={newName}
        onChange={event => setNewName(event.target.value)}
        onKeyPress={addCard}
        placeholder='Todo name'
       />
      <ListTask>
        {stateCard.map((item: { id: number; title: string; comments: number; }) =>(
          <Card
            key={item.id}
            id={item.id}
            nameKeyCard={'Card' + id}
            title={item.title}
            comments={item.comments}
            setIsVisibleCard={setIsVisibleCard}
            setInfoCard={setInfoCard}
          />
      ))}
      </ListTask>
    </ItemTaskWrapper>
  )
}

export default TaskItem

const ListTask = styled.ul`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px 0;
  justify-content: center;
`
const ItemTaskWrapper = styled.li`
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

