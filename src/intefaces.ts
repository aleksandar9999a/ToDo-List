export interface INewList {
  id?: string,
  name: string,
  items: ITodoItem[]
}

export interface IList extends INewList {
  id: string,
  state: 'active'
}

export interface ITodoItem {
  id: string,
  text: string,
  state: 'done' | 'notDone'
}

export interface IUser {
  id: string,
  email: string,
  state: 'active' | 'inactive'
}

export interface INewUser {
  email: string,
  password: string
}
