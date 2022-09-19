

import { api } from './api'
import { ISaveProduct } from '../pages/dashboard/category'

interface INewSaveCategory {
  category: string
  products: ISaveProduct
}


const PREFIX = 'categories'

// export const logoutUser = async () => await api.get(`${PREFIX}/logout`)

export const storeCategory = async ({category, products}:INewSaveCategory) => 
  await api.post(`${PREFIX}`, {
    category,
    products
})
