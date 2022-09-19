

import { api } from './api'
import { AxiosResponse } from 'axios'

const PREFIX = 'products'



// export const logoutUser = async () => await api.get(`${PREFIX}/logout`)

export const allProducts = async (page?:number) => await api.get(`${PREFIX}?page=${page}`)
