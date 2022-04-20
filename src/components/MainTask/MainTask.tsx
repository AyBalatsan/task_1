import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { ListCard, ListTitle} from '../../types';
import { Card, Modal } from '../';
import { InputDefault } from '../../styles/input/InputDefault';
import { ButtonDefault } from '../../styles/button/ButtonDefault';


interface MainTaskProps {
  author: string | null,
  title: string,
  setStateTitleList: any,
  id: number
}

const MainTask: FC<MainTaskProps> = (props)=> {    
  const ListCard: Array<ListCard> = [
    {id: 1, title: 'im text card', comments: 3},
    {id: 2, title: 'im text card', comments: 23},
    {id: 3, title: 'im text card', comments: 31},
    {id: 4, title: 'im text card', comments: 13},
    {id: 5, title: 'im text card', comments: 2},
  ]

  const [modalActive, setModalActive] = useState(false)
  let valueTitle: string 
  const JListTitle = JSON.parse(String(localStorage.getItem('TitleList')))
  
  

  const editTitle = (title: string, id: number) => {
    const body: Array<ListTitle> =  JListTitle.map((item: ListTitle) => {
      if (item.id == id) {
        item.title = title
      }
      return item
    })
    
    props.setStateTitleList(body)
    setModalActive(false)
  }

  return (
    <ItemTask>
      <h2 onClick={() => setModalActive(true)}>{props.title}</h2>
      <Modal active={modalActive} setActive={setModalActive}>
        <p>Изменить название блока задач</p>
        <InputDefault
          placeholder='Новое наименование задачи'
          type="text"
          onChange={event => valueTitle = event.target.value}
        />
        <ButtonDefault onClick={() => editTitle(valueTitle, props.id)}>Подтвердить</ButtonDefault>
      </Modal>
      <InputDefault type='text' placeholder='Добавте задачу в раздел' />
      <ListTask>
        {ListCard.map (item =>(
          <Card key={item.id} author={props.author} title={item.title} comments={item.comments}  />
      ))}
      </ListTask>
    </ItemTask>
  )
}

export default MainTask

const ListTask = styled.ul`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px 0;
  justify-content: center;
`
const ItemTask = styled.li`
  width: 100%;
  min-height: 200px;
  border: 4px solid #f7dab4;
  border-radius: 24px;
  background-color: #faf0e3;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

