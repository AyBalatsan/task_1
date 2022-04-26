import { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import { ListCard, ListTitle } from '../../types';
import { InputDefault } from '../../styles/input/InputDefault';
import { Card } from '..';

interface MainTaskProps {
  title: string
  id: number
  onClickCard(id: number, title: string, nameKeyCard: string): void
  onClickTitle(id: number, title: string): void  
  
}
const listCard: Array<ListCard> = []

const TaskItem: FC<MainTaskProps> = ({
  id,
  title,
  onClickCard,
  onClickTitle,
}) => {

  const dataThisCard: string | null = localStorage.getItem('Card' + id)
  let  infoDataThisCard = dataThisCard !== null ? JSON.parse(dataThisCard) : listCard
  const [card, setCard] = useState(infoDataThisCard)
  const [newName, setNewName] = useState('')
 
  
  useEffect(() => {
    localStorage.setItem('Card' + id, JSON.stringify(card))
  }, [card])

  const addCard = (event: { key: string; }) => {
    if (event.key === 'Enter' && newName !== '') {
      setCard([
        ...card,
        {
          id: Date.now(),
          title: newName,
          description: '',
          comments: []
        }
      ])
      setNewName('')
    }
  }
  return (
    <ItemTaskWrapper>
      <h2 onClick={() => onClickTitle(id, title)}>{title}</h2>
      <InputDefault
        type="text"
        value={newName}
        onChange={event => setNewName(event.target.value)}
        onKeyPress={addCard}
        placeholder='Todo name'
      />
      <ListTask>
        {card.map((item: { id: number; title: string; comments: Array<ListCard>; }) => (
          <Card
            key={item.id}
            id={item.id}
            nameKeyCard={'Card' + id}
            title={item.title}
            comments={item.comments.length}
            onClickCard={onClickCard}
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

