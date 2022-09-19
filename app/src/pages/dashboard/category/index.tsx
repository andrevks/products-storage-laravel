import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Container, TextInput } from "@mantine/core";
import { useForm } from "react-hook-form";
import styles from './index.module.css'
import * as yup from 'yup';
import { storeCategory } from "../../../services/CategoryService";
import { useRouter } from "next/router";

interface INewCategory {
  category: string
  title: string;
  qty: string;
  unit_price: string;
}

export interface ISaveProduct {
  title: string;
  qty: number;
  unit_price: number;
  category: string;
}

const schema = yup
  .object({
    category: yup.string().required('categoria é obrigatória'),
  })
  .required()

export default function Category(){
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INewCategory>({
    resolver: yupResolver(schema),
  })

  const {push, back} = useRouter()


  async function onSubmit({category, title, qty, unit_price}:INewCategory){
    try {
      const newData:any = {
        category,
        products: Array({
          title,
          qty: parseInt(qty),
          unit_price: parseFloat(unit_price),
          category
        })
      }
      const dataSaved = await storeCategory(newData)
      console.log(newData)
      alert('Categoria criada com sucesso')
      back()
    } catch (error) {
      alert('Não foi possível criar categoria')
    }
   

  }




  return (
    <Container className={styles.container}>
      <form 
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInput
          {...register('category')}
          label='Categoria'
          // error={errors.category.message}
          radius='md'
          size='lg'
          withAsterisk
        />  

        <div className="">
          <h4>Novo Produto</h4>
          <TextInput
            {...register('title')}
            label='Título'
            // error={errors.category.message}
            radius='md'
            size='lg'
            withAsterisk
          />  

          <TextInput
            {...register('qty')}
            label='Quantidade'
            // error={errors.category.message}
            radius='md'
            size='lg'
            withAsterisk
          />  


          <TextInput
            {...register('unit_price')}
            label='Preço Unitário'
            // error={errors.category.message}
            radius='md'
            size='lg'
            withAsterisk
          />  
        </div>

     
      <div>
        <Button 
          type="submit"
          radius="md"
          uppercase
          >
          
          Criar Categoria
        </Button>

        <Button 
          radius="md"
          onClick={() => back()}
          uppercase
          >
          
         Voltar
        </Button>
      </div>
      
      </form>
    
    </Container>
  )
}