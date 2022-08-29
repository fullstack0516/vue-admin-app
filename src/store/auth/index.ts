import { CommitOptions, DispatchOptions, Module, Store as VuexStore } from "vuex"
import { State } from "../index"
import state, { AuthState } from "./state"
import actions, { AuthActions } from "./actions"
import getters, { Getters } from "./getters"
import mutations, { Mutations } from "./mutations"

export type AuthStore<S = State> = Omit<VuexStore<S>, "commit" | "getters" | "dispatch"> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions,
  ): ReturnType<Mutations[K]>
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>
  }
} & {
  dispatch<K extends keyof AuthActions>(
    key: K,
    payload: Parameters<AuthActions[K]>[1],
    options?: DispatchOptions,
  ): ReturnType<AuthActions[K]>
}

export const Auth: Module<AuthState, State> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
}
