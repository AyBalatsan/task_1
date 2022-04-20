import React, { FC, useEffect, useState} from 'react';
import {MainTask, Modal} from '../';
import styled from 'styled-components';


interface MainTaskProps {
  author: string | null
}
interface ListTitle {
  id: number,
  title: string
}

const MainTasks: FC<MainTaskProps> = (props) => {    
  const ListOfTitles: Array<ListTitle> = [
    {id: 1, title: 'TODO'},
    {id: 2, title: 'In Progress'},
    {id: 3, title: 'Testing'},
    {id: 4, title: 'Done'},
  ]
  let jList = localStorage.getItem('TitleList') !== null ? JSON.parse(String(localStorage.getItem('TitleList'))) : ListOfTitles
  
  const [stateTitleList, setStateTitleList] = useState(jList)
  // Тут нужно переписать, перерисовка происходит при перезагрузки

  useEffect(() => {
    localStorage.setItem('TitleList', JSON.stringify(stateTitleList))
  }, [stateTitleList]) 

  return (    
    <ListTask>
      
      {jList.map((item: { id: number; title: string; }) => (
        <MainTask key={item.id} id={item.id} title={item.title} author={props.author} setStateTitleList = {setStateTitleList}/>
      ))}
    </ListTask>    
  )
}

export default MainTasks

const ListTask = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 3fr);
  gap: 20px 30px;
  width: 80%;
  margin: 0 auto 40px;
`