import { AuthUser, UserInformation, UserUpsert } from "../../domain/users/Users.Model"
import { getUsers, login, logout } from "../../domain/users/Users.Repository"
import { ActionContext, ActionTree } from "vuex"
import { State } from "../index"
import { Mutation, Mutations } from "./mutations"
import { AuthState } from "./state"

export enum AuthAction {
  getUsers = "getUsers",
  login = "login",
  logout = "logout",
}

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<AuthState, State>, "commit">

export interface AuthActions {
  [AuthAction.getUsers]({ state, getters, commit, dispatch }: AugmentedActionContext): void
  [AuthAction.login](
    { state, getters, commit, dispatch }: AugmentedActionContext,
    { username, password }: UserUpsert,
  ): void
  [AuthAction.logout]({ commit }: AugmentedActionContext): void
}

const actions: ActionTree<AuthState, State> & AuthActions = {
  [AuthAction.getUsers](context: AugmentedActionContext) {
    getUsers().subscribe((response: UserInformation[]) => {
      context.commit(Mutation.SET_USERS, response)
    })
  },

  [AuthAction.login](context: AugmentedActionContext, { username, password }: UserUpsert) {
    login(username, password).subscribe((response: UserInformation | null) => {
      context.commit(Mutation.SET_AUTH_USER, response)
      context.commit(Mutation.SET_TOKEN, { token: localStorage.getItem(AuthUser.TOKEN) })
    })
  },

  [AuthAction.logout](context: AugmentedActionContext) {
    logout().subscribe(() => {
      context.commit(Mutation.LOG_OUT)
    })
  },
}

export default actions
