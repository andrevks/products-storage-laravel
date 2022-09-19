import { createContext, useState, useEffect, ReactNode } from 'react'
import {
  signInUser,
  logoutUser,
} from '../services/AuthService'

import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { api } from '../services/api'
// import { checkTokenIsValid } from '../services/UserService'
import { ISigninData } from '../pages/components/SignInForm'
import Router from 'next/router'

interface IUserResponse {
  id: number
  name: string
  email: string
  created_at: string
}

interface IResponseData{
  data: IUserResponse
  access_token: string
  token_type: string
  expires_in: number
}

export interface IUser {
  name?: string
  email: string
}

interface IAuthContext {
  isAuthenticated: boolean
  user: IUser | null
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
  const TOKEN_NAME = 'products-storage-token'

  useEffect(() => {
   
      // const { 'products-storage-token': token } = parseCookies()

      // if (token) {
      //   try {
      //     const { 'products-storage-c'}
      //     setUser(data.payload.user)
      //   } catch (error) {
       
      //     destroyCookie(null, TOKEN_NAME, { path: '/' })
      //     api.defaults.headers.common.Authorization = ''
      //     window.location.href = '/'
      //     setUser(null)
      //   }
      // }
    
  }, [])

  async function signIn({ email, password }: ISigninData) {
    const { data: responseData } = (await signInUser({
      email,
      password,
    })) as any

    const { access_token, expires_in, data, token_type }: IResponseData = responseData

    setCookie(undefined, TOKEN_NAME, access_token, {
      maxAge: expires_in,
      path: '/', 
    })

    api.defaults.headers.common.Authorization = `${token_type} ${access_token}`

    setUser(user)

    Router.push('/dashboard')
  }

  async function logout() {
    try {
      await logoutUser()
    } catch (error) {
      // console.log(error);
    } finally {
      destroyCookie(null, TOKEN_NAME, { path: '/' })
      api.defaults.headers.common.Authorization = ''

      setUser(null)
    }

    // const { data } = await checkTokenIsValid()

    // if (data?.payload === false) {
    //   destroyCookie(null, TOKEN_NAME, { path: '/' })
    //   api.defaults.headers.common.Authorization = ''
    // }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
