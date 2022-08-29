import { MutationTree } from "vuex"
import { AuthState } from "./state"
import { UserInformation } from "../../domain/users/Users.Model"

export enum Mutation {
  SET_USERS = "SET_USERS",
  SET_AUTH_USER = "SET_AUTH_USER",
  SET_TOKEN = "SET_TOKEN",
  LOG_OUT = "LOG_OUT",
}

export type Mutations<S = AuthState> = {
  [Mutation.SET_USERS](state: S, payload: UserInformation[]): void
  [Mutation.SET_AUTH_USER](state: S, payload: UserInformation | null): void
  [Mutation.SET_TOKEN](state: S, payload: { token: string | null }): void
  [Mutation.LOG_OUT](state: S): void
}

const mutation: MutationTree<AuthState> = {
  [Mutation.SET_USERS](state: AuthState, payload: UserInformation[]) {
    state.users = payload
  },

  [Mutation.SET_AUTH_USER](state: AuthState, payload: UserInformation | null) {
    state.authUser = payload
  },

  [Mutation.SET_TOKEN](state: AuthState, payload: { token: string | null }) {
    state.userToken = payload.token
  },

  [Mutation.LOG_OUT](state: AuthState) {
    state.userToken = ""
  },
}

export default mutation
