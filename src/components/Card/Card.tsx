import React, {FC} from 'react';
import styled from 'styled-components';
import { InfoCard} from '../../types';

interface CardProps {
  id: number,
  title: string,
  comments: number,
  nameKeyCard: string
  setIsVisibleModalCard: {(modal: boolean): void}
  setInfoCard: {(modal: InfoCard): void} 
}

const Card: FC<CardProps> = ({id, title, comments, setIsVisibleModalCard, setInfoCard, nameKeyCard}) => {    
  return (    
    <CardItem
      onClick={onClick}      
    >
      <p>{title}</p>
      <PhotoAndCounter>
        <img src='/email.png' alt='message' width={24} height={24} />
        <p>{comments}</p>
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

