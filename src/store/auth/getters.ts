import { GetterTree } from "vuex"
import { State } from "../index"
import { AuthState } from "./state"
import { UserInformation } from "../../domain/users/Users.Model"

export type Getters = {
  currentUser(state: State): UserInformation | null
  isUserLoggedIn(state: State): boolean
}

const getters: GetterTree<AuthState, State> = {
  currentUser(state) {
    return state.users.length ? state.users[0] : null
  },
  isUserLoggedIn(state) {
    return !!state.userToken
  },
}

export default getters
