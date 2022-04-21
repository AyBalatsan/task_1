import React, {FC, useState} from 'react';
import styled from 'styled-components';
import { InfoCard} from '../../types';
interface СardProps {
  id: number,
  title: string,
  comments: number,
  nameKeyCard: string
  setIsVisibleCard: {(modal: boolean): void}
  setInfoCard: {(modal: InfoCard): void}
}

const Card: FC<СardProps> = ({id, title, comments, setIsVisibleCard, setInfoCard, nameKeyCard}) => {    

  return (    
    <CardItem
      onClick={ ()=> {
        setIsVisibleCard(true)        
        setInfoCard({
          CardID: id,
          CardTitle: title,
          comments: 0,
          nameKeyList: nameKeyCard
        })
        }        
      }      
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

