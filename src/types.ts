
export interface ListTitle {
  id: number,
  title: string
}
export interface ListCard {
  id: number,
  title: string,
  comments: number,
}
export interface AllInformation {
  id: number,
  title: string,
  description: string
  comments: Array<ListTitle>,
  
}
export interface InfoCard {
  CardID: number,
  CardTitle: string,
  comments: Array<ListTitle>,
  nameKeyList: string
}     
