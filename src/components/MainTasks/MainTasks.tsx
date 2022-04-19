import React, { FC, useReducer, useEffect} from 'react';
import {MainTask} from '../';
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
  // let jList = localStorage.getItem('TitleList') !== null ? JSON.parse(String(localStorage.getItem('TitleList'))) : ListOfTitles
  
  // const [stateTitleList, dispatchTitleList] = useReducer(Reducer, jList)
  
  
  // useEffect(() => {
  //   localStorage.setItem('TitleList', JSON.stringify(stateTitleList))
  // }, [stateTitleList]) 

  return (    
    <ListTask>
      {ListOfTitles.map(item => (
        <MainTask key={item.id} title={item.title} author={props.author}/>
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