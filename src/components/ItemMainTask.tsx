import React, {useEffect, useReducer, useState} from 'react';
import styled from 'styled-components';
import PopUp from './PopUp'
import { ListCard } from './types';
import ItemCard from './ItemCard';

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

export default function ItemMainTask({...props}) {   
  const ListCard: Array<ListCard> = [
    {id: 1, title: 'im text card', comments: 3},
    {id: 2, title: 'im text card', comments: 23},
    {id: 3, title: 'im text card', comments: 31},
    {id: 4, title: 'im text card', comments: 13},
    {id: 5, title: 'im text card', comments: 2},
  ]
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <ItemTask>
      <h2>{props.title}</h2>
      <input type='text' placeholder='Добавте задачу в раздел' />
      <ul>
        {ListCard.map (item =>(
          <ItemCard key={item.id} {...item} />
      ))}
      </ul>
    </ItemTask>
  )
}