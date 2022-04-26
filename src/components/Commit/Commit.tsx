import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { InputDefault } from '../../styles/input/InputDefault';

interface CommitProps {
  commit: string
  id: number
  deleteCommit: {(modal: number): void}
  // setCardComments: {}
}

const Commit: FC<CommitProps> = ({commit, id, deleteCommit}) => { 
  const [commitValue, setCommitValue] = useState('')
  const commitEdit = () =>{
    // setCardComments()
  }   
  return (       
    <CommitItem>
      <InputDefault
          type="text"
          defaultValue={commit}
          onChange={event => setCommitValue(event.target.value)}
        />
      <ShellButton>              
        <button><img src="/delete.png" alt="del" onClick={()=> deleteCommit(id)}/></button>
      </ShellButton>
    </CommitItem>        
  )
}

export default Commit

const CommitItem = styled.li`
  display: flex;
  justify-content: space-between;
  width: 100%;  
`
const ShellButton = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`
const CommitText = styled.p`
  width: 100%;
  max-width: 760px;
  font-style: normal;
  font-weight: 400;
  font-size: 18px; 
  line-height: 150%;  
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #5B5B5B;
`