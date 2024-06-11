export interface ILoginSuccess {
  token: string
}

export interface ILoginError {
  statusCode?: number
  errorName?: string
  message?: string
}
