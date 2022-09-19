import { createContext, useState, useEffect, ReactNode } from 'react'
import {
  signIn,
  Logout,
} from '../services/AuthService'

import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { api } from '../services/api'
// import { checkTokenIsValid } from '../services/UserService'
import { ISigninData } from '../pages/components/SignInForm'

export interface IUser {
  fullname?: string
  email: string
  cep: string
}

interface IAuthContext {
  isAuthenticated: boolean
  user: IUser
  signIn: (data: ISigninData) => Promise<void>
  logout(): void
}

export const AuthContext = createContext({} as IAuthContext)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<IUser | null>(null)
  const isAuthenticated = !!user

  useEffect(() => {
   
      // const { 'products-storage-token': token } = parseCookies()

      // if (token) {
      //   try {
      //     const { 'products-storage-c'}
      //     setUser(data.payload.user)
      //   } catch (error) {
       
      //     destroyCookie(null, 'votofacil-token', { path: '/' })
      //     api.defaults.headers.common.Authorization = ''
      //     window.location.href = '/'
      //     setUser(null)
      //   }
      // }
    
  }, [])

  async function signIn({ email, password }: ISigninData) {
    const { data } = (await signIn({
      email,
      password,
    })) as any


    const { access_token, user } = data.payload

    setCookie(undefined, 'products-storage-token', access_token, {
      expires: new Date(access_token.expires_at), // expires in 7 days
      path: '/',
    })

    api.defaults.headers.common.Authorization = `Bearer ${access_token.token}`

    setUser(user)
  }

  async function logout() {
    try {
      await Logout()
    } catch (error) {
      // console.log(error);
    } finally {
      destroyCookie(null, 'votofacil-token', { path: '/' })
      api.defaults.headers.common.Authorization = ''

      setUser(null)
    }

    const { data } = await checkTokenIsValid()

    if (data?.payload === false) {
      destroyCookie(null, 'votofacil-token', { path: '/' })
      api.defaults.headers.common.Authorization = ''
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
