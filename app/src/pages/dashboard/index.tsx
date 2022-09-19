import { Container, Pagination, Table } from "@mantine/core"
import { GetServerSideProps } from "next"
import { getAPIClient } from "../../services/axios"
import styles from './Dashboard.module.css'
import { useState } from 'react';
import { allProducts } from "../../services/ProductService";

interface ILink {
  url: string;
  label: string;
  active: boolean;
}
interface IProduct {
  id: number
  title: string
  qty: number
  unit_price: number
  category_id: number
  user_id?: any
  category: string
  created_at: Date
  updated_at: Date
}
interface IPagination {
  current_page: number;
  data: IProduct[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: ILink[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url?: any;
  to: number;
  total: number;
}

interface IDashboardProps {
  productsProp: IProduct[],
  paginationProp: IPagination
}

export default function Dashboard({
  paginationProp
}:IDashboardProps){
  

  const [pagination, setPagination] = useState<IPagination>(paginationProp);
 
  const rows = pagination.data.map((product) => (
      <tr key={product.id} >
        <td>{product.title}</td>
        <td>{product.qty}</td>
        <td>{product.unit_price}</td>
        <td>{product.category}</td>
        <td>{Math.round(product.unit_price * product.qty)}</td>
      </tr>
    ))


  async function handlePaginationChange(page:number){
    const newPagination = await getNewPagination(page)
    setPagination(newPagination)
  }

  async function getNewPagination(page:number){
    const { data }: any = await allProducts(page)
    return data.payload
  }

  
  
  return (
      <Container className={styles.dashboard}>
        <h1>Dashboard</h1>
        <div>
          { pagination.data && 
            ( 
              <Table striped highlightOnHover>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Quantidade</th>
                    <th>Valor Unitário</th>
                    <th>Categoria</th>
                    <th>Valor Total</th>
                  </tr>
                </thead>
                <tbody>{rows}</tbody>

            </Table>
            )
          }   

          <Pagination 
            total={pagination.last_page} 
            size="lg" 
            radius="lg" 
            page={pagination.current_page}
            onChange={handlePaginationChange}
          />
        </div>
      </Container>
  )
}

export const getServerSideProps: GetServerSideProps =  async ctx => {

  const api = getAPIClient(ctx);

  try {
    const { data }:any = await api.get('/products')
    console.log(data)
    const { isSuccess, payload } = data as any
    
    // if(!isSuccess){
    //   return {
    //     props: {}, 
    //     redirect: {
    //       destination: '/',
    //       permanent: false
    //     }
    //   }
    // }
    return {
      props: {
        paginationProp: payload
      }
    }
  } catch (error) {
    return {
      props: {}, 
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  

 
}