import React, {FC, useState} from 'react';
import styled from 'styled-components';
import { Modal, Commit } from '../';
import { ButtonDelete, ButtonDefault} from '../../styles/button';

interface cardProps {
  author: string | null,
  title: string,
  comments: number
}
interface interCommit {
  id: number,
  text: string
}
const listCommit: Array<interCommit> = [
  {id: 1, text: 'Первый текст'},
  {id: 2, text: 'Второй текст'},

]
const Card: FC<cardProps> = (props) => {    

  const [isVisibleModal, setIsVisibleModal] = useState(false)

  return (    
    <CardItem
      onClick={ ()=> setIsVisibleModal(true)}
    >
      <p>{props.title}</p>
      <PhotoAndCounter>
        <img src='/email.png' alt='message' width={24} height={24} />
        <p>{props.comments}</p>
      </PhotoAndCounter>
      <Modal active={isVisibleModal} setActive={setIsVisibleModal}>
        <h3>Имя карточки</h3>
        <p>Автор поста: {props.author}</p>
        <p>Description: </p>
        <CommitArea />
        <ShellButton>
          <ButtonDefault>Добавить описание</ButtonDefault>
          <button><img src="/edit.png" alt="edit" /></button>
          <button><img src="/delete.png" alt="del" /></button>
        </ShellButton>
        <CommitList>
          {listCommit.map (commit =>(
            <Commit key={commit.id} commit={commit.text} />            
          ))}          
        </CommitList>
        <ButtonDelete>Delete this card</ButtonDelete>
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
  cursor: pointer;
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
const PhotoAndCounter = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 50px;
`
const ShellButton = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`
