import React, {useEffect, useReducer, useState} from 'react';
import styled from 'styled-components';
import { Modal } from '../Modal';
import { ButtonDefault } from '../styled_components/button/ButtonDefault';
import { ButtonDel } from '../styled_components/button/ButtonDel';

const Card = ({...props}) => {   
  
  const [modalOpen, setModalOpen] = useState(false)

  return (    
    <CardItem>
      <p>{props.title}</p>
      <PhotoAndCounter>
        <img src='/email.png' alt='message' width={24} height={24} />
        <p>{props.comments}</p>
      </PhotoAndCounter>
      <Modal active={modalOpen} setActive={setModalOpen}>
        <h3>Имя карточки</h3>
        <p>Автор поста: </p>
        <p>Description: </p>
        <CommitArea />
        <ShellButton>
          <ButtonDefault>Добавить описание</ButtonDefault>
          <button><img src="/edit.png" alt="edit" /></button>
          <button><img src="/delete.png" alt="del" /></button>
        </ShellButton>
        <CommitList>
          <CommitItem>
            <p>Text commit</p>
            <ShellButton>              
              <button><img src="/edit.png" alt="edit" /></button>
              <button><img src="/delete.png" alt="del" /></button>
            </ShellButton>
          </CommitItem>
          <CommitItem>
            <p>Text commit</p>
            <ShellButton>              
              <button><img src="/edit.png" alt="edit" /></button>
              <button><img src="/delete.png" alt="del" /></button>
            </ShellButton>
          </CommitItem>
          <CommitItem>
            <p>Text commit</p>
            <ShellButton>              
              <button><img src="/edit.png" alt="edit" /></button>
              <button><img src="/delete.png" alt="del" /></button>
            </ShellButton>
          </CommitItem>
        </CommitList>
        <ButtonDel>Delete this card</ButtonDel>
      </Modal>
    </CardItem>
  )
}

export default Card

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
const CardItem = styled.li`
  display: flex;
  justify-content: space-between;  
  padding: 8px 0;
  &+&{
    border-top: 1px solid green;
  }
`
const CommitList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
  margin: 16px 0;
`
const CommitItem = styled.li`
  display: flex;
  justify-content: space-between;
  width: 100%;
  
`
const CommitText = styled.p`
  width: 100%;
  max-width: 760px;
  font-style: normal;
  font-weight: 400;
  font-size: 18px; 
  line-height: 150%;  
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #5B5B5B;
`
const PhotoAndCounter = styled.div`
  display: flex;
  gap: 5px;
`
const ShellButton = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`
