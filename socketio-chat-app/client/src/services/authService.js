// Mock authentication service
export const login = async (username, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ username, token: 'mock-token' })
    }, 500)
  })
}

export const register = async (username, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ username, token: 'mock-token' })
    }, 500)
  })
}