import { api } from './api'
import { AxiosResponse } from 'axios'
import { ISigninData } from '../pages/components/SignInForm'

const PREFIX = 'auth'

export const signIn = async ({
  email,
  password,
}: ISigninData): Promise<AxiosResponse<any, any>> =>
  await api.post(`${PREFIX}/login`, { email, password })

// export const recoverUserInfoByToken = async (token?: string) =>
//   await api.get(`${PREFIX}/token`)

export const Logout = async () => await api.get(`${PREFIX}/logout`)