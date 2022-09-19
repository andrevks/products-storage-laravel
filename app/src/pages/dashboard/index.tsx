import { getAPIClient } from "../../services/axios"

export default function Dashboard(){
  return (
    <h1>Dashboard</h1>
  )
}

export async function getServerSideProps(context: any) {

  const api = getAPIClient(context);
  console.log(api);

  try {
    const response = await api.get('/products')
    console.log(response)
    // console.log(response)
    // return {
    //   props: {
    //     products: response.data.payload
    //   }
    // }
  } catch (error) {
    console.log(error);
  }

  return {
    props: {

    }, // will be passed to the page component as props
  }
}