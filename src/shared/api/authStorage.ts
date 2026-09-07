const keys = {
  accessToken: 'inctagram-access-token',
} as const

export const authStorage = {
  async getAccessToken(): Promise<string | null> {
    if (typeof window === 'undefined') return null // no localStorage on the server
    return localStorage.getItem(keys.accessToken)
  },
  async saveAccessToken(token: string) {
    localStorage.setItem(keys.accessToken, token)
  },
  async clearTokens() {
    localStorage.removeItem(keys.accessToken)
  },
}
