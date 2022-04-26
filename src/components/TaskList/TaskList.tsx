import { FC } from 'react';
import { TaskItem } from '..';
import styled from 'styled-components';
import { ListTitle } from '../../types';

interface AllDataProps {
  listOfTitle: Array<ListTitle> | null
  onClickCard(id: number, title: string, nameKeyCard: string): void
  onClickTitle(id: number, title: string): void
}

const TaskList: FC<AllDataProps> = (
  {
    onClickCard,
    onClickTitle,
    listOfTitle,
  }) => {
  return (
    <ListTask>
      {listOfTitle?.map((item: { id: number; title: string; }) => (
        <TaskItem
          key={item.id}
          id={item.id}
          title={item.title}
          onClickCard={onClickCard}
          onClickTitle={onClickTitle}
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