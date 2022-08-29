import { Observable, map } from "rxjs"

import apiCall from "@/domain/Domain.Axios.Api"
import { UserInformation, UserResponse, User, AuthUser } from "./Users.Model"
import { usersMap, userMap } from "./Users.Mapper"

export const getUsers = (): Observable<UserInformation[]> => {
  return apiCall
    .get<UserResponse>("users")
    .pipe(map((usersResponse) => usersMap(usersResponse.result)))
}

export const login = (username: string, password: string): Observable<UserInformation | null> => {
  return apiCall.post<User>("auth/login", { username, password }).pipe(
    map((authResponse) => {
      if (authResponse && authResponse.result)
        localStorage.setItem(AuthUser.TOKEN, authResponse.result.public_id)

      return userMap(authResponse?.result)
    }),
  )
}

export const logout = (): Observable<UserInformation | null> => {
  return apiCall.post<User>("auth/logout", {}).pipe(
    map((authResponse) => {
      localStorage.setItem(AuthUser.TOKEN, "")

      return userMap(authResponse?.result)
    }),
  )
}
