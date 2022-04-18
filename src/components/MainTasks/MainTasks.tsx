import { title } from 'process';
import React, {useEffect, useReducer} from 'react';
import ItemMainTask from '../MainTask/MainTask';
import { ListTitle } from '../../types';
import styled from 'styled-components';

const ListTask = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 3fr);
  gap: 20px 30px;
  width: 80%;
  margin: 0 auto 40px;
`
// type ListMainTaskProps = {[key: string]: any }
const MainTasks = () => {   
  const ListOfTitles: Array<ListTitle> = [
    {id: 1, title: 'TODO'},
    {id: 2, title: 'In Progress'},
    {id: 3, title: 'Testing'},
    {id: 4, title: 'Done'},
  ]
  
  return (
    <ListTask>
      {ListOfTitles.map (item =>(
        <ItemMainTask key={item.id} title={item.title}/>
      ))}
    </ListTask>
  )
}

export default MainTasks