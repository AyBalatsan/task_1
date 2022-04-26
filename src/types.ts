export interface ListTitle {
  id: number
  title: string
}
export interface ListCard {
  id: number
  title: string
  comments: number
}
export interface AllInformation {
  id: number
  title: string
  description: string
  comments: Array<ListTitle>  
}
export type LocalStorageTitle = Array<NameTitle> | null

export interface NameTitle {
  title: string
  id: number
}

export interface ForOnClick {
  id: number 
  title: string 
  nameKeyCard: string
}
export interface InfoCard {
  CardID: number
  CardTitle: string
  comments: Array<ListTitle>
  nameKeyList: string
}     