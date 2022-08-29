export interface User {
  admin: boolean
  email: string
  firstName: string
  lastName: string
  username: string
  password: string
  public_id: string
}

export interface UserResponse {
  users: User[]
}

export interface UserInformation {
  userId: string
  admin: boolean
}

export interface UserUpsert {
  username: string
  password: string
}

export enum AuthUser {
  TOKEN = "TOKEN",
}
