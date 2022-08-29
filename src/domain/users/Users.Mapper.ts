import { User, UserInformation, UserResponse } from "./Users.Model"

export const usersMap = (userResponse?: UserResponse): UserInformation[] => {
  if (userResponse)
    return userResponse.users.map((user) => ({
      userId: user.email,
      admin: user.admin,
    }))
  else return []
}

export const userMap = (user?: User): UserInformation | null => {
  if (user)
    return {
      userId: user.email,
      admin: user.admin,
    }
  else return null
}
