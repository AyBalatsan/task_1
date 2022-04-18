import React, {useEffect, useReducer, useState} from 'react';
import styled from 'styled-components';
import { PopUp } from '../PopUp';


export default function Card({...props}) {   
  
  const [modalOpen, setModalOpen] = useState(true)

  return (    
    <CardItem>
      <p>{props.title}</p>
      <PhotoAndCounter>
        <img src='/email.png' alt='message' width={24} height={24} />
        <p>{props.comments}</p>
      </PhotoAndCounter>
      <PopUp active={modalOpen} setActive={setModalOpen}>
        <h3>Имя карточки</h3>
        <p>Автор поста: </p>
        <p>Description</p>
        <textarea />
        <ul>
          <li>
            <p>Text commit</p>
            <button>del</button>
          </li>
          <li>
            <p>Text commit</p>
            <button>del</button>
          </li>
          <li>
            <p>Text commit</p>
            <button>del</button>
          </li>
        </ul>
        <button>Delete this card</button>
      </PopUp>
    </CardItem>
  )
}
const CardItem = styled.li`
  display: flex;
  justify-content: space-between;
  
  padding: 8px 0;
  &+&{
    border-top: 1px solid green;
  }
`
const PhotoAndCounter = styled.div`
  display: flex;
  gap: 5px;
`