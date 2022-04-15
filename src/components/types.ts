export interface PopUp {
  active: boolean,
  setActive: (target: boolean) => void,
  children?: React.ReactNode
}
export interface ListTitle {
  id: number,
  title: string
}
export interface ListCard {
  id: number,
  title: string,
  comments: number,
}