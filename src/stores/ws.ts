import { ref } from 'vue'
import { Manager, Socket } from 'socket.io-client'
import { useAuthStore } from './auth'
import { defineStore } from 'pinia'

type ConnectionState = 'connected' | 'reconnecting' | 'disconnected'

export const useSocket = defineStore('socketio', () => {
  const connectionState = ref<ConnectionState>('connected')
  const authStore = useAuthStore()
  const baseUrl = `${import.meta.env.VITE_WS}`
  const managerOptions = {
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    transports: ['websocket'],
  }

  const publicNamespaces = ['/country', '/auth']

  const privateNamespaces = [
    '/',
    '/auth',
    '/profile',
    '/country',
    '/legal-document',
    '/feedback',
    '/device',
    '/contact',
    '/friend-request',
    '/report',
    '/room',
    '/message',
    '/group',
  ]
  const sockets = ref<{ [key: string]: Socket }>({})
  const manager = ref<Manager | null>(new Manager(baseUrl, managerOptions))

  function connectSocket(token?: string) {
    if (manager.value === null) return

    publicNamespaces.forEach((ns) => {
      sockets.value[ns] = manager.value!.socket(ns)
    })

    if (!token) return
    privateNamespaces.forEach((ns) => {
      sockets.value[ns] = manager.value!.socket(ns, {
        auth: token ? { token } : undefined,
      })
    })
  }

  function getSocket(
    key:
      | '/'
      | '/auth'
      | '/profile'
      | '/country'
      | '/legal-document'
      | '/feedback'
      | '/device'
      | '/contact'
      | '/friend-request'
      | '/report'
      | '/room'
      | '/message'
      | '/group'
  ): Socket {
    if (!publicNamespaces.includes(key) && !authStore.isLoggedIn) {
      return (<unknown>{
        timeout: () => {
          return
        },
        on: () => {
          return
        },
        emitWithAck: () => {
          return
        },
      }) as Socket
    }

    return sockets.value[key]
  }

  function disconnectSocket() {
    if (manager.value === null) return

    manager.value.reconnection(false)
    manager.value?.engine.close().removeAllListeners()

    Object.entries(sockets.value).forEach(([k, v]) => {
      manager.value?.removeAllListeners()
      v.removeAllListeners()
      v.close()
    })

    sockets.value = {}
    manager.value = null
  }

  function reconnectWithToken(token: string) {
    disconnectSocket()
    manager.value = new Manager(baseUrl, managerOptions)
    connectSocket(token)
    listenConnection()
  }

  const listenConnection = () => {
    manager.value?.on('reconnect_failed', () => {
      setConnectionState('disconnected')
    })

    manager.value?.on('reconnect_attempt', () => {
      setConnectionState('reconnecting')
    })

    manager.value?.on('reconnect', () => {
      setConnectionState('connected')
    })
  }

  const setConnectionState = (state: ConnectionState) => {
    connectionState.value = state
  }

  return {
    manager,
    sockets,
    connectionState,
    //function
    getSocket,
    connectSocket,
    reconnectWithToken,
    disconnectSocket,
    setConnectionState,
  }
})
