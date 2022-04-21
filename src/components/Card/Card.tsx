import React, {FC, useState} from 'react';
import styled from 'styled-components';
import { ButtonDelete, ButtonDefault} from '../../styles/button';

interface cardProps {
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

  return (    
    <CardItem
      // onClick={ ()=> setIsVisibleModal(true)}
    >
      <p>{props.title}</p>
      <PhotoAndCounter>
        <img src='/email.png' alt='message' width={24} height={24} />
        <p>{props.comments}</p>
      </PhotoAndCounter>
      
    </CardItem>
  )
}

export default Card

const CardItem = styled.li`
  display: flex;
  justify-content: space-between;  
  padding: 8px 0;
  cursor: pointer;
  &+&{
    border-top: 1px solid green;
  }
`
const PhotoAndCounter = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 50px;
`

