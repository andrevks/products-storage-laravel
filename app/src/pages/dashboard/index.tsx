import { Container, Table } from "@mantine/core"
import { GetServerSideProps } from "next"
import { getAPIClient } from "../../services/axios"
import styles from './Dashboard.module.css'

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

interface IDashboardProps {
  products: IProduct[]
}

export default function Dashboard({
  products
}:IDashboardProps){

  const rows = products.map((product) => (
      <tr key={product.id} >
        <td>{product.title}</td>
        <td>{product.qty}</td>
        <td>{product.unit_price}</td>
        <td>{product.category}</td>
        <td>{Math.round(product.unit_price * product.qty)}</td>
      </tr>
    ))
  
  
  return (
      <Container className={styles.dashboard}>
        <h1>Dashboard</h1>
        <div>
          { products && 
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
        </div>
      </Container>
  )
}

export const getServerSideProps: GetServerSideProps =  async ctx => {

  const api = getAPIClient(ctx);

  try {
    const { data }: any = await api.get('/products')
 
    return {
      props: {
        products: data
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