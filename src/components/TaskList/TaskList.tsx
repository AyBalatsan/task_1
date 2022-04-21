import React, { FC, useEffect, useState} from 'react';
import {TaskItem} from '..';
import styled from 'styled-components';


// interface MainTaskProps {
//   author: string | null
// }
interface ListTitle {
  id: number,
  title: string
}
const listOfTitles: Array<ListTitle> = [
  {id: 1, title: 'TODO'},
  {id: 2, title: 'In Progress'},
  {id: 3, title: 'Testing'},
  {id: 4, title: 'Done'},
]
const TaskList = () => {    
  
  let jList = localStorage.getItem('TitleList') !== null ? JSON.parse(String(localStorage.getItem('TitleList'))) : listOfTitles

  
  const [stateTitleList, setStateTitleList] = useState(jList)
  // Тут нужно переписать, перерисовка происходит при перезагрузки

  useEffect(() => {
    localStorage.setItem('TitleList', JSON.stringify(stateTitleList))
  }, [stateTitleList]) 

  return (    
    <ListTask>      
      {jList.map((item: { id: number; title: string; }) => (
        <TaskItem key={item.id} id={item.id} title={item.title} setStateTitleList = {setStateTitleList}/>
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