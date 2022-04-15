import React, {useEffect, useReducer, useState} from 'react';
import styled from 'styled-components';
import PopUp from './PopUp'


export default function ItemCard({...props}) {   
  
  const [modalOpen, setModalOpen] = useState(false)

  return (    
    <li>
      <p>{props.title}</p>
      <div>
        <img src='/email.png' alt='message' />
        <p>{props.comments}</p>
      </div>
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
    </li>
  )
}