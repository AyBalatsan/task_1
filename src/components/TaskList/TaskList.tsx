import React, {FC} from 'react';
import {TaskItem} from '..';
import styled from 'styled-components';
import {InfoCard} from '../../types'

type List = {id: number, title: string}

interface AllDataProps {   
  setIsVisibleModalTitle: {(modal: boolean): void;}
  setIsVisibleModalCard: {(modal: boolean): void;}
  setTitleBodyItem: {(modal: List): void;}
  setInfoCard: {(modal: InfoCard): void}
  titleList: Array<List> 
}

const TaskList: FC<AllDataProps> = (
  {
    setIsVisibleModalTitle,  
    setIsVisibleModalCard,
    setTitleBodyItem, 
    setInfoCard,
    titleList
  }) => {    
  return (    
    <ListTask>      
      {titleList.map((item: { id: number; title: string; }) => (
        <TaskItem 
          key={item.id} 
          id={item.id} 
          title={item.title} 
          setIsVisibleModalTitle = {setIsVisibleModalTitle}
          setIsVisibleModalCard = {setIsVisibleModalCard}
          setTitleBodyItem = {setTitleBodyItem}
          setInfoCard = {setInfoCard}
        />
      ))}
    </ListTask>    
  )
}

export default TaskList

const ListTask = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 3fr);
  gap: 20px 30px;
  width: 80%;
  margin: 0 auto 40px;
`