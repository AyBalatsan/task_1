import React, {FC, useEffect,} from "react";
import { PopUp } from "./types";

const Modal: FC<PopUp> = ({active, setActive, children}) => {
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
    <div      
      onClick={() => setActive(false)}
    >
      <div onClick={e => e.stopPropagation()}>
        <button onClick={() => setActive(false)}>+</button>
        {children}
      </div>
    </div>
  )
}

export default Modal;