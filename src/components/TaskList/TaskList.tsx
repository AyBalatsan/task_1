import React, { FC, useEffect, useState} from 'react';
import {TaskItem} from '..';
import styled from 'styled-components';
import {InfoCard} from '../../types'

type List = {id: number, title: string}

interface AllDataProps {   
  setIsVisibleTitle: {(modal: boolean): void;}
  setIsVisibleCard: {(modal: boolean): void;}
  setIdTitle: {(modal: number): void;}
  setInfoCard: {(modal: InfoCard): void}
  jList: Array<List> 
}

const TaskList: FC<AllDataProps> = (
  {
    setIsVisibleTitle,  
    setIsVisibleCard, 
    setIdTitle, 
    setInfoCard,
    jList
  }) => {    
  return (    
    <ListTask>      
      {jList.map((item: { id: number; title: string; }) => (
        <TaskItem 
          key={item.id} 
          id={item.id} 
          title={item.title} 
          setIsVisibleTitle = {setIsVisibleTitle}
          setIsVisibleCard = {setIsVisibleCard}
          setIdTitle = {setIdTitle}
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