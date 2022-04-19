import React, {FC, useEffect,} from "react";
import styled from 'styled-components';
import { ButtonClose } from "../../styles/button/ButtonClose";

interface PopUp {
  active: boolean,
  setActive: (target: boolean) => void,
  children?: React.ReactNode
}
const Modal: FC<PopUp> = ({active, setActive, children}) => {  
  const WrapperModal = styled.div`
    height: 100vh;
    width: 100vw;
    background-color: rgba(0,0,0, 0.4);
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 20;
    max-height: none;
    opacity: ${active ? 1 : 0};
    pointer-events:${active ? "all" : "none"}; 
    transition: 0.5s all;
    
  `

  const ModalContent = styled.div`
    position: relative;
    padding: 20px;
    border-radius: 12px;
    background-color: antiquewhite;
    width: 50vw;
    transform: ${active ? "scale(1)" : "scale(0)"};
    transition: 0.5s all;
  `
  const closeModal = (e:any) => {
    if (e.key === 'Escape') {
      setActive(false)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', (e) => closeModal(e))
    return () => document.removeEventListener('keydown', closeModal);
  }, [])

  return (
    <WrapperModal      
      onClick={() => setActive(false)}
    >
      <ModalContent onClick={e => e.stopPropagation()}>
        <ButtonClose onClick={() => setActive(false)}>+</ButtonClose>
        {children}
      </ModalContent>
    </WrapperModal>
  )
}

export default Modal;

