import { ref } from "vue"
import io from "socket.io-client"
const isConnected = ref(false)
let isConnectionInit = false

const socket = io("https://api.artemisdigital.io")

const initWebsocket = () => {
  if (isConnectionInit) return

  socket.on("connect", () => {
    isConnectionInit = true
    socket.emit("message", { data: "I'm connected!" })
    console.log("Connected to socket server")
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  socket.on("disconnect", (reason: any) => {
    isConnectionInit = false
    console.log("socket server disconnected: ", reason) // false
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  socket.on("connect_error", (err: { message: any }) => {
    console.log(err)
    console.log("Websocket connection error: ", err.message)
  })
}

const disconnectWebsocket = () => {
  if (!isConnectionInit) return
  isConnectionInit = false
  isConnected.value = false

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  socket.on("disconnect", (reason: any) => {
    console.log("socket server disconnected: ", reason) // false
  })
}

export default function useWebsocket() {
  return {
    socket,
    initWebsocket,
    disconnectWebsocket,
  }
}
