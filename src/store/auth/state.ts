import { UserInformation } from "../../domain/users/Users.Model"

export interface AuthState {
  users: UserInformation[]
  authUser: UserInformation | null
  userToken: string | null
}

function state(): AuthState {
  return {
    users: [],
    authUser: null,
    userToken: null,
  }
}

export default state
